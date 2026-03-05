import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Smartphone } from "lucide-react";
import { toast } from "sonner";

export default function PaymentPage() {
  const { utility } = useParams<{ utility: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [provider, setProvider] = useState<"mtn" | "airtel">("mtn");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isElectricity = utility === "electricity";
  const colorClass = isElectricity ? "electricity" : "water";

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const { error } = await supabase.from("payments").insert({
      user_id: user.id,
      utility: utility!,
      meter_account_number: meterNumber,
      amount: parseFloat(amount),
      phone_number: phone,
      provider,
      status: "completed",
    });

    if (error) {
      toast.error("Payment failed: " + error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card className="max-w-md w-full shadow-card animate-slide-up">
          <CardContent className="pt-8 pb-8 text-center space-y-4">
            <div className={`w-16 h-16 mx-auto rounded-full bg-${colorClass}-light flex items-center justify-center`}>
              <Smartphone className={`w-8 h-8 text-${colorClass}`} />
            </div>
            <h2 className="text-xl font-heading font-bold">Payment Request Sent!</h2>
            <p className="text-muted-foreground">
              A mobile money request has been sent to <strong>{phone}</strong> via{" "}
              <strong>{provider === "mtn" ? "MTN Mobile Money" : "Airtel Money"}</strong>.
            </p>
            <p className="text-sm text-muted-foreground">
              Amount: <strong>UGX {parseFloat(amount).toLocaleString()}</strong>
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
            <CreditCard className={`w-5 h-5 text-${colorClass}`} />
            <h1 className="text-xl font-heading font-bold">
              Pay {isElectricity ? "Electricity" : "Water"} Bill
            </h1>
          </div>
        </div>

        <Card className="shadow-card">
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
                    className={`p-4 rounded-xl border-2 text-center font-semibold transition-all ${
                      provider === "mtn"
                        ? "border-electricity bg-electricity-light text-electricity-foreground"
                        : "border-border bg-card text-card-foreground"
                    }`}
                  >
                    📱 MTN Mobile Money
                  </button>
                  <button
                    type="button"
                    onClick={() => setProvider("airtel")}
                    className={`p-4 rounded-xl border-2 text-center font-semibold transition-all ${
                      provider === "airtel"
                        ? "border-destructive bg-destructive/10 text-foreground"
                        : "border-border bg-card text-card-foreground"
                    }`}
                  >
                    📱 Airtel Money
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : `Pay UGX ${amount ? parseFloat(amount).toLocaleString() : "0"}`}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
