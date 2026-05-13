import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      if (email.includes("anna")) {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Branding */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <img
            src="/81EA8C97-52C0-4868-B1B4-22CBF0244BFF.png"
            alt="Young Visionaries Logo"
            className="h-24 w-auto object-contain"
          />
          <div className="text-center">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight text-primary">
              Young Visionaries
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Future Readiness Platform
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Sign In
              </Button>
            </form>

            {/* Demo Info */}
            <div className="mt-6 pt-4 border-t space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Demo Credentials:</p>
              <p className="text-xs text-muted-foreground">
                <strong>Admin:</strong> anna@example.com / password
              </p>
              <p className="text-xs text-muted-foreground">
                <strong>Student:</strong> olivier@example.com / password
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2026 Young Visionaries. All rights reserved.
        </p>
      </div>
    </div>
  );
}