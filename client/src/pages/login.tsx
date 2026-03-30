import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { Zap, LogIn, AlertCircle } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, pin);
    if (!result.success) {
      setError(result.error || "Login failed");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold">TotalFlow AI</div>
              <div className="text-xs text-muted-foreground">Sales Hub — Rep Login</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">PIN</label>
              <Input
                type="password"
                placeholder="Enter your PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
                maxLength={6}
                data-testid="input-pin"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs text-red-500 bg-red-500/10 p-2 rounded-lg" data-testid="text-error">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white gap-2"
              disabled={loading}
              data-testid="button-login"
            >
              <LogIn className="w-4 h-4" />
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="text-center text-[10px] text-muted-foreground">
            Contact your admin for login credentials
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
