"use client";

import React, { useState } from "react";
import { products } from "../data/products";
import Image from "next/image";
import Link from "next/link";

export default function ScentQuiz() {
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const handleSelectVibe = (vibe) => {
    setSelectedVibe(vibe);
    setIsAnalyzing(true);
    setRecommendation(null);

    // Simulate luxury formulation search
    setTimeout(() => {
      let matched = null;
      if (vibe === "ENERGIZED") {
        matched = products.find((p) => p.id === "citrus-sol") || products[0];
      } else if (vibe === "SERENE") {
        matched = products.find((p) => p.id === "claricomb") || products[0];
      } else if (vibe === "FOCUSED") {
        matched = products.find((p) => p.id === "peruvian") || products[2];
      } else {
        // COZY
        matched = products.find((p) => p.id === "umber-wood") || products[3];
      }
      setRecommendation(matched);
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleReset = () => {
    setSelectedVibe(null);
    setRecommendation(null);
    setIsAnalyzing(false);
  };

  return (
    <section className="bg-stone-50 border-y border-stone-200/40 py-20 px-4">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-[10px] tracking-[0.25em] text-stone-400 font-semibold uppercase block mb-3">
          The Alchemist's Tool
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-wide text-stone-900 mb-12">
          Discover your signature scent
        </h2>

        {/* Quiz Container */}
        <div className="bg-[#FAF6F0] border border-stone-200 rounded-lg p-8 sm:p-12 shadow-sm min-h-[300px] flex flex-col justify-center transition-luxury">
          
          {!selectedVibe && !isAnalyzing && (
            <div className="animate-fade-in space-y-8">
              <p className="font-serif text-xl text-stone-800">
                How do you wish to feel in your space?
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {["ENERGIZED", "SERENE", "FOCUSED", "COZY"].map((vibe) => (
                  <button
                    key={vibe}
                    onClick={() => handleSelectVibe(vibe)}
                    className="py-4 border border-stone-300 text-xs font-semibold tracking-widest text-stone-700 bg-transparent hover:bg-espresso hover:text-white hover:border-espresso transition-all duration-300 uppercase rounded-xs"
                  >
                    {vibe}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              {/* Spinner */}
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-espresso" />
              <p className="text-sm font-serif italic text-stone-500">
                Meticulously searching your fragrance profile...
              </p>
            </div>
          )}

          {recommendation && !isAnalyzing && (
            <div className="animate-fade-in flex flex-col md:flex-row items-center gap-8 text-left max-w-2xl mx-auto">
              
              {/* Recommended Image */}
              <div className="relative h-48 w-36 overflow-hidden rounded-t-full bg-stone-100 border border-stone-200">
                <Image
                  src={recommendation.image}
                  alt={recommendation.name}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>

              {/* Recommended Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <span className="text-[10px] tracking-widest font-semibold uppercase text-espresso bg-[#F3EDE4] px-2.5 py-1 rounded-sm">
                    Your Ideal Match
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-stone-900 mt-3">
                    {recommendation.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider">
                    {recommendation.scentNotes.join(" • ")}
                  </p>
                </div>
                
                <p className="text-sm text-stone-600 leading-relaxed">
                  {recommendation.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href={`/collections/${recommendation.id}`}
                    className="px-6 py-2.5 bg-espresso text-white text-xs font-medium tracking-widest uppercase hover:bg-opacity-95 transition-luxury rounded-xs"
                  >
                    View Scent
                  </Link>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 border border-stone-300 text-stone-600 hover:text-stone-900 text-xs font-medium tracking-wide transition-luxury rounded-xs"
                  >
                    Reset Quiz
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
