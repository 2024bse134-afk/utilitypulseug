import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Smartphone, CheckCircle2, Zap, Droplets, Package } from "lucide-react";
import { toast } from "sonner";

const RATE_PER_UGX = { electricity: 0.01, water: 0.005 }; // units per UGX

export default function PaymentPage() {
  const { utility } = useParams<{ utility: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [provider, setProvider] = useState<"mtn" | "airtel">("mtn");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ purchased: number; remaining: number } | null>(null);

  const isElectricity = utility === "electricity";
  const rate = RATE_PER_UGX[utility as keyof typeof RATE_PER_UGX] || 0.01;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const parsedAmount = parseFloat(amount);
    const unitsPurchased = parsedAmount * rate;

    // Insert payment
    const { error: payError } = await supabase.from("payments").insert({
      user_id: user.id,
      utility: utility!,
      meter_account_number: meterNumber,
      amount: parsedAmount,
      phone_number: phone,
      provider,
      status: "completed",
    });

    if (payError) {
      toast.error("Payment failed: " + payError.message);
      setLoading(false);
      return;
    }

    // Update units
    const { data: currentUnits } = await supabase
      .from("utility_units")
      .select("units")
      .eq("user_id", user.id)
      .eq("utility", utility!)
      .single();

    const currentBalance = currentUnits?.units ?? 0;
    const newBalance = currentBalance + unitsPurchased;

    await supabase
      .from("utility_units")
      .update({ units: newBalance, updated_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .eq("utility", utility!);

    setResult({ purchased: unitsPurchased, remaining: newBalance });
    setLoading(false);
  };

  if (result) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${isElectricity ? "from-electricity/5 to-background" : "from-water/5 to-background"}`} />
        <Card className="max-w-md w-full shadow-card-hover glass animate-slide-up relative z-10">
          <CardContent className="pt-8 pb-8 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-status-normal/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-status-normal" />
            </div>
            <h2 className="text-xl font-heading font-bold">Payment Successful!</h2>
            <p className="text-muted-foreground">
              Mobile money request sent to <strong>{phone}</strong> via{" "}
              <strong>{provider === "mtn" ? "MTN Mobile Money" : "Airtel Money"}</strong>.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-muted/50">
                <Package className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Units Purchased</p>
                <p className="text-lg font-heading font-bold text-foreground">{result.purchased.toFixed(1)}</p>
              </div>
              <div className={`p-4 rounded-xl ${isElectricity ? "bg-electricity-light" : "bg-water-light"}`}>
                {isElectricity ? <Zap className="w-5 h-5 mx-auto mb-1 text-electricity" /> : <Droplets className="w-5 h-5 mx-auto mb-1 text-water" />}
                <p className="text-xs text-muted-foreground">Total Remaining</p>
                <p className="text-lg font-heading font-bold text-foreground">{result.remaining.toFixed(1)}</p>
              </div>
            </div>
            <Button onClick={() => navigate(`/${utility}`)} className="w-full mt-4">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${isElectricity ? "from-electricity/5 to-background" : "from-water/5 to-background"}`} />
      <div className="max-w-md mx-auto pt-6 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/${utility}`)} className="rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <CreditCard className={`w-5 h-5 ${isElectricity ? "text-electricity" : "text-water"}`} />
            <h1 className="text-xl font-heading font-bold">
              Pay {isElectricity ? "Electricity" : "Water"} Bill
            </h1>
          </div>
        </div>

        <Card className="shadow-card-hover glass border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePay} className="space-y-4">
              <div className="space-y-2">
                <Label>Meter / Account Number</Label>
                <Input
                  value={meterNumber}
                  onChange={(e) => setMeterNumber(e.target.value)}
                  placeholder="Enter meter or account number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Amount (UGX)</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 50000"
                  required
                  min="100"
                />
                {amount && (
                  <p className="text-xs text-muted-foreground">
                    ≈ {(parseFloat(amount || "0") * rate).toFixed(1)} units
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0771234567"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Payment Provider</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setProvider("mtn")}
                    className={`p-4 rounded-xl border-2 text-center font-semibold transition-all duration-200 ${
                      provider === "mtn"
                        ? "border-electricity bg-electricity-light text-electricity-foreground shadow-glow-electricity"
                        : "border-border bg-card text-card-foreground hover:border-electricity/50"
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mx-auto mb-1" />
                    MTN Mobile Money
                  </button>
                  <button
                    type="button"
                    onClick={() => setProvider("airtel")}
                    className={`p-4 rounded-xl border-2 text-center font-semibold transition-all duration-200 ${
                      provider === "airtel"
                        ? "border-destructive bg-destructive/10 text-foreground"
                        : "border-border bg-card text-card-foreground hover:border-destructive/50"
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mx-auto mb-1" />
                    Airtel Money
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={loading}>
                {loading ? "Processing..." : `Pay UGX ${amount ? parseFloat(amount).toLocaleString() : "0"}`}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
