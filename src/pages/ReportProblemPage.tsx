import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const ELECTRICITY_PROBLEMS = ["Outage", "Low voltage", "Fluctuation"];
const WATER_PROBLEMS = ["Shortage", "Pipe leak", "Low pressure"];

const DISTRICTS = [
  "Kampala", "Wakiso", "Mbarara", "Bushenyi", "Jinja", "Mbale", "Gulu", 
  "Lira", "Soroti", "Fort Portal", "Masaka", "Mukono", "Entebbe"
];

export default function ReportProblemPage() {
  const { utility } = useParams<{ utility: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [problemType, setProblemType] = useState("");
  const [district, setDistrict] = useState("");
  const [townVillage, setTownVillage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isElectricity = utility === "electricity";
  const problems = isElectricity ? ELECTRICITY_PROBLEMS : WATER_PROBLEMS;

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
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card className="max-w-md w-full shadow-card animate-slide-up">
          <CardContent className="pt-8 pb-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-status-normal/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-status-normal" />
            </div>
            <h2 className="text-xl font-heading font-bold">Report Submitted!</h2>
            <p className="text-muted-foreground">
              Your report has been submitted. We are asking other users in{" "}
              <strong>{townVillage}</strong> to confirm this issue.
            </p>
            <Button onClick={() => navigate(`/${utility}`)} className="w-full mt-4">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-6">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/${utility}`)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-5 h-5 text-${isElectricity ? "electricity" : "water"}`} />
            <h1 className="text-xl font-heading font-bold">
              Report {isElectricity ? "Electricity" : "Water"} Problem
            </h1>
          </div>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Problem Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Problem Type</Label>
                <Select value={problemType} onValueChange={setProblemType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select problem type" />
                  </SelectTrigger>
                  <SelectContent>
                    {problems.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>District</Label>
                <Select value={district} onValueChange={setDistrict} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISTRICTS.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Town / Village</Label>
                <Input
                  value={townVillage}
                  onChange={(e) => setTownVillage(e.target.value)}
                  placeholder="Enter town or village name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description (optional)</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Any additional details..."
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading || !problemType || !district || !townVillage}>
                {loading ? "Submitting..." : "Submit Report"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
