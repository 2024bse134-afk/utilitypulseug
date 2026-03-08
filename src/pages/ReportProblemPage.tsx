import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle, CheckCircle2, MapPin, Zap, Droplets, FileWarning, Search, ChevronDown, X } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { getDistricts, getTownsForDistrict, searchDistricts } from "@/data/ugandaLocations";

const ELECTRICITY_PROBLEMS = [
  { value: "Power outage", icon: "⚡", desc: "Complete loss of electricity" },
  { value: "Low voltage", icon: "📉", desc: "Dim lights, appliances struggling" },
  { value: "Power fluctuation", icon: "🔄", desc: "Intermittent on/off power" },
];
const WATER_PROBLEMS = [
  { value: "Water shortage", icon: "🚫", desc: "No water flowing from taps" },
  { value: "Pipe leak", icon: "💧", desc: "Visible water leak from pipes" },
  { value: "Low pressure", icon: "📉", desc: "Very weak water flow" },
];

export default function ReportProblemPage() {
  const { utility } = useParams<{ utility: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [problemType, setProblemType] = useState("");
  const [district, setDistrict] = useState("");
  const [townVillage, setTownVillage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [townSearch, setTownSearch] = useState("");
  const [districtSearch, setDistrictSearch] = useState("");
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

  // Pre-fill from user profile
  useState(() => {
    if (profile?.district) setDistrict(profile.district);
    if (profile?.town_village) setTownVillage(profile.town_village);
  });

  const isElectricity = utility === "electricity";
  const problems = isElectricity ? ELECTRICITY_PROBLEMS : WATER_PROBLEMS;
  const filteredDistricts = useMemo(() => searchDistricts(districtSearch), [districtSearch]);
  const towns = district ? getTownsForDistrict(district) : [];
  const filteredTowns = townSearch
    ? towns.filter(t => t.toLowerCase().includes(townSearch.toLowerCase()))
    : towns;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const { error } = await supabase.from("reports").insert({
      user_id: user.id,
      utility: utility!,
      problem_type: problemType,
      district,
      town_village: townVillage,
      description: description || "",
    });

    if (error) {
      toast.error("Failed to submit report: " + error.message);
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-status-normal/5 via-background to-background" />
        <Card className="max-w-md w-full shadow-card-hover glass animate-slide-up relative z-10 border-status-normal/20">
          <CardContent className="pt-8 pb-8 text-center space-y-5">
            <div className="w-20 h-20 mx-auto rounded-full bg-status-normal/10 flex items-center justify-center ring-4 ring-status-normal/20">
              <CheckCircle2 className="w-10 h-10 text-status-normal" />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">Report Submitted!</h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                Your report has been submitted successfully. We are asking other users in{" "}
                <span className="font-semibold text-foreground">{townVillage}</span>,{" "}
                <span className="text-foreground">{district}</span> to confirm this issue.
              </p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-left space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FileWarning className={`w-4 h-4 ${isElectricity ? "text-electricity" : "text-water"}`} />
                <span className="text-muted-foreground">Problem:</span>
                <span className="font-medium text-foreground">{problemType}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className={`w-4 h-4 ${isElectricity ? "text-electricity" : "text-water"}`} />
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium text-foreground">{townVillage}, {district}</span>
              </div>
            </div>
            <Button onClick={() => navigate(`/${utility}`)} className="w-full h-12 text-base font-semibold rounded-xl">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${isElectricity ? "from-electricity/5 via-electricity/2" : "from-water/5 via-water/2"} to-background`} />
      <div className="max-w-lg mx-auto pt-6 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/${utility}`)} className="rounded-xl hover:bg-muted/80">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isElectricity ? "gradient-electricity shadow-glow-electricity" : "gradient-water shadow-glow-water"}`}>
              {isElectricity ? <Zap className="w-4 h-4 text-electricity-foreground" /> : <Droplets className="w-4 h-4 text-water-foreground" />}
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold leading-tight">
                Report {isElectricity ? "Electricity" : "Water"} Problem
              </h1>
              <p className="text-xs text-muted-foreground">Help your community stay informed</p>
            </div>
          </div>
        </div>

        {/* Problem Type Selection */}
        <Card className="shadow-card-hover glass border-border/50 mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className={`w-4 h-4 ${isElectricity ? "text-electricity" : "text-water"}`} />
              What's the problem?
            </CardTitle>
            <CardDescription>Select the type of issue you're experiencing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {problems.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setProblemType(p.value)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all duration-200 text-left
                    ${problemType === p.value
                      ? isElectricity
                        ? "border-electricity bg-electricity/5 shadow-md"
                        : "border-water bg-water/5 shadow-md"
                      : "border-border/50 hover:border-border hover:bg-muted/30"
                    }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0
                    ${problemType === p.value
                      ? isElectricity ? "bg-electricity/10" : "bg-water/10"
                      : "bg-muted/50"
                    }`}>
                    {p.icon}
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${problemType === p.value ? "text-foreground" : "text-foreground/80"}`}>
                      {p.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  {problemType === p.value && (
                    <CheckCircle2 className={`w-5 h-5 ml-auto shrink-0 ${isElectricity ? "text-electricity" : "text-water"}`} />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="shadow-card-hover glass border-border/50 mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className={`w-4 h-4 ${isElectricity ? "text-electricity" : "text-water"}`} />
              Where is the problem?
            </CardTitle>
            <CardDescription>Select your district and town/village in Uganda</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">District</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                  <Input
                    placeholder="🇺🇬 Search & select district..."
                    value={showDistrictDropdown ? districtSearch : district || ""}
                    onChange={(e) => {
                      setDistrictSearch(e.target.value);
                      setShowDistrictDropdown(true);
                      if (district) {
                        setDistrict("");
                        setTownVillage("");
                        setTownSearch("");
                      }
                    }}
                    onFocus={() => setShowDistrictDropdown(true)}
                    className="pl-9 pr-9 rounded-xl h-11 bg-background/50"
                  />
                  {district && (
                    <button
                      type="button"
                      onClick={() => {
                        setDistrict("");
                        setDistrictSearch("");
                        setTownVillage("");
                        setTownSearch("");
                        setShowDistrictDropdown(true);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {!district && (
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  )}
                  {showDistrictDropdown && !district && (
                    <div className="absolute z-20 w-full mt-1 bg-popover border border-border rounded-xl shadow-lg max-h-52 overflow-y-auto">
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
                              setTownSearch("");
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors first:rounded-t-xl last:rounded-b-xl"
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

              <div className="space-y-2">
                <Label className="text-sm font-medium">Town / Village</Label>
                {district ? (
                  <>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder={`Search towns in ${district}...`}
                        value={townSearch}
                        onChange={(e) => setTownSearch(e.target.value)}
                        className="pl-9 rounded-xl h-10 bg-background/50 mb-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto rounded-xl border border-border/50 p-2 bg-background/30">
                      {filteredTowns.length > 0 ? (
                        filteredTowns.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTownVillage(t)}
                            className={`text-left px-3 py-2 rounded-lg text-sm transition-all duration-150
                              ${townVillage === t
                                ? isElectricity
                                  ? "bg-electricity/10 text-foreground font-semibold border border-electricity/30"
                                  : "bg-water/10 text-foreground font-semibold border border-water/30"
                                : "hover:bg-muted/50 text-foreground/70 border border-transparent"
                              }`}
                          >
                            {t}
                          </button>
                        ))
                      ) : (
                        <p className="col-span-2 text-center py-4 text-sm text-muted-foreground">
                          No towns found. Try a different search.
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center py-6 rounded-xl border border-dashed border-border/50 bg-muted/20">
                    <p className="text-sm text-muted-foreground">Select a district first to see towns</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Description <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Any additional details about the problem..."
                  rows={3}
                  className="rounded-xl bg-background/50 resize-none"
                />
              </div>

              <Button
                type="submit"
                className={`w-full h-12 text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isElectricity
                    ? "bg-gradient-to-r from-electricity to-amber-500 hover:from-amber-500 hover:to-electricity text-black"
                    : "bg-gradient-to-r from-water to-cyan-400 hover:from-cyan-400 hover:to-water text-white"
                }`}
                disabled={loading || !problemType || !district || !townVillage}
              >
                {loading ? "Submitting..." : "Submit Report"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
