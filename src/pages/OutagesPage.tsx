import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, ThumbsUp, ThumbsDown, CircleAlert, CircleCheck, CircleDot, Bell } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Report = Tables<"reports">;

const statusConfig: Record<string, { label: string; color: string; icon: typeof CircleAlert }> = {
  confirmed: { label: "Confirmed Outage", color: "bg-status-confirmed/10 text-status-confirmed", icon: CircleAlert },
  pending: { label: "Possible Issue", color: "bg-status-possible/10 text-status-possible", icon: CircleDot },
  investigating: { label: "Investigating", color: "bg-status-possible/10 text-status-possible", icon: CircleDot },
  resolved: { label: "Normal Service", color: "bg-status-normal/10 text-status-normal", icon: CircleCheck },
};

export default function OutagesPage() {
  const { utility } = useParams<{ utility: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifiedReports, setVerifiedReports] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchReports();
    fetchMyVerifications();
  }, [utility]);

  const fetchReports = async () => {
    const { data } = await supabase
      .from("reports")
      .select("*")
      .eq("utility", utility!)
      .neq("status", "resolved")
      .order("created_at", { ascending: false });
    setReports(data || []);
    setLoading(false);
  };

  const fetchMyVerifications = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("verifications")
      .select("report_id")
      .eq("user_id", user.id);
    setVerifiedReports(new Set(data?.map((v) => v.report_id) || []));
  };

  const handleVerify = async (reportId: string, confirmed: boolean) => {
    if (!user) return;
    const { error } = await supabase.from("verifications").insert({
      report_id: reportId,
      user_id: user.id,
      confirmed,
    });
    if (error) {
      toast.error("Already verified or error occurred");
      return;
    }

    const report = reports.find((r) => r.id === reportId);
    if (report) {
      const updates = confirmed
        ? { confirmations: report.confirmations + 1 }
        : { denials: report.denials + 1 };

      if (confirmed && report.confirmations + 1 >= 3) {
        Object.assign(updates, { status: "confirmed" });
      }

      await supabase.from("reports").update(updates).eq("id", reportId);
    }

    setVerifiedReports((prev) => new Set([...prev, reportId]));
    toast.success(confirmed ? "Thank you for confirming!" : "Response recorded");
    fetchReports();
  };

  const isElectricity = utility === "electricity";

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${isElectricity ? "from-electricity/5" : "from-water/5"} via-background to-background`} />
      <div className="max-w-lg mx-auto pt-6 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/${utility}`)} className="rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <MapPin className={`w-5 h-5 ${isElectricity ? "text-electricity" : "text-water"}`} />
            <h1 className="text-xl font-heading font-bold">
              Area {isElectricity ? "Outages" : "Issues"}
            </h1>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : reports.length === 0 ? (
          <Card className="shadow-card glass">
            <CardContent className="py-12 text-center">
              <CircleCheck className="w-12 h-12 mx-auto mb-3 text-status-normal" />
              <p className="text-lg font-semibold text-foreground">All Clear!</p>
              <p className="text-muted-foreground mt-1">No active issues reported.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {reports.map((report) => {
              const status = statusConfig[report.status] || statusConfig.pending;
              const StatusIcon = status.icon;
              const alreadyVerified = verifiedReports.has(report.id);
              const isOwn = report.user_id === user?.id;

              return (
                <Card key={report.id} className="shadow-card glass border-border/50">
                  <CardContent className="p-4 space-y-3">
                    {/* Community verification prompt for non-own reports */}
                    {!isOwn && !alreadyVerified && report.status === "pending" && (
                      <div className={`p-3 rounded-lg ${isElectricity ? "bg-electricity-light" : "bg-water-light"} flex items-start gap-2`}>
                        <Bell className={`w-4 h-4 mt-0.5 shrink-0 ${isElectricity ? "text-electricity" : "text-water"}`} />
                        <p className="text-xs">
                          Someone reported {report.problem_type.toLowerCase()} in <strong>{report.town_village}</strong>. Are you experiencing this issue?
                        </p>
                      </div>
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-card-foreground">{report.problem_type}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.town_village}, {report.district}
                        </p>
                      </div>
                      <Badge className={`${status.color} gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </Badge>
                    </div>
                    {report.description && (
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {report.confirmations} confirmed · {report.denials} denied
                      </span>
                      {!isOwn && !alreadyVerified && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerify(report.id, true)}
                            className="gap-1 rounded-lg"
                          >
                            <ThumbsUp className="w-3 h-3" /> Yes
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerify(report.id, false)}
                            className="gap-1 rounded-lg"
                          >
                            <ThumbsDown className="w-3 h-3" /> No
                          </Button>
                        </div>
                      )}
                      {alreadyVerified && (
                        <Badge variant="secondary" className="gap-1">
                          <CircleCheck className="w-3 h-3" /> Verified
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
