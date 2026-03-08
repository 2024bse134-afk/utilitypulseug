import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import waterBg from "@/assets/water-bg.jpg";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Droplets, CreditCard, AlertTriangle, MapPin, BarChart3, ArrowLeft, LogOut, Gauge, ChevronRight, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WaterDashboard() {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [units, setUnits] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("utility_units")
      .select("units")
      .eq("user_id", user.id)
      .eq("utility", "water")
      .single()
      .then(({ data }) => setUnits(data?.units ?? 0));
  }, [user]);

  const actions = [
    { icon: CreditCard, label: "Pay Bill", desc: "MTN & Airtel Mobile Money", path: "/pay/water" },
    { icon: AlertTriangle, label: "Report Problem", desc: "Shortage, pipe leak, low pressure", path: "/report/water" },
    { icon: MapPin, label: "Areas with Issues", desc: "See issues near you", path: "/outages/water" },
  ];

  const unitsValue = units !== null ? units.toFixed(1) : "—";
  const unitsPercent = units !== null ? Math.min((units / 100) * 100, 100) : 0;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image - top section */}
      <div className="absolute inset-0">
        <img src={waterWorker} alt="Water infrastructure worker" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/90" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Top nav - over the image */}
        <div className="flex items-center justify-between px-4 pt-5 pb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2.5 bg-water/30 backdrop-blur-md rounded-full px-4 py-1.5">
            <div className="w-8 h-8 rounded-lg gradient-water flex items-center justify-center shadow-glow-water">
              <Droplets className="w-4 h-4 text-water-foreground" />
            </div>
            <h1 className="text-lg font-heading font-bold text-white drop-shadow-lg">Water</h1>
          </div>
          <Button
            variant="ghost"
            onClick={signOut}
            className="rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 hover:text-white text-xs gap-1.5 px-3 h-9"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </Button>
        </div>

        {/* Greeting */}
        <div className="px-5 pt-2 pb-6 flex items-end justify-between">
          <div>
            <p className="text-white/80 text-sm drop-shadow">Welcome back,</p>
            <p className="text-white text-xl font-heading font-bold drop-shadow-lg">
              {profile?.full_name || "User"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className="rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 hover:text-white h-9 w-9"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Main content area with rounded top */}
        <div className="bg-background/95 backdrop-blur-sm rounded-t-3xl min-h-[calc(100vh-13rem)] px-4 pt-6 pb-8 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
          {/* Units Card */}
          <div className="rounded-2xl gradient-water p-5 mb-6 shadow-glow-water">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-black/15 flex items-center justify-center">
                  <Gauge className="w-6 h-6 text-water-foreground" />
                </div>
                <div>
                  <p className="text-water-foreground/70 text-xs font-medium uppercase tracking-wider">Remaining Units</p>
                  <p className="text-3xl font-heading font-bold text-water-foreground">{unitsValue}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-water-foreground/70 text-xs">Litres</p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-black/15 overflow-hidden">
              <div
                className="h-full rounded-full bg-water-foreground/60 transition-all duration-700"
                style={{ width: `${unitsPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">Quick Actions</h2>
          <div className="space-y-3">
            {actions.map((action) => (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                className="flex items-center gap-4 p-4 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] text-left w-full border border-border/50 group"
              >
                <div className="w-12 h-12 rounded-xl bg-water-light flex items-center justify-center shrink-0">
                  <action.icon className="w-5 h-5 text-water" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground text-sm">{action.label}</h3>
                  <p className="text-xs text-muted-foreground truncate">{action.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
