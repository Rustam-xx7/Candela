"use client";

import React, { useState, useMemo } from "react";
import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard";

export default function CollectionsPage() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter & Sort Logic
  const processedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by Profile
    if (selectedProfile) {
      filtered = filtered.filter(
        (p) => p.scentProfile.toLowerCase() === selectedProfile.toLowerCase()
      );
    }

    // Filter by Vibe
    if (selectedVibe) {
      filtered = filtered.filter(
        (p) => p.vibe.toLowerCase() === selectedVibe.toLowerCase()
      );
    }

    // Sort Logic
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      // Relevance (default)
      // Sort by rating or alphabetical as fallback
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [selectedProfile, selectedVibe, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [processedProducts, currentPage]);

  const handleProfileToggle = (profile) => {
    setSelectedProfile(selectedProfile === profile ? null : profile);
    setCurrentPage(1); // Reset to page 1
  };

  const handleVibeToggle = (vibe) => {
    setSelectedVibe(selectedVibe === vibe ? null : vibe);
    setCurrentPage(1); // Reset to page 1
  };

  const handleClearFilters = () => {
    setSelectedProfile(null);
    setSelectedVibe(null);
    setSortBy("relevance");
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] tracking-[0.25em] text-stone-400 font-semibold uppercase block">
          Discovery
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-wide text-stone-900">
          Collections
        </h1>
        <p className="text-sm text-stone-500 leading-relaxed">
          Explore our curated range of hand-poured botanical candles, designed to transform your space into a sanctuary of olfactory delight.
        </p>
      </div>

      {/* 2. Filters & Sort Controls */}
      <div className="border-y border-stone-200 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Interactive Filter Chips */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-stone-600">
          {/* Scent Profile Filter */}
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wider uppercase text-stone-400">Scent Profile:</span>
            <div className="flex gap-1.5">
              {["Woody", "Floral", "Fresh"].map((profile) => {
                const isActive = selectedProfile === profile;
                return (
                  <button
                    key={profile}
                    onClick={() => handleProfileToggle(profile)}
                    className={`px-3.5 py-1.5 border tracking-wider rounded-full uppercase transition-all duration-300 font-medium ${
                      isActive
                        ? "bg-espresso text-white border-espresso"
                        : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    {profile}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vibe Filter */}
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wider uppercase text-stone-400">Vibe:</span>
            <div className="flex gap-1.5">
              {["Serenity", "Focus", "Cozy"].map((vibe) => {
                const isActive = selectedVibe === vibe;
                return (
                  <button
                    key={vibe}
                    onClick={() => handleVibeToggle(vibe)}
                    className={`px-3.5 py-1.5 border tracking-wider rounded-full uppercase transition-all duration-300 font-medium ${
                      isActive
                        ? "bg-espresso text-white border-espresso"
                        : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    {vibe}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clear Filters (conditional) */}
          {(selectedProfile || selectedVibe || sortBy !== "relevance") && (
            <button
              onClick={handleClearFilters}
              className="text-espresso hover:underline underline-offset-4 uppercase tracking-widest font-semibold hover:text-[#2C1810] transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Right: Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <label htmlFor="sort" className="font-semibold uppercase tracking-wider text-stone-400">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white border border-stone-200 text-stone-700 px-3 py-1.5 uppercase font-medium focus:outline-hidden focus:border-espresso tracking-wide rounded-xs cursor-pointer"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* 3. Product Grid */}
      {currentItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <svg className="h-10 w-10 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <h3 className="font-serif text-xl text-stone-700">No matching scents found</h3>
          <p className="text-sm text-stone-400 max-w-xs leading-relaxed">
            Adjust your profile or vibe filters to find another blend matching your sanctuary guidelines.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-2 px-6 py-2 bg-espresso text-white text-xs font-semibold tracking-widest uppercase hover:bg-opacity-95 transition-luxury rounded-xs"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {currentItems.map((product) => (
            <div key={product.id} className="animate-slide-up">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {/* 4. Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-10 border-t border-stone-200/50">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-stone-500 transition-colors ${
              currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-stone-100 hover:text-stone-900"
            }`}
            aria-label="Previous Page"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium tracking-wide border transition-all ${
                currentPage === page
                  ? "bg-espresso text-white border-espresso"
                  : "bg-transparent text-stone-500 border-transparent hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-stone-500 transition-colors ${
              currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "hover:bg-stone-100 hover:text-stone-900"
            }`}
            aria-label="Next Page"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

    </div>
  );
}
