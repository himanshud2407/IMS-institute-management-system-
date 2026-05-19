"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, CheckCircle2, AlertCircle, Loader2, Shield, GraduationCap, BookOpen } from "lucide-react";
import Script from "next/script";

const DEMO_ACCOUNTS = [
  {
    role: "admin",
    label: "Login as Admin",
    email: "admin@ims.com",
    password: "admin123",
    icon: Shield,
    gradient: "from-violet-500 to-purple-600",
    hoverGradient: "hover:from-violet-600 hover:to-purple-700",
    shadow: "shadow-violet-500/25",
    description: "Full system access",
  },
  {
    role: "teacher",
    label: "Login as Teacher",
    email: "teacher@ims.com",
    password: "teacher123",
    icon: BookOpen,
    gradient: "from-amber-500 to-orange-600",
    hoverGradient: "hover:from-amber-600 hover:to-orange-700",
    shadow: "shadow-amber-500/25",
    description: "Manage classes & attendance",
  },
  {
    role: "student",
    label: "Login as Student",
    email: "student@ims.com",
    password: "student123",
    icon: GraduationCap,
    gradient: "from-cyan-500 to-blue-600",
    hoverGradient: "hover:from-cyan-600 hover:to-blue-700",
    shadow: "shadow-cyan-500/25",
    description: "View profile & results",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loggedInRole, setLoggedInRole] = useState("");

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
        localStorage.setItem("role", data.role || "student");
        localStorage.setItem("username", data.username || data.email);
        document.cookie = `role=${data.role || "student"}; path=/`;
        setLoggedInRole(data.role || "student");
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

  useEffect(() => {
    if (isSuccess && loggedInRole === "admin") {
      const timer = setTimeout(() => {
        router.push("/admin");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, loggedInRole, router]);

  const handleLogin = async (loginEmail: string, loginPassword: string, isDemoLogin = false) => {
    setError("");
    if (isDemoLogin) {
      setDemoLoading(loginEmail);
    } else {
      setLoading(true);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store JWT tokens + role info
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", data.username);
        document.cookie = `role=${data.role}; path=/`;
        setLoggedInRole(data.role);
        setIsSuccess(true);
      } else {
        setError(data.detail || "Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to the backend server. Please make sure Django is running on port 8000.");
    } finally {
      setLoading(false);
      setDemoLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(email, password, false);
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    await handleLogin(demoEmail, demoPassword, true);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsSuccess(false);
    setLoggedInRole("");
    setEmail("");
    setPassword("");
    setError("");
  };

  if (isSuccess) {
    const roleColors: Record<string, string> = {
      admin: "from-violet-500 to-purple-600",
      teacher: "from-amber-500 to-orange-600",
      student: "from-cyan-500 to-blue-600",
    };
    const roleShadow: Record<string, string> = {
      admin: "shadow-violet-500/30",
      teacher: "shadow-amber-500/30",
      student: "shadow-cyan-500/30",
    };

    return (
      <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-zinc-950/20 backdrop-blur-sm transition-all duration-500 ease-out">
        <div className="bg-card/80 m-auto w-full max-w-sm rounded-xl border border-zinc-200 p-8 shadow-xl text-center space-y-6 dark:border-zinc-800 dark:bg-zinc-900/90 backdrop-blur-md animate-in fade-in zoom-in duration-500">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 bg-emerald-100 rounded-full dark:bg-emerald-950/50 animate-ping opacity-75"></div>
            <div className={`relative w-16 h-16 bg-gradient-to-br ${roleColors[loggedInRole] || "from-emerald-500 to-teal-600"} text-white rounded-full flex items-center justify-center shadow-lg ${roleShadow[loggedInRole] || "shadow-emerald-500/30"}`}>
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Login Success!
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Logged in as <span className="font-semibold capitalize text-zinc-700 dark:text-zinc-300">{loggedInRole}</span>.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-3">
            <Button onClick={handleLogout} variant="outline" className="w-full border-zinc-200 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800 transition-all duration-300">
              Logout
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-8 md:py-16 dark:bg-transparent">
      <div className="m-auto w-full max-w-sm space-y-6">
        {/* Quick Login Section */}
        <div className="space-y-3">
          <div className="text-center space-y-1">
            <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider dark:text-zinc-400">
              Quick Demo Login
            </h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Click any role below to instantly log in
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {DEMO_ACCOUNTS.map((demo) => {
              const Icon = demo.icon;
              const isLoading = demoLoading === demo.email;
              return (
                <button
                  key={demo.role}
                  type="button"
                  disabled={!!demoLoading || loading}
                  onClick={() => handleDemoLogin(demo.email, demo.password)}
                  className={`group relative flex flex-col items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg ${demo.shadow} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${demo.gradient} flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110`}>
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 capitalize">
                      {demo.role}
                    </p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight mt-0.5">
                      {demo.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-50 dark:bg-zinc-950 px-3 text-zinc-400">
              Or sign in manually
            </span>
          </div>
        </div>

        {/* Manual Login Form */}
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

              <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={loading || !!demoLoading}>
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
      </div>
    </section>
  );
}
