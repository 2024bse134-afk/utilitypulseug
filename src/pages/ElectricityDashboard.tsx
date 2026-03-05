import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Zap, CreditCard, AlertTriangle, MapPin, BarChart3, ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ElectricityDashboard() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const actions = [
    { icon: CreditCard, label: "Pay Electricity Bill", desc: "MTN & Airtel Mobile Money", path: "/pay/electricity" },
    { icon: AlertTriangle, label: "Report Problem", desc: "Outage, low voltage, fluctuation", path: "/report/electricity" },
    { icon: MapPin, label: "View Area Outages", desc: "See issues near you", path: "/outages/electricity" },
    { icon: BarChart3, label: "Service Reliability", desc: "Area reliability scores", path: "/reliability/electricity" },
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-lg mx-auto pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-electricity flex items-center justify-center">
                <Zap className="w-5 h-5 text-electricity-foreground" />
              </div>
              <h1 className="text-xl font-heading font-bold">Electricity</h1>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={signOut}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid gap-3">
          {actions.map((action) => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="flex items-center gap-4 p-5 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-all hover:scale-[1.01] active:scale-[0.99] text-left w-full"
            >
              <div className="w-12 h-12 rounded-xl bg-electricity-light flex items-center justify-center shrink-0">
                <action.icon className="w-6 h-6 text-electricity" />
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
