import { useState, useMemo } from "react";
import electricPoleWorker from "@/assets/electric-pole-worker.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Zap, Droplets, Eye, EyeOff, Mail, Lock, User, MapPin, Search, ChevronDown, X } from "lucide-react";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { searchDistricts, getTownsForDistrict } from "@/data/ugandaLocations";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [district, setDistrict] = useState("");
  const [townVillage, setTownVillage] = useState("");
  const [districtSearch, setDistrictSearch] = useState("");
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const filteredDistricts = useMemo(() => searchDistricts(districtSearch), [districtSearch]);
  const towns = district ? getTownsForDistrict(district) : [];

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address first");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset link sent! Check your email.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        navigate("/");
      }
    } else {
      if (!fullName.trim()) {
        toast.error("Please enter your full name");
        setLoading(false);
        return;
      }
      if (!district || !townVillage) {
        toast.error("Please select your district and town");
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, fullName, district, townVillage);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created! Please check your email to verify, then sign in.");
        setIsLogin(true);
        setEmail("");
        setPassword("");
        setFullName("");
        setDistrict("");
        setTownVillage("");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={electricPoleWorker} alt="Utility workers on electric pole" className="w-full h-full object-cover -rotate-3 scale-110 origin-center" />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      <div className="w-full max-w-md animate-slide-up relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 bg-background/60 backdrop-blur-sm rounded-2xl px-6 py-4">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl gradient-electricity flex items-center justify-center shadow-glow-electricity">
              <Zap className="w-6 h-6 text-electricity-foreground" />
            </div>
            <div className="w-12 h-12 rounded-2xl gradient-water flex items-center justify-center shadow-glow-water">
              <Droplets className="w-6 h-6 text-water-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground drop-shadow-md">
            Utility Pulse UG
          </h1>
          <p className="text-muted-foreground mt-1 drop-shadow-sm">
            Community-powered utility monitoring for Uganda
          </p>
        </div>

        <Card className="shadow-card-hover glass border-border/50 max-h-[70vh] overflow-y-auto">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">
              {isLogin ? "Welcome back" : "Create account"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Sign in to manage your utilities"
                : "Join the community to monitor services"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="pl-10"
                        required={!isLogin}
                      />
                    </div>
                  </div>

                  {/* District */}
                  <div className="space-y-2">
                    <Label>District</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                      <Input
                        placeholder="Search & select district..."
                        value={showDistrictDropdown ? districtSearch : district || ""}
                        onChange={(e) => {
                          setDistrictSearch(e.target.value);
                          setShowDistrictDropdown(true);
                          if (district) {
                            setDistrict("");
                            setTownVillage("");
                          }
                        }}
                        onFocus={() => setShowDistrictDropdown(true)}
                        className="pl-10 pr-9"
                      />
                      {district ? (
                        <button
                          type="button"
                          onClick={() => {
                            setDistrict("");
                            setDistrictSearch("");
                            setTownVillage("");
                            setShowDistrictDropdown(true);
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      ) : (
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      )}
                      {showDistrictDropdown && !district && (
                        <div className="absolute z-20 w-full mt-1 bg-popover border border-border rounded-xl shadow-lg max-h-40 overflow-y-auto">
                          {filteredDistricts.length > 0 ? (
                            filteredDistricts.map((d) => (
                              <button
                                key={d}
                                type="button"
                                onClick={() => {
                                  setDistrict(d);
                                  setDistrictSearch("");
                                  setShowDistrictDropdown(false);
                                  setTownVillage("");
                                }}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors first:rounded-t-xl last:rounded-b-xl"
                              >
                                {d}
                              </button>
                            ))
                          ) : (
                            <p className="px-4 py-3 text-sm text-muted-foreground text-center">No districts found</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Town */}
                  {district && (
                    <div className="space-y-2">
                      <Label>Town / Village</Label>
                      <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto rounded-xl border border-border/50 p-2 bg-background/30">
                        {towns.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTownVillage(t)}
                            className={`text-left px-3 py-1.5 rounded-lg text-xs transition-all duration-150
                              ${townVillage === t
                                ? "bg-primary/10 text-foreground font-semibold border border-primary/30"
                                : "hover:bg-muted/50 text-foreground/70 border border-transparent"
                              }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {isLogin && (
                <div className="flex justify-end -mt-1">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              <Button
                type="submit"
                className="w-full h-12 text-base font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={loading || (!isLogin && (!district || !townVillage))}
              >
                {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or continue with</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base font-medium rounded-xl gap-3"
              onClick={async () => {
                const { error } = await lovable.auth.signInWithOAuth("google", {
                  redirect_uri: window.location.origin,
                });
                if (error) toast.error(error.message);
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </Button>
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
