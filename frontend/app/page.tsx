"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Home, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Script from "next/script";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleGoogleLogin = async (response: any) => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/google/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: response.credential,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        setIsSuccess(true);
      } else {
        setError(data.detail || "Google authentication failed. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to the backend server. Please make sure Django is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || isSuccess) return;

    const initializeGoogle = () => {
      if ((window as any).google) {
        (window as any).google.accounts.id.initialize({
          client_id:
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "882963231545-vgej5h2qjsv9i6j4ist4rhf26ls4ihec.apps.googleusercontent.com",
          callback: handleGoogleLogin,
        });
        const googleBtn = document.getElementById("google-signin-btn");
        if (googleBtn) {
          (window as any).google.accounts.id.renderButton(googleBtn, {
            theme: "outline",
            size: "large",
            width: "350",
            shape: "pill",
          });
        }
      }
    };

    if ((window as any).google) {
      initializeGoogle();
    } else {
      const interval = setInterval(() => {
        if ((window as any).google) {
          initializeGoogle();
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, 
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store JWT tokens securely
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        
        setIsSuccess(true);
      } else {
        setError(data.detail || "Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to the backend server. Please make sure Django is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsSuccess(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  if (isSuccess) {
    return (
      <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-zinc-950/20 backdrop-blur-sm transition-all duration-500 ease-out">
        <div className="bg-card/80 m-auto w-full max-w-sm rounded-xl border border-zinc-200 p-8 shadow-xl text-center space-y-6 dark:border-zinc-800 dark:bg-zinc-900/90 backdrop-blur-md animate-in fade-in zoom-in duration-500">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 bg-emerald-100 rounded-full dark:bg-emerald-950/50 animate-ping opacity-75"></div>
            <div className="relative w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Login Success!
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Welcome back! You have successfully authenticated with the IMS server.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-3">
            <Button asChild className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-md transition-all duration-300 hover:scale-[1.02]">
              <Link href="/">Go to Dashboard</Link>
            </Button>
            <Button onClick={handleLogout} variant="outline" className="w-full border-zinc-200 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800 transition-all duration-300">
              Logout
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)] transition-all duration-300"
      >
        <div className="p-8 pb-6">
          <div>
            <Link
              href="/"
              aria-label="go home"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Home className="h-4 w-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <h1 className="text-title mb-1 mt-4 text-xl font-semibold">
              Login to Account
            </h1>
            <p className="text-sm text-muted-foreground mb-2 mt-2">
              Welcome! Login to your account{" "}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-xs border border-red-500/20 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email Address
              </Label>
              <Input
                type="email"
                required
                name="email"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pwd" className="text-title text-sm">
                Password
              </Label>
              <Input
                type="password"
                required
                name="pwd"
                id="pwd"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input sz-md variant-mixed transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Continue</span>
              )}
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground dark:bg-zinc-900">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <div id="google-signin-btn" className="w-full flex justify-center min-h-[40px]"></div>
          </div>

          <Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload" />
        </div>

        <div className="bg-muted/50 rounded-b-[calc(var(--radius)+.125rem)] border-t p-4">
          <p className="text-muted-foreground text-center text-sm">
            Don't have an account?{" "}
            <Button asChild variant="link" className="h-auto p-0 text-primary">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
