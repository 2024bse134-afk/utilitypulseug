import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Report = Tables<"reports">;

export default function ReliabilityPage() {
  const { utility } = useParams<{ utility: string }>();
  const navigate = useNavigate();
  const [areaScores, setAreaScores] = useState<{ area: string; score: number; totalReports: number }[]>([]);
  const [loading, setLoading] = useState(true);

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

    const areaMap = new Map<string, { total: number; resolved: number }>();
    reports.forEach((r) => {
      const current = areaMap.get(r.town_village) || { total: 0, resolved: 0 };
      current.total += 1;
      if (r.status === "resolved") current.resolved += 1;
      areaMap.set(r.town_village, current);
    });

    const scores = Array.from(areaMap.entries()).map(([area, data]) => ({
      area,
      score: Math.max(0, Math.round(100 - (data.total - data.resolved) * 10)),
      totalReports: data.total,
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
    if (score >= 80) return "bg-status-normal/10";
    if (score >= 50) return "bg-status-possible/10";
    return "bg-status-confirmed/10";
  };
  const getScoreIcon = (score: number) => {
    if (score >= 80) return TrendingUp;
    if (score >= 50) return Minus;
    return TrendingDown;
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${isElectricity ? "from-electricity/5" : "from-water/5"} to-background`} />
      <div className="max-w-lg mx-auto pt-6 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/${utility}`)} className="rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <BarChart3 className={`w-5 h-5 ${isElectricity ? "text-electricity" : "text-water"}`} />
            <h1 className="text-xl font-heading font-bold">Service Reliability</h1>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : areaScores.length === 0 ? (
          <Card className="shadow-card glass">
            <CardContent className="py-12 text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-lg font-semibold">No data yet</p>
              <p className="text-muted-foreground mt-1">Reports will generate reliability scores.</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-card glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Area Reliability Scores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {areaScores.map((item) => {
                const ScoreIcon = getScoreIcon(item.score);
                return (
                  <div key={item.area} className={`flex items-center justify-between p-3 rounded-lg ${getScoreBg(item.score)}`}>
                    <div className="flex items-center gap-3">
                      <ScoreIcon className={`w-4 h-4 ${getScoreColor(item.score)}`} />
                      <div>
                        <p className="font-medium text-foreground">{item.area}</p>
                        <p className="text-xs text-muted-foreground">{item.totalReports} reports</p>
                      </div>
                    </div>
                    <span className={`text-2xl font-heading font-bold ${getScoreColor(item.score)}`}>
                      {item.score}%
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
