import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Users, FileText, Zap, Droplets, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Report = Tables<"reports">;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReports: 0,
    electricityReports: 0,
    waterReports: 0,
    confirmedOutages: 0,
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }
    fetchData();
  }, [isAdmin]);

  const fetchData = async () => {
    const [reportsRes, profilesRes] = await Promise.all([
      supabase.from("reports").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id", { count: "exact" }),
    ]);

    const allReports = reportsRes.data || [];
    setReports(allReports);
    setStats({
      totalUsers: profilesRes.count || 0,
      totalReports: allReports.length,
      electricityReports: allReports.filter((r) => r.utility === "electricity").length,
      waterReports: allReports.filter((r) => r.utility === "water").length,
      confirmedOutages: allReports.filter((r) => r.status === "confirmed").length,
    });
    setLoading(false);
  };

  const updateStatus = async (reportId: string, newStatus: string) => {
    const { error } = await supabase
      .from("reports")
      .update({ status: newStatus })
      .eq("id", reportId);
    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success("Status updated");
      fetchData();
    }
  };

  // Area hotspots
  const hotspots = reports.reduce<Record<string, number>>((acc, r) => {
    const key = `${r.town_village}, ${r.district}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const sortedHotspots = Object.entries(hotspots).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const statusColors: Record<string, string> = {
    pending: "bg-status-possible/10 text-status-possible",
    investigating: "bg-primary/10 text-primary",
    confirmed: "bg-status-confirmed/10 text-status-confirmed",
    resolved: "bg-status-normal/10 text-status-normal",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto pt-6">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-heading font-bold">Admin Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { icon: Users, label: "Total Users", value: stats.totalUsers, color: "text-primary" },
            { icon: FileText, label: "Total Reports", value: stats.totalReports, color: "text-foreground" },
            { icon: Zap, label: "Electricity", value: stats.electricityReports, color: "text-electricity" },
            { icon: Droplets, label: "Water", value: stats.waterReports, color: "text-water" },
            { icon: AlertTriangle, label: "Confirmed", value: stats.confirmedOutages, color: "text-status-confirmed" },
          ].map((stat) => (
            <Card key={stat.label} className="shadow-card">
              <CardContent className="p-4 text-center">
                <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                <p className={`text-2xl font-heading font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Reports Table */}
          <div className="md:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Recent Reports</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium text-muted-foreground">Utility</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">Location</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">Problem</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.slice(0, 20).map((report) => (
                        <tr key={report.id} className="border-b last:border-0">
                          <td className="p-3">
                            {report.utility === "electricity" ? "⚡" : "💧"} {report.utility}
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {report.town_village}, {report.district}
                          </td>
                          <td className="p-3">{report.problem_type}</td>
                          <td className="p-3">
                            <Select
                              value={report.status}
                              onValueChange={(val) => updateStatus(report.id, val)}
                            >
                              <SelectTrigger className="w-32 h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="investigating">Investigating</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {reports.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No reports yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hotspots */}
          <div>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">🔥 Area Hotspots</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sortedHotspots.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No hotspots yet.</p>
                ) : (
                  sortedHotspots.map(([area, count]) => (
                    <div key={area} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <span className="text-sm font-medium">{area}</span>
                      <Badge variant="secondary">{count} reports</Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
