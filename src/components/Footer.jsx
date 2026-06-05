"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Thank you for joining our circle: ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#FAF6F0] border-t border-stone-200/80 pt-16 pb-8 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-semibold tracking-widest text-[#2C1810]">
              Aura & Wick
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed max-w-sm">
              Handcrafted for serenity. Our candles are poured in small batches using the finest sustainable wax and pure essential oils, meticulously crafted to transform your space into a sanctuary of calm.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-stone-400 hover:text-espresso transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.74.054 9.21.42 9.22 8.98 0 9.42-.96.044-1.314.054-3.74.054s-2.784-.01-3.74-.054c-9.207-.42-9.214-8.98 0-9.42.96-.044 1.313-.054 3.74-.054zm0-2C9.822 0 9.51.01 8.536.055 3.01.307.307 3.01.055 8.536.01 9.51 0 9.822 0 12.315s.01 2.784.055 3.74c.252 5.526 2.955 8.229 8.536 8.536.974.045 1.286.055 3.779.055s2.784-.01 3.74-.055c5.527-.253 8.23-2.956 8.536-8.536.046-.96.055-1.286.055-3.78s-.01-2.784-.055-3.74c-.252-5.527-2.956-8.23-8.536-8.536C15.099.01 14.808 0 12.315 0zm0 5.993c-3.49 0-6.322 2.83-6.322 6.322s2.83 6.322 6.322 6.322 6.322-2.83 6.322-6.322-2.83-6.322-6.322-6.322zm0 10.652c-2.39 0-4.33-1.94-4.33-4.33s1.94-4.33 4.33-4.33 4.33 1.94 4.33 4.33-1.94 4.33-4.33 4.33zm6.402-11.71c0 .86-.697 1.558-1.557 1.558-.86 0-1.558-.697-1.558-1.558 0-.86.698-1.557 1.558-1.557.86 0 1.557.697 1.557 1.557z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#"
                className="text-stone-400 hover:text-espresso transition-colors duration-300"
                aria-label="Pinterest"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.4 7.63 11.1-.1-.94-.2-2.38.04-3.41.22-.93 1.4-5.97 1.4-5.97s-.36-.72-.36-1.78c0-1.66.96-2.9 2.17-2.9 1.02 0 1.52.77 1.52 1.69 0 1.03-.65 2.56-.99 3.99-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.47 0-2.86-2.06-4.86-5-4.86-3.4 0-5.4 2.56-5.4 5.2 0 1.03.4 2.14.9 2.74.1.12.1.23.07.35l-.34 1.4c-.06.23-.2.3-.43.19-1.54-.72-2.5-3-2.5-4.82 0-3.92 2.85-7.53 8.23-7.53 4.32 0 7.68 3.08 7.68 7.2 0 4.3-2.7 7.75-6.46 7.75-1.26 0-2.45-.66-2.85-1.43l-.78 2.97c-.28 1.08-1.04 2.42-1.55 3.25C10.23 23.8 11.1 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#"
                className="text-stone-400 hover:text-espresso transition-colors duration-300"
                aria-label="Email"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2C1810] mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/collections" className="text-sm text-stone-500 hover:text-espresso transition-colors duration-300">
                  All Candles
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm text-stone-500 hover:text-espresso transition-colors duration-300">
                  Gift Sets
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm text-stone-500 hover:text-espresso transition-colors duration-300">
                  Ritual Tools
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm text-stone-500 hover:text-espresso transition-colors duration-300">
                  Subscription Box
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: About Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2C1810] mb-5">
              About
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#our-story" className="text-sm text-stone-500 hover:text-espresso transition-colors duration-300">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/#sustainability" className="text-sm text-stone-500 hover:text-espresso transition-colors duration-300">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/#wholesale" className="text-sm text-stone-500 hover:text-espresso transition-colors duration-300">
                  Wholesale
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm text-stone-500 hover:text-espresso transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2C1810] mb-5">
              Join our Circle
            </h4>
            <p className="text-sm text-stone-500 leading-relaxed mb-5">
              Subscribe for early access to collection drops, scent ritual guides, and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center border-b border-stone-300 pb-2">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden pr-3 py-1"
              />
              <button
                type="submit"
                className="text-stone-400 hover:text-espresso transition-colors duration-300 focus:outline-hidden"
                aria-label="Subscribe"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-stone-200/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400">
          <p className="mb-4 sm:mb-0">
            &copy; 2026 Aura & Wick. Handcrafted for serenity.
          </p>
          <div className="flex space-x-6">
            <Link href="/#shipping-returns" className="hover:text-espresso transition-colors duration-300">
              Shipping & Returns
            </Link>
            <Link href="/#privacy-policy" className="hover:text-espresso transition-colors duration-300">
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
