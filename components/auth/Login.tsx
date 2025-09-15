"use client";

import React, { useId, useMemo, useState } from "react";
import { LogIn, CircleUserRound, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth, UserType } from "@/contexts/AuthContext";

interface LoginProps {
  onToggleMode: () => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Login({ onToggleMode }: LoginProps) {
  const [accountType, setAccountType] = useState<UserType>("business");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const { login } = useAuth();

  const emailId = useId();
  const passwordId = useId();

  const emailError = useMemo(() => {
    if (!touched.email) return "";
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Enter a valid email";
    return "";
  }, [email, touched.email]);

  const passwordError = useMemo(() => {
    if (!touched.password) return "";
    if (!password) return "Password is required";
    if (password.length < 6) return "Minimum 6 characters";
    return "";
  }, [password, touched.password]);

  const formValid = !emailError && !passwordError && email && password;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!formValid) {
      console.log("Please fix the highlighted fields");
      return;
    }

    try {
      setLoading(true);
      const success = await login(email, password, accountType);
      if (!success) {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    try {
      setGoogleLoading(true);
      await new Promise((r) => setTimeout(r, 700));
      console.log("Google sign-in successful");
    } catch (err) {
      console.error("Google sign-in failed:", err);
    } finally {
      setGoogleLoading(false);
    }
  }

  const density = "py-16";

  return (
    <section
      aria-label="Login"
      className="relative w-full min-h-screen flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-md">
        {/* Background: premium gradient field + mesh blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,theme(colors.primary)/20_0%,transparent_60%)] blur-2xl" />
          <div className="absolute -bottom-48 -left-20 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,#4e4466_0%,transparent_60%)] blur-2xl" />
          <div className="absolute inset-0 opacity-40">
            {/* Subtle geometric grid */}
            <svg
              aria-hidden="true"
              className="h-full w-full"
              viewBox="0 0 400 400"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                </pattern>
                <radialGradient id="fade" cx="50%" cy="50%" r="75%">
                  <stop offset="0%" stopColor="rgba(138,43,226,0.15)" />
                  <stop offset="100%" stopColor="rgba(26,21,39,0.0)" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <rect width="100%" height="100%" fill="url(#fade)" />
            </svg>
          </div>

          {/* Animated blobs */}
          <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl animate-pulse" />
          <div className="absolute right-8 top-1/3 h-24 w-24 rounded-full bg-[#4e4466]/40 blur-2xl animate-pulse" />
        </div>

        {/* Card (no logo/branding, clean center) */}
        <div className="w-full rounded-[calc(var(--radius)+0.25rem)] border border-white/10 bg-white/5 p-6 shadow-[0_10px_50px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8">
          {/* Account toggle */}
          <div className="mb-6 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur">
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                aria-pressed={accountType === "business"}
                onClick={() => setAccountType("business")}
                className={
                  accountType === "business"
                    ? "inline-flex items-center justify-center rounded-full bg-primary/90 px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                    : "inline-flex items-center justify-center rounded-full bg-transparent px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                }
              >
                <UserRound className="mr-2 h-4 w-4" aria-hidden="true" />
                Business Account
              </button>
              <button
                type="button"
                aria-pressed={accountType === "worker"}
                onClick={() => setAccountType("worker")}
                className={
                  accountType === "worker"
                    ? "inline-flex items-center justify-center rounded-full bg-primary/90 px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                    : "inline-flex items-center justify-center rounded-full bg-transparent px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                }
              >
                <CircleUserRound className="mr-2 h-4 w-4" aria-hidden="true" />
                Worker Account
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              {/* Email */}
              <div className="relative">
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? `${emailId}-error` : undefined}
                  className="peer w-full rounded-lg border border-white/10 bg-white/10 px-4 pb-2.5 pt-5 text-base text-foreground placeholder-transparent outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                  placeholder="Email"
                />
                <label
                  htmlFor={emailId}
                  className="pointer-events-none absolute left-4 top-2 bg-transparent px-1 text-xs text-muted-foreground transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs"
                >
                  Email
                </label>
                {emailError ? (
                  <p id={`${emailId}-error`} className="mt-1 text-sm text-destructive">
                    {emailError}
                  </p>
                ) : null}
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  id={passwordId}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? `${passwordId}-error` : undefined}
                  className="peer w-full rounded-lg border border-white/10 bg-white/10 px-4 pb-2.5 pt-5 text-base text-foreground placeholder-transparent outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                  placeholder="Password"
                />
                <label
                  htmlFor={passwordId}
                  className="pointer-events-none absolute left-4 top-2 bg-transparent px-1 text-xs text-muted-foreground transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-0 my-1 mr-1 inline-flex items-center rounded-md px-3 text-sm text-muted-foreground transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {passwordError ? (
                  <p id={`${passwordId}-error`} className="mt-1 text-sm text-destructive">
                    {passwordError}
                  </p>
                ) : null}
              </div>

              {/* Continue button */}
              <Button
                type="submit"
                disabled={loading}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-70"
              >
                <LogIn className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                {loading ? "Signing in..." : "Continue"}
              </Button>

              {/* Assistive text */}
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="underline decoration-primary/50 underline-offset-4 transition hover:text-foreground"
                >
                  Sign up
                </button>
              </p>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">OR</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Google button with Google logo */}
              <Button
                type="button"
                variant="secondary"
                disabled={googleLoading}
                onClick={handleGoogle}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-foreground transition hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-70"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 31.7 29.3 35 24 35 16.8 35 11 29.2 11 22s5.8-13 13-13c3.1 0 6 .9 8.4 2.9l5.7-5.7C34.9 3.5 29.7 1.5 24 1.5 11.9 1.5 2 11.4 2 23.5S11.9 45.5 24 45.5 46 35.6 46 23.5c0-1-.1-2-.4-3z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3.1 0 6 .9 8.4 2.9l5.7-5.7C34.9 6.5 29.7 4.5 24 4.5 15.9 4.5 8.8 9.2 6.3 14.7z"/>
                  <path fill="#4CAF50" d="M24 45.5c5.2 0 10-2 13.6-5.3l-6.3-5.2C29 36.7 26.6 37.5 24 37.5c-5.3 0-9.7-3.3-11.4-7.9l-6.6 5.1C8.6 41.8 15.7 45.5 24 45.5z"/>
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.2-4.7 7-11.3 7-5.3 0-9.7-3.3-11.4-7.9l-6.6 5.1C8.6 41.8 15.7 45.5 24 45.5 36.1 45.5 46 35.6 46 23.5c0-1-.1-2-.4-3z"/>
                </svg>
                {googleLoading ? "Connecting..." : "Continue with Google"}
              </Button>
            </div>
          </form>
        </div>

        {/* Subtle reflection beneath card */}
        <div className="mx-auto mt-8 h-10 w-full max-w-md">
          <div className="h-full w-full rounded-full bg-[radial-gradient(80%_50%_at_50%_0%,rgba(138,43,226,0.25),transparent_70%)] blur-2xl" />
        </div>
      </div>
    </section>
  );
}
