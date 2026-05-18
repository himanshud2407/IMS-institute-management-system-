"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Home, Mail, Lock, User, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError(data.detail || "Unable to register. Please check your inputs.");
      }
    } catch (err) {
      setError("Unable to connect to the backend server. Please make sure Django is running on port 8000.");
    } finally {
      setLoading(false);
    }
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
              Account Created!
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Your account has been registered successfully. You can now log in using your email and password.
            </p>
          </div>
          <div className="pt-2">
            <Button asChild className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-md transition-all duration-300 hover:scale-[1.02]">
              <Link href="/">Sign In Now</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-zinc-950">
      <form
        onSubmit={handleSubmit}
        className="bg-card relative z-10 m-auto h-fit w-full max-w-sm rounded-xl border border-border bg-white shadow-xl dark:bg-zinc-900 transition-all duration-300"
      >
        <div className="p-8 pb-6">
          <div className="mb-8 flex flex-col items-center text-center">
            <Link
              href="/"
              aria-label="go home"
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
            >
              <Home className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Create an Account
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Join us today and start managing your institute efficiently
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex w-full items-center justify-center gap-2 transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 256 262"
              >
                <path
                  fill="#4285f4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34a853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#fbbc05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                ></path>
                <path
                  fill="#eb4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>
              <span>Google</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex w-full items-center justify-center gap-2 transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 256 256"
              >
                <path fill="#f1511b" d="M121.666 121.666H0V0h121.666z"></path>
                <path fill="#80cc28" d="M256 121.666H134.335V0H256z"></path>
                <path
                  fill="#00adef"
                  d="M121.663 256.002H0V134.336h121.663z"
                ></path>
                <path
                  fill="#fbbc09"
                  d="M256 256.002H134.335V134.336H256z"
                ></path>
              </svg>
              <span>Microsoft</span>
            </Button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground dark:bg-zinc-900">
                Or continue with
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-xs border border-red-500/20 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstname">First name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    required
                    name="firstname"
                    id="firstname"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="pl-9 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  type="text"
                  required
                  name="lastname"
                  id="lastname"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  required
                  name="email"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="pwd">Password</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  required
                  name="pwd"
                  id="pwd"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 text-base font-medium flex items-center justify-center gap-2" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </Button>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-b-xl border-t border-border p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
