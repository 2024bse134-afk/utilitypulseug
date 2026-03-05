import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Zap, Droplets, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UtilitySelection() {
  const { profile, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-lg mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Welcome, {profile?.full_name || "User"}!
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Which utility would you like to manage today?
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate("/admin")}
                title="Admin Dashboard"
              >
                <Shield className="w-4 h-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={signOut} title="Sign out">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Utility Cards */}
        <div className="grid gap-4">
          <button
            onClick={() => navigate("/electricity")}
            className="group relative overflow-hidden rounded-2xl p-8 gradient-electricity text-electricity-foreground transition-all hover:scale-[1.02] hover:shadow-card-hover active:scale-[0.98]"
          >
            <div className="relative z-10 flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-electricity-foreground/10 flex items-center justify-center">
                <Zap className="w-8 h-8" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-heading font-bold">Electricity</h2>
                <p className="text-electricity-foreground/70 text-sm mt-1">
                  Pay bills, report outages & check reliability
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate("/water")}
            className="group relative overflow-hidden rounded-2xl p-8 gradient-water text-water-foreground transition-all hover:scale-[1.02] hover:shadow-card-hover active:scale-[0.98]"
          >
            <div className="relative z-10 flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-water-foreground/10 flex items-center justify-center">
                <Droplets className="w-8 h-8" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-heading font-bold">Water</h2>
                <p className="text-water-foreground/70 text-sm mt-1">
                  Pay bills, report issues & check service status
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
