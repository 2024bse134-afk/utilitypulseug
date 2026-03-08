import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Zap, Droplets, LogOut, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UtilitySelection() {
  const { profile, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-electricity/5 via-background to-water/5" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-electricity/8 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-water/8 rounded-full blur-3xl" />

      <div className="max-w-lg mx-auto pt-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
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
                className="rounded-xl"
              >
                <Shield className="w-4 h-4" />
              </Button>
            )}
            <Button variant="outline" onClick={signOut} className="rounded-xl gap-2">
              <LogOut className="w-4 h-4" />
              Log Out
            </Button>
          </div>
        </div>

        {/* Utility Cards */}
        <div className="grid gap-5">
          <button
            onClick={() => navigate("/electricity")}
            className="group relative overflow-hidden rounded-2xl p-8 gradient-electricity-dark text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-electricity active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/10">
                <Zap className="w-8 h-8" />
              </div>
              <div className="text-left flex-1">
                <h2 className="text-2xl font-heading font-bold">Electricity</h2>
                <p className="text-white/70 text-sm mt-1">
                  Pay bills, report outages & check reliability
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white/80 group-hover:translate-x-1 transition-all" />
            </div>
          </button>

          <button
            onClick={() => navigate("/water")}
            className="group relative overflow-hidden rounded-2xl p-8 gradient-water-dark text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-water active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/10">
                <Droplets className="w-8 h-8" />
              </div>
              <div className="text-left flex-1">
                <h2 className="text-2xl font-heading font-bold">Water</h2>
                <p className="text-white/70 text-sm mt-1">
                  Pay bills, report issues & check service status
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white/80 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
