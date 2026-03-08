import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Users, FileText, Zap, Droplets, AlertTriangle, Flame, Home } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Report = Tables<"reports">;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin, signOut } = useAuth();
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

    const channel = supabase
      .channel("admin-reports")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reports" },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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

  // Area hotspots with status breakdown
  const hotspots = reports.reduce<Record<string, { total: number; electricity: number; water: number; confirmed: number; pending: number; investigating: number; resolved: number }>>((acc, r) => {
    const key = `${r.town_village}, ${r.district}`;
    if (!acc[key]) acc[key] = { total: 0, electricity: 0, water: 0, confirmed: 0, pending: 0, investigating: 0, resolved: 0 };
    acc[key].total += 1;
    acc[key][r.utility as "electricity" | "water"] += 1;
    acc[key][r.status as "confirmed" | "pending" | "investigating" | "resolved"] = (acc[key][r.status as "confirmed" | "pending" | "investigating" | "resolved"] || 0) + 1;
    return acc;
  }, {});
  const sortedHotspots = Object.entries(hotspots).sort((a, b) => b[1].confirmed - a[1].confirmed || b[1].total - a[1].total).slice(0, 10);

  const statusColors: Record<string, string> = {
    pending: "bg-status-possible/10 text-status-possible",
    investigating: "bg-primary/10 text-primary",
    confirmed: "bg-status-confirmed/10 text-status-confirmed",
    resolved: "bg-status-normal/10 text-status-normal",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-background to-accent/5" />
      <div className="max-w-5xl mx-auto pt-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-xl">
              <Home className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-heading font-bold">Admin Dashboard</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut} className="rounded-xl">
            Sign out
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { icon: Users, label: "Total Users", value: stats.totalUsers, bg: "bg-primary/10", color: "text-primary" },
            { icon: FileText, label: "Total Reports", value: stats.totalReports, bg: "bg-muted", color: "text-foreground" },
            { icon: Zap, label: "Electricity", value: stats.electricityReports, bg: "bg-electricity-light", color: "text-electricity" },
            { icon: Droplets, label: "Water", value: stats.waterReports, bg: "bg-water-light", color: "text-water" },
            { icon: AlertTriangle, label: "Confirmed", value: stats.confirmedOutages, bg: "bg-status-confirmed/10", color: "text-status-confirmed" },
          ].map((stat) => (
            <Card key={stat.label} className="shadow-card glass border-border/50">
              <CardContent className="p-4 text-center">
                <div className={`w-10 h-10 mx-auto rounded-xl ${stat.bg} flex items-center justify-center mb-2`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className={`text-2xl font-heading font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Reports Tables */}
          <div className="md:col-span-2 space-y-6">
            {/* Electricity Reports */}
            <Card className="shadow-card glass border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-electricity" />
                  Electricity Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium text-muted-foreground">Location</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">Problem</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.filter(r => r.utility === "electricity").slice(0, 20).map((report) => (
                        <tr key={report.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-3 text-muted-foreground">
                            {report.town_village}, {report.district}
                          </td>
                          <td className="p-3">{report.problem_type}</td>
                          <td className="p-3">
                            <Select value={report.status} onValueChange={(val) => updateStatus(report.id, val)}>
                              <SelectTrigger className="w-32 h-8 rounded-lg">
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
                  {reports.filter(r => r.utility === "electricity").length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No electricity reports yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Water Reports */}
            <Card className="shadow-card glass border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-water" />
                  Water Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium text-muted-foreground">Location</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">Problem</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.filter(r => r.utility === "water").slice(0, 20).map((report) => (
                        <tr key={report.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-3 text-muted-foreground">
                            {report.town_village}, {report.district}
                          </td>
                          <td className="p-3">{report.problem_type}</td>
                          <td className="p-3">
                            <Select value={report.status} onValueChange={(val) => updateStatus(report.id, val)}>
                              <SelectTrigger className="w-32 h-8 rounded-lg">
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
                  {reports.filter(r => r.utility === "water").length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No water reports yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hotspots */}
          <div>
            <Card className="shadow-card glass border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Flame className="w-5 h-5 text-status-confirmed" />
                  Area Hotspots
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sortedHotspots.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No hotspots yet.</p>
                ) : (
                  sortedHotspots.map(([area, data]) => (
                    <div key={area} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <span className="text-sm font-medium">{area}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                            <Zap className="w-3 h-3 text-electricity" /> {data.electricity}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                            <Droplets className="w-3 h-3 text-water" /> {data.water}
                          </span>
                        </div>
                      </div>
                      <Badge variant="secondary">{data.total} reports</Badge>
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
