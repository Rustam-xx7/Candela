"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { toggleCart, cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/60 bg-[#FAF6F0]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Left: Mobile Menu Toggle / Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-md p-1.5 text-stone-600 hover:bg-stone-100 hover:text-stone-900 md:hidden focus:outline-hidden"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Brand Logo */}
            <Link href="/" className="group flex flex-col justify-center">
              <span className="font-serif text-2xl font-semibold tracking-widest text-[#2C1810] group-hover:text-espresso transition-colors duration-300">
                Aura & Wick
              </span>
              <span className="text-[9px] tracking-[0.25em] text-stone-400 uppercase font-medium mt-0.5">
                Handcrafted Serenity
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              href="/collections"
              className="text-sm font-medium tracking-widest text-stone-600 hover:text-espresso transition-colors duration-300 uppercase"
            >
              Collections
            </Link>
            <Link
              href="/#our-story"
              className="text-sm font-medium tracking-widest text-stone-600 hover:text-espresso transition-colors duration-300 uppercase"
            >
              Our Story
            </Link>
            <Link
              href="/#scent-rituals"
              className="text-sm font-medium tracking-widest text-stone-600 hover:text-espresso transition-colors duration-300 uppercase"
            >
              Scent Rituals
            </Link>
            <Link
              href="/#gifting"
              className="text-sm font-medium tracking-widest text-stone-600 hover:text-espresso transition-colors duration-300 uppercase"
            >
              Gifting
            </Link>
          </nav>

          {/* Right: Search, Profile, Cart */}
          <div className="flex items-center space-x-2 sm:space-x-5">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="rounded-full p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors duration-300 focus:outline-hidden"
              aria-label="Search Catalog"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Profile Account */}
            <Link
              href="/login"
              className="rounded-full p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors duration-300"
              aria-label="Profile Account"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Shopping Cart Bag */}
            <button
              onClick={toggleCart}
              className="relative rounded-full p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors duration-300 focus:outline-hidden"
              aria-label="Open Cart"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-espresso text-[9px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Search Overlay */}
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-full bg-[#FAF6F0] border-b border-stone-200 py-4 px-4 sm:px-6 shadow-md animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="mx-auto max-w-3xl flex items-center gap-3">
            <input
              type="text"
              placeholder="Search scents, collections, rituals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-200 px-4 py-2 text-sm text-stone-800 focus:outline-hidden focus:border-espresso focus:ring-1 focus:ring-espresso rounded-xs"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-espresso text-white text-sm font-medium tracking-wide uppercase hover:bg-opacity-95 transition-luxury rounded-xs"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-700"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF6F0] px-4 py-4 space-y-3 animate-fade-in">
          <Link
            href="/collections"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-semibold tracking-wider text-stone-800 hover:text-espresso py-2 border-b border-stone-100 uppercase"
          >
            Collections
          </Link>
          <Link
            href="/#our-story"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-semibold tracking-wider text-stone-800 hover:text-espresso py-2 border-b border-stone-100 uppercase"
          >
            Our Story
          </Link>
          <Link
            href="/#scent-rituals"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-semibold tracking-wider text-stone-800 hover:text-espresso py-2 border-b border-stone-100 uppercase"
          >
            Scent Rituals
          </Link>
          <Link
            href="/#gifting"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-semibold tracking-wider text-stone-800 hover:text-espresso py-2 uppercase"
          >
            Gifting
          </Link>
        </div>
      )}
    </header>
  );
}
