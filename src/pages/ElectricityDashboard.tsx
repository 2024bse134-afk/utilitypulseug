import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import electricPoleWorker from "@/assets/electric-pole-worker.jpg";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Zap, CreditCard, AlertTriangle, MapPin, BarChart3, ArrowLeft, LogOut, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ElectricityDashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [units, setUnits] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("utility_units")
      .select("units")
      .eq("user_id", user.id)
      .eq("utility", "electricity")
      .single()
      .then(({ data }) => setUnits(data?.units ?? 0));
  }, [user]);

  const actions = [
    { icon: CreditCard, label: "Pay Electricity Bill", desc: "MTN & Airtel Mobile Money", path: "/pay/electricity", accent: "bg-electricity-light text-electricity" },
    { icon: AlertTriangle, label: "Report Problem", desc: "Outage, low voltage, fluctuation", path: "/report/electricity", accent: "bg-electricity-light text-electricity" },
    { icon: MapPin, label: "View Area Outages", desc: "See issues near you", path: "/outages/electricity", accent: "bg-electricity-light text-electricity" },
    { icon: BarChart3, label: "Service Reliability", desc: "Area reliability scores", path: "/reliability/electricity", accent: "bg-electricity-light text-electricity" },
  ];

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-electricity/5 via-background to-electricity/3" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-electricity/10 rounded-full blur-3xl" />

      <div className="max-w-lg mx-auto pt-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-xl">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-electricity flex items-center justify-center shadow-glow-electricity">
                <Zap className="w-5 h-5 text-electricity-foreground" />
              </div>
              <h1 className="text-xl font-heading font-bold">Electricity</h1>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={signOut} className="rounded-xl">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        {/* Units Display */}
        <Card className="mb-5 shadow-card-hover glass border-electricity/20">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl gradient-electricity flex items-center justify-center">
              <Gauge className="w-7 h-7 text-electricity-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining Units</p>
              <p className="text-3xl font-heading font-bold text-foreground">
                {units !== null ? units.toFixed(1) : "—"}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-3">
          {actions.map((action, i) => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="flex items-center gap-4 p-5 rounded-xl glass shadow-card hover:shadow-card-hover transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] text-left w-full border border-border/50"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${action.accent} flex items-center justify-center shrink-0`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">{action.label}</h3>
                <p className="text-sm text-muted-foreground">{action.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
