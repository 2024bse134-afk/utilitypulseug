import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MapPin, ThumbsUp, ThumbsDown, CircleAlert, CircleCheck, CircleDot, Bell, Filter, Zap, Droplets } from "lucide-react";
import { toast } from "sonner";
import { getDistricts, getTownsForDistrict } from "@/data/ugandaLocations";
import type { Tables } from "@/integrations/supabase/types";

type Report = Tables<"reports">;

const statusConfig: Record<string, { label: string; color: string; icon: typeof CircleAlert }> = {
  confirmed: { label: "Confirmed Outage", color: "bg-status-confirmed/10 text-status-confirmed border-status-confirmed/20", icon: CircleAlert },
  pending: { label: "Possible Issue", color: "bg-status-possible/10 text-status-possible border-status-possible/20", icon: CircleDot },
  investigating: { label: "Investigating", color: "bg-status-possible/10 text-status-possible border-status-possible/20", icon: CircleDot },
  resolved: { label: "Resolved", color: "bg-status-normal/10 text-status-normal border-status-normal/20", icon: CircleCheck },
};

export default function OutagesPage() {
  const { utility } = useParams<{ utility: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifiedReports, setVerifiedReports] = useState<Set<string>>(new Set());
  const [filterDistrict, setFilterDistrict] = useState<string>("all");

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

  // Get unique districts from reports for the filter
  const reportDistricts = [...new Set(reports.map(r => r.district))].sort();
  const filteredReports = filterDistrict === "all"
    ? reports
    : reports.filter(r => r.district === filterDistrict);

  const confirmedCount = reports.filter(r => r.status === "confirmed").length;
  const pendingCount = reports.filter(r => r.status === "pending").length;

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${isElectricity ? "from-electricity/5 via-electricity/2" : "from-water/5 via-water/2"} to-background`} />
      <div className="max-w-lg mx-auto pt-6 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/${utility}`)} className="rounded-xl hover:bg-muted/80">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isElectricity ? "gradient-electricity shadow-glow-electricity" : "gradient-water shadow-glow-water"}`}>
              {isElectricity ? <Zap className="w-4 h-4 text-electricity-foreground" /> : <Droplets className="w-4 h-4 text-water-foreground" />}
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold leading-tight">
                Area {isElectricity ? "Outages" : "Issues"}
              </h1>
              <p className="text-xs text-muted-foreground">Live reports from your community</p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        {reports.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-muted/40 rounded-xl p-3 text-center glass">
              <p className="text-2xl font-heading font-bold text-foreground">{reports.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div className="bg-status-confirmed/5 rounded-xl p-3 text-center border border-status-confirmed/10">
              <p className="text-2xl font-heading font-bold text-status-confirmed">{confirmedCount}</p>
              <p className="text-xs text-muted-foreground">Confirmed</p>
            </div>
            <div className="bg-status-possible/5 rounded-xl p-3 text-center border border-status-possible/10">
              <p className="text-2xl font-heading font-bold text-status-possible">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </div>
        )}

        {/* District Filter */}
        {reportDistricts.length > 1 && (
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={filterDistrict} onValueChange={setFilterDistrict}>
              <SelectTrigger className="rounded-xl h-9 text-sm bg-background/50 flex-1">
                <SelectValue placeholder="Filter by district" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                {reportDistricts.map(d => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : reports.length === 0 ? (
          <Card className="shadow-card glass border-border/50">
            <CardContent className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-status-normal/10 flex items-center justify-center">
                <CircleCheck className="w-8 h-8 text-status-normal" />
              </div>
              <p className="text-lg font-heading font-bold text-foreground">All Clear!</p>
              <p className="text-muted-foreground mt-1">No active {isElectricity ? "electricity" : "water"} issues reported in Uganda.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredReports.map((report) => {
              const status = statusConfig[report.status] || statusConfig.pending;
              const StatusIcon = status.icon;
              const alreadyVerified = verifiedReports.has(report.id);
              const isOwn = report.user_id === user?.id;
              const timeAgo = getTimeAgo(report.created_at);

              return (
                <Card key={report.id} className="shadow-card glass border-border/50 hover:shadow-card-hover transition-shadow duration-300">
                  <CardContent className="p-4 space-y-3">
                    {/* Community verification prompt */}
                    {!isOwn && !alreadyVerified && report.status === "pending" && (
                      <div className={`p-3.5 rounded-xl ${isElectricity ? "bg-electricity/5 border border-electricity/15" : "bg-water/5 border border-water/15"} flex items-start gap-2.5`}>
                        <Bell className={`w-4 h-4 mt-0.5 shrink-0 ${isElectricity ? "text-electricity" : "text-water"}`} />
                        <p className="text-xs leading-relaxed">
                          Someone reported <strong>{report.problem_type.toLowerCase()}</strong> in{" "}
                          <strong>{report.town_village}, {report.district}</strong>. Are you experiencing this?
                        </p>
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-card-foreground">{report.problem_type}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                          <p className="text-sm text-muted-foreground truncate">
                            {report.town_village}, {report.district}
                          </p>
                        </div>
                      </div>
                      <Badge className={`${status.color} gap-1 shrink-0 border`} variant="outline">
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </Badge>
                    </div>

                    {report.description && (
                      <p className="text-sm text-muted-foreground bg-muted/30 p-2.5 rounded-lg">{report.description}</p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">
                          👍 {report.confirmations} · 👎 {report.denials}
                        </span>
                        <span className="text-xs text-muted-foreground/60">
                          {timeAgo}
                        </span>
                      </div>
                      {!isOwn && !alreadyVerified && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerify(report.id, true)}
                            className="gap-1.5 rounded-xl h-8 text-xs border-status-normal/30 hover:bg-status-normal/10 hover:text-status-normal"
                          >
                            <ThumbsUp className="w-3 h-3" /> Yes
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerify(report.id, false)}
                            className="gap-1.5 rounded-xl h-8 text-xs border-status-confirmed/30 hover:bg-status-confirmed/10 hover:text-status-confirmed"
                          >
                            <ThumbsDown className="w-3 h-3" /> No
                          </Button>
                        </div>
                      )}
                      {alreadyVerified && (
                        <Badge variant="secondary" className="gap-1 rounded-lg">
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

function getTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
