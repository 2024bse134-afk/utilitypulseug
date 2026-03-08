import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, Minus, MapPin, Zap, Droplets, Filter, Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Tables } from "@/integrations/supabase/types";

type Report = Tables<"reports">;

export default function ReliabilityPage() {
  const { utility } = useParams<{ utility: string }>();
  const navigate = useNavigate();
  const [areaScores, setAreaScores] = useState<{ area: string; district: string; score: number; totalReports: number; activeIssues: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDistrict, setFilterDistrict] = useState<string>("all");

  useEffect(() => {
    fetchReliability();
  }, [utility]);

  const fetchReliability = async () => {
    const { data: reports } = await supabase
      .from("reports")
      .select("*")
      .eq("utility", utility!);

    if (!reports || reports.length === 0) {
      setAreaScores([]);
      setLoading(false);
      return;
    }

    const areaMap = new Map<string, { district: string; total: number; resolved: number; active: number }>();
    reports.forEach((r) => {
      const key = `${r.town_village}__${r.district}`;
      const current = areaMap.get(key) || { district: r.district, total: 0, resolved: 0, active: 0 };
      current.total += 1;
      if (r.status === "resolved") current.resolved += 1;
      else current.active += 1;
      areaMap.set(key, current);
    });

    const scores = Array.from(areaMap.entries()).map(([key, data]) => ({
      area: key.split("__")[0],
      district: data.district,
      score: Math.max(0, Math.round(100 - (data.total - data.resolved) * 10)),
      totalReports: data.total,
      activeIssues: data.active,
    }));

    scores.sort((a, b) => a.score - b.score);
    setAreaScores(scores);
    setLoading(false);
  };

  const isElectricity = utility === "electricity";

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-status-normal";
    if (score >= 50) return "text-status-possible";
    return "text-status-confirmed";
  };
  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-status-normal/5 border-status-normal/15";
    if (score >= 50) return "bg-status-possible/5 border-status-possible/15";
    return "bg-status-confirmed/5 border-status-confirmed/15";
  };
  const getScoreIcon = (score: number) => {
    if (score >= 80) return ShieldCheck;
    if (score >= 50) return Shield;
    return ShieldAlert;
  };
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-status-normal";
    if (score >= 50) return "bg-status-possible";
    return "bg-status-confirmed";
  };

  const districts = [...new Set(areaScores.map(a => a.district))].sort();
  const filteredScores = filterDistrict === "all"
    ? areaScores
    : areaScores.filter(a => a.district === filterDistrict);

  const avgScore = areaScores.length > 0
    ? Math.round(areaScores.reduce((sum, a) => sum + a.score, 0) / areaScores.length)
    : 100;

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
              <h1 className="text-xl font-heading font-bold leading-tight">Service Reliability</h1>
              <p className="text-xs text-muted-foreground">Based on community reports across Uganda</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : areaScores.length === 0 ? (
          <Card className="shadow-card glass border-border/50">
            <CardContent className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-heading font-bold">No data yet</p>
              <p className="text-muted-foreground mt-1">Community reports will generate reliability scores.</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Overall Score */}
            <Card className={`shadow-card-hover glass border mb-4 ${getScoreBg(avgScore)}`}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Reliability</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Across {areaScores.length} areas in Uganda
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-4xl font-heading font-bold ${getScoreColor(avgScore)}`}>
                      {avgScore}%
                    </p>
                  </div>
                </div>
                <div className="mt-3 h-2.5 bg-muted/30 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${getProgressColor(avgScore)}`} style={{ width: `${avgScore}%` }} />
                </div>
              </CardContent>
            </Card>

            {/* District filter */}
            {districts.length > 1 && (
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={filterDistrict} onValueChange={setFilterDistrict}>
                  <SelectTrigger className="rounded-xl h-9 text-sm bg-background/50 flex-1">
                    <SelectValue placeholder="Filter by district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    {districts.map(d => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Area Scores */}
            <Card className="shadow-card glass border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Area Scores</CardTitle>
                <CardDescription>
                  {filteredScores.length} area{filteredScores.length !== 1 ? "s" : ""} ranked by reliability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {filteredScores.map((item, index) => {
                  const ScoreIcon = getScoreIcon(item.score);
                  return (
                    <div
                      key={`${item.area}-${item.district}`}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 hover:shadow-sm ${getScoreBg(item.score)}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          item.score >= 80 ? "bg-status-normal/10" : item.score >= 50 ? "bg-status-possible/10" : "bg-status-confirmed/10"
                        }`}>
                          <ScoreIcon className={`w-4 h-4 ${getScoreColor(item.score)}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate">{item.area}</p>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                            <p className="text-xs text-muted-foreground truncate">{item.district}</p>
                            <span className="text-xs text-muted-foreground/50">·</span>
                            <p className="text-xs text-muted-foreground">{item.totalReports} reports</p>
                          </div>
                          {item.activeIssues > 0 && (
                            <Badge variant="outline" className="mt-1 text-[10px] h-5 border-status-confirmed/20 text-status-confirmed">
                              {item.activeIssues} active issue{item.activeIssues !== 1 ? "s" : ""}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <span className={`text-2xl font-heading font-bold ${getScoreColor(item.score)}`}>
                          {item.score}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
