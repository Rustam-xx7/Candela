"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Successfully signed in as ${data.user.name}!`);
        router.push("/collections");
      } else {
        setErrorMessage(data.message || "Authentication failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error occurred. Please check connectivity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAF6F0] animate-fade-in">
      
      {/* Left Panel: Visual Arch (Visible on md and up) */}
      <div className="hidden md:flex md:w-1/2 bg-[#F3EDE4]/50 flex-col items-center justify-center p-12 border-r border-stone-200/40">
        <div className="w-full max-w-md flex flex-col items-center text-center space-y-8">
          
          {/* Arch Container */}
          <div className="relative w-full max-w-sm aspect-[3/4] overflow-hidden rounded-t-[14rem] border border-stone-200 shadow-md">
            <Image
              src="/images/login-candle.png"
              alt="Translucent glass candle resting on stone"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Typography */}
          <div className="space-y-3">
            <h2 className="font-serif text-3xl font-light tracking-wide text-stone-900 leading-tight">
              Finding peace in the pause.
            </h2>
            <p className="text-sm text-stone-500 max-w-xs leading-relaxed">
              Sustainably sourced, artisan crafted, and designed for your daily rituals.
            </p>
          </div>

        </div>
      </div>

      {/* Right Panel: Credentials Form */}
      <div className="flex-1 flex flex-col justify-between p-8 sm:p-16 md:p-24 relative">
        
        {/* Brand name at top (Mobile / Desktop top) */}
        <div className="flex justify-between items-center">
          <Link href="/" className="font-serif text-xl font-semibold tracking-widest text-[#2C1810]">
            Aura & Wick
          </Link>
          <Link href="/" className="text-xs text-stone-400 hover:text-espresso transition-colors">
            Back to Home
          </Link>
        </div>

        {/* Center: Sign-In Box */}
        <div className="w-full max-w-md mx-auto my-auto py-12 space-y-8">
          
          {/* Headline */}
          <div className="space-y-2 text-center sm:text-left">
            <h1 className="font-serif text-3xl font-light tracking-wide text-stone-900">
              Welcome back
            </h1>
            <p className="text-sm text-stone-500">
              Enter your details to access your sanctuary.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-sm border border-red-200">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            
            {/* Email field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] tracking-widest font-semibold uppercase text-stone-400 block">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white border border-stone-200 px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-hidden focus:border-espresso focus:ring-1 focus:ring-espresso rounded-xs transition-colors"
              />
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-[10px] tracking-widest font-semibold uppercase text-stone-400 block">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white border border-stone-200 px-4 py-3 pr-10 text-sm text-stone-800 placeholder-stone-300 focus:outline-hidden focus:border-espresso focus:ring-1 focus:ring-espresso rounded-xs transition-colors"
                />
                
                {/* Show/Hide eye */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 focus:outline-hidden"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-stone-600 hover:text-stone-900 transition-colors">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded-sm border-stone-300 text-espresso focus:ring-espresso h-3.5 w-3.5"
                />
                Remember me
              </label>
              <Link href="#" className="text-stone-400 hover:text-espresso transition-colors hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-espresso text-white text-xs font-semibold tracking-widest hover:bg-opacity-95 transition-luxury uppercase rounded-xs flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-stone-400 border-t-white" />
                  Verifying...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-stone-200"></div>
            <span className="flex-shrink mx-4 text-[10px] uppercase font-bold tracking-widest text-stone-300">OR</span>
            <div className="flex-grow border-t border-stone-200"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => alert("Google sign in simulation active.")}
              className="py-2.5 border border-stone-200 text-stone-600 hover:text-stone-950 hover:bg-stone-50 text-xs font-semibold tracking-wider uppercase transition-luxury rounded-xs flex items-center justify-center gap-2"
            >
              Google
            </button>
            <button
              onClick={() => alert("Apple sign in simulation active.")}
              className="py-2.5 border border-stone-200 text-stone-600 hover:text-stone-950 hover:bg-stone-50 text-xs font-semibold tracking-wider uppercase transition-luxury rounded-xs flex items-center justify-center gap-2"
            >
              Apple
            </button>
          </div>

          {/* Signup Option */}
          <div className="text-center text-xs text-stone-500 pt-2">
            New to Aura & Wick?{" "}
            <Link href="#" onClick={() => alert("Account registration is disabled in this mockup.")} className="text-espresso font-semibold hover:underline underline-offset-4">
              Create an account
            </Link>
          </div>

        </div>

        {/* Bottom copyright (Right footer align) */}
        <div className="border-t border-stone-200/50 pt-6 flex justify-between items-center text-[10px] tracking-wider text-stone-400 uppercase">
          <span>&copy; 2026 Aura & Wick</span>
          <span>Handcrafted for Serenity</span>
        </div>

      </div>

    </div>
  );
}
