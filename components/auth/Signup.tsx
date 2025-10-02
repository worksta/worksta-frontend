"use client";

import React, { useId, useMemo, useState } from "react";
import { UserPlus, CircleUserRound, UserRound, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth, UserType } from "@/contexts/AuthContext";

interface SignupProps {
  onSwitchToLogin: () => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Signup({ onSwitchToLogin }: SignupProps) {
  const { signup } = useAuth();
  const [accountType, setAccountType] = useState<UserType>("business");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const nameError = useMemo(() => {
    if (!touched.name) return "";
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  }, [name, touched.name]);

  const emailError = useMemo(() => {
    if (!touched.email) return "";
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return "";
  }, [email, touched.email]);

  const passwordError = useMemo(() => {
    if (!touched.password) return "";
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return "Password must contain uppercase, lowercase, and number";
    }
    return "";
  }, [password, touched.password]);

  const confirmPasswordError = useMemo(() => {
    if (!touched.confirmPassword) return "";
    if (!confirmPassword) return "Confirm password is required";
    if (password !== confirmPassword) return "Passwords do not match";
    return "";
  }, [password, confirmPassword, touched.confirmPassword]);

  const formValid = !nameError && !emailError && !passwordError && !confirmPasswordError && name && email && password && confirmPassword;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    if (!formValid) {
      console.log("Please fix the highlighted fields");
      return;
    }

    try {
      setLoading(true);
      const success = await signup(name, email, password, accountType);
      if (!success) {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    try {
      setGoogleLoading(true);
      await new Promise((r) => setTimeout(r, 700));
      console.log("Google sign-up successful");
    } catch (err) {
      console.error("Google sign-up failed:", err);
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <section
      aria-label="Register"
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
                  id="grid-signup"
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
                <radialGradient id="fade-signup" cx="50%" cy="50%" r="75%">
                  <stop offset="0%" stopColor="rgba(138,43,226,0.15)" />
                  <stop offset="100%" stopColor="rgba(26,21,39,0.0)" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-signup)" />
              <rect width="100%" height="100%" fill="url(#fade-signup)" />
            </svg>
          </div>

          {/* Animated blobs */}
          <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl animate-pulse" />
          <div className="absolute right-8 top-1/3 h-24 w-24 rounded-full bg-[#4e4466]/40 blur-2xl animate-pulse" />
        </div>

        {/* Card */}
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
              {/* Name */}
              <div className="relative">
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocused((f) => ({ ...f, name: true }))}
                  onBlur={() => {
                    setFocused((f) => ({ ...f, name: false }));
                    setTouched((t) => ({ ...t, name: true }));
                  }}
                  aria-invalid={!!nameError}
                  aria-describedby={nameError ? `${nameId}-error` : undefined}
                  className="peer w-full rounded-lg border border-white/10 bg-white/10 px-4 pb-2.5 pt-5 text-base text-foreground placeholder-transparent outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                  placeholder=""
                />
                <label
                  htmlFor={nameId}
                  className={`pointer-events-none absolute left-4 z-10 text-muted-foreground transition-all duration-200 ${
                    name || focused.name
                      ? 'top-2 text-xs bg-white/10 px-1 rounded'
                      : 'top-1/2 -translate-y-1/2 text-base bg-transparent px-0'
                  }`}
                >
                  Full Name
                </label>
                {nameError ? (
                  <p id={`${nameId}-error`} className="mt-1 text-sm text-destructive">
                    {nameError}
                  </p>
                ) : null}
              </div>

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
                  onFocus={() => setFocused((f) => ({ ...f, email: true }))}
                  onBlur={() => {
                    setFocused((f) => ({ ...f, email: false }));
                    setTouched((t) => ({ ...t, email: true }));
                  }}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? `${emailId}-error` : undefined}
                  className="peer w-full rounded-lg border border-white/10 bg-white/10 px-4 pb-2.5 pt-5 text-base text-foreground placeholder-transparent outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                  placeholder=""
                />
                <label
                  htmlFor={emailId}
                  className={`pointer-events-none absolute left-4 z-10 text-muted-foreground transition-all duration-200 ${
                    email || focused.email
                      ? 'top-2 text-xs bg-white/10 px-1 rounded'
                      : 'top-1/2 -translate-y-1/2 text-base bg-transparent px-0'
                  }`}
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
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused((f) => ({ ...f, password: true }))}
                  onBlur={() => {
                    setFocused((f) => ({ ...f, password: false }));
                    setTouched((t) => ({ ...t, password: true }));
                  }}
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? `${passwordId}-error` : undefined}
                  className="peer w-full rounded-lg border border-white/10 bg-white/10 px-4 pb-2.5 pt-5 pr-16 text-base text-foreground placeholder-transparent outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                  placeholder=""
                />
                <label
                  htmlFor={passwordId}
                  className={`pointer-events-none absolute left-4 z-10 text-muted-foreground transition-all duration-200 ${
                    password || focused.password
                      ? 'top-2 text-xs bg-white/10 px-1 rounded'
                      : 'top-1/2 -translate-y-1/2 text-base bg-transparent px-0'
                  }`}
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 inline-flex items-center rounded-md px-2 py-1 text-sm text-muted-foreground transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                {passwordError ? (
                  <p id={`${passwordId}-error`} className="mt-1 text-sm text-destructive">
                    {passwordError}
                  </p>
                ) : null}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  id={confirmPasswordId}
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocused((f) => ({ ...f, confirmPassword: true }))}
                  onBlur={() => {
                    setFocused((f) => ({ ...f, confirmPassword: false }));
                    setTouched((t) => ({ ...t, confirmPassword: true }));
                  }}
                  aria-invalid={!!confirmPasswordError}
                  aria-describedby={confirmPasswordError ? `${confirmPasswordId}-error` : undefined}
                  className="peer w-full rounded-lg border border-white/10 bg-white/10 px-4 pb-2.5 pt-5 pr-16 text-base text-foreground placeholder-transparent outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                  placeholder=""
                />
                <label
                  htmlFor={confirmPasswordId}
                  className={`pointer-events-none absolute left-4 z-10 text-muted-foreground transition-all duration-200 ${
                    confirmPassword || focused.confirmPassword
                      ? 'top-2 text-xs bg-white/10 px-1 rounded'
                      : 'top-1/2 -translate-y-1/2 text-base bg-transparent px-0'
                  }`}
                >
                  Confirm Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 inline-flex items-center rounded-md px-2 py-1 text-sm text-muted-foreground transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                {confirmPasswordError ? (
                  <p id={`${confirmPasswordId}-error`} className="mt-1 text-sm text-destructive">
                    {confirmPasswordError}
                  </p>
                ) : null}
              </div>

              {/* Create Account button */}
              <Button
                type="submit"
                disabled={!formValid || loading}
                className="w-full rounded-lg bg-primary px-4 py-3 text-base font-medium text-primary-foreground shadow transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <UserPlus className="h-4 w-4" aria-hidden="true" />
                    Create Account
                  </div>
                )}
              </Button>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-white/10" />
              <span className="mx-4 text-sm text-muted-foreground">or</span>
              <div className="flex-1 border-t border-white/10" />
            </div>

            {/* Google button */}
            <Button
               type="button"
               variant="secondary"
               onClick={handleGoogle}
               disabled={googleLoading}
               className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base font-medium text-foreground shadow transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50"
             >
              {googleLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Signing up...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </div>
              )}
            </Button>

            {/* Switch to login */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="font-medium text-primary underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
