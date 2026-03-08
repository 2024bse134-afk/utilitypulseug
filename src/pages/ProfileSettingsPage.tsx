import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { UGANDA_DISTRICTS_TOWNS } from "@/data/ugandaLocations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, MapPin, Save, Search, Check } from "lucide-react";
import { toast } from "sonner";

export default function ProfileSettingsPage() {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [district, setDistrict] = useState("");
  const [townVillage, setTownVillage] = useState("");
  const [districtSearch, setDistrictSearch] = useState("");
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name);
      setDistrict(profile.district);
      setTownVillage(profile.town_village);
    }
  }, [profile]);

  const districts = Object.keys(UGANDA_DISTRICTS_TOWNS).sort();
  const filteredDistricts = districtSearch
    ? districts.filter((d) => d.toLowerCase().includes(districtSearch.toLowerCase()))
    : districts;
  const towns = district ? UGANDA_DISTRICTS_TOWNS[district] || [] : [];

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, district, town_village: townVillage })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully");
    }
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-background to-accent/5" />
      <div className="max-w-lg mx-auto pt-6 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-heading font-bold">Profile Settings</h1>
        </div>

        <Card className="shadow-card glass border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="rounded-xl"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email (read-only) */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user.email || ""} disabled className="rounded-xl bg-muted/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card glass border-border/50 mt-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* District */}
            <div className="space-y-2">
              <Label>District</Label>
              {district && !showDistrictDropdown ? (
                <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-3 py-2.5">
                  <span className="text-sm font-medium">{district}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs text-muted-foreground"
                    onClick={() => {
                      setShowDistrictDropdown(true);
                      setDistrictSearch("");
                    }}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search & select district..."
                      value={districtSearch}
                      onChange={(e) => setDistrictSearch(e.target.value)}
                      onFocus={() => setShowDistrictDropdown(true)}
                      className="pl-9 rounded-xl"
                    />
                  </div>
                  {showDistrictDropdown && (
                    <div className="mt-1 max-h-40 overflow-y-auto rounded-xl border border-border/50 bg-card p-1 shadow-lg">
                      {filteredDistricts.length > 0 ? (
                        filteredDistricts.map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => {
                              setDistrict(d);
                              setTownVillage("");
                              setDistrictSearch("");
                              setShowDistrictDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                              ${district === d ? "bg-primary/10 font-semibold" : "hover:bg-muted/50"}`}
                          >
                            {d}
                          </button>
                        ))
                      ) : (
                        <p className="px-3 py-2 text-sm text-muted-foreground">No districts found</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Town */}
            <div className="space-y-2">
              <Label>Town / Village</Label>
              {district ? (
                townVillage ? (
                  <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-3 py-2.5">
                    <span className="text-sm font-medium">{townVillage}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs text-muted-foreground"
                      onClick={() => setTownVillage("")}
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto rounded-xl border border-border/50 p-2 bg-background/30">
                    {towns.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTownVillage(t)}
                        className="text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 hover:bg-muted/50 text-foreground/70 border border-transparent"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center rounded-xl border border-dashed border-border/50 bg-muted/20">
                  Select a district first
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleSave}
          disabled={saving || !fullName || !district || !townVillage}
          className="w-full mt-6 rounded-xl h-12 text-base font-semibold"
        >
          {saving ? (
            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
