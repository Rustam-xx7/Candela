"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import ScentQuiz from "../components/ScentQuiz";

export default function LandingPage() {
  // Select first 4 products for the signature collection
  const signatureProducts = products.slice(0, 4);
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F3EDE4]/40 to-transparent pt-12 lg:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <span className="text-[10px] tracking-[0.3em] font-semibold text-stone-400 uppercase block">
                Handcrafted Serenity
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide text-[#2C1810] leading-tight">
                Illuminate your <br />
                <span className="font-serif italic font-normal text-espresso">Scent Ritual</span>
              </h1>
              <p className="text-base text-stone-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Experience the art of living with our artisanal beeswax blends, meticulously crafted to transform your space into a sanctuary of calm.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/collections"
                  className="w-full sm:w-auto px-8 py-3.5 bg-espresso text-white text-xs font-semibold tracking-widest uppercase hover:bg-opacity-95 transition-luxury text-center rounded-xs shadow-sm"
                >
                  Shop Collections
                </Link>
                <Link
                  href="#our-story"
                  className="w-full sm:w-auto px-8 py-3.5 border border-stone-300 text-[#2C1810] hover:bg-stone-100/60 text-xs font-semibold tracking-widest uppercase transition-luxury text-center rounded-xs"
                >
                  Discover Our Story
                </Link>
              </div>
            </div>

            {/* Hero Right Image - Large Candle on Terrazzo Plate */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative w-full max-w-xl aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-stone-200/30">
                <Image
                  src="/images/hero-candle.png"
                  alt="Aura & Wick Lit Honey Scented Candle"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Philosophy Section */}
      <section id="our-story" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Philosophy Left Image (Arch frame wax pouring) */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-t-[14rem] border border-stone-200 shadow-lg">
              <Image
                src="/images/nature-pour.png"
                alt="Artisan pouring liquid candle wax"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Philosophy Right Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <span className="text-[10px] tracking-[0.25em] text-stone-400 font-semibold uppercase block">
              The Aura Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-stone-900 leading-tight">
              Born from Nature, <br />
              <span className="font-serif italic font-normal text-espresso">Refined for the Soul.</span>
            </h2>
            <div className="space-y-4 text-sm text-stone-600 leading-relaxed">
              <p>
                Aura & Wick was founded on the belief that a candle is more than just a source of light; it is a sensory link to the present moment. We treat every candle as a piece of functional art, balancing ancient craftsmanship with atmospheric function.
              </p>
              <p>
                Our proprietary beeswax and coconut blend ensures a clean, lingering burn that honors the environment as much as your interior space. We use only lead-free cotton wicks and carefully sourced essential oils to ensure your safety and absolute peace of mind.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="#process"
                className="font-serif italic font-semibold text-espresso hover:text-stone-950 transition-colors duration-300 border-b border-espresso pb-1 text-sm tracking-wide"
              >
                Learn about our process
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Signature Collection Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-stone-400 font-semibold uppercase block mb-2">
              The Essentials
            </span>
            <h2 className="font-serif text-3xl font-light tracking-wide text-stone-900">
              Signature Collection
            </h2>
          </div>
          
          {/* Arrow navigation */}
          <div className="flex space-x-3">
            <button
              onClick={() => scrollCarousel("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-600 hover:bg-espresso hover:text-white hover:border-espresso transition-all duration-300"
              aria-label="Previous products"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-600 hover:bg-espresso hover:text-white hover:border-espresso transition-all duration-300"
              aria-label="Next products"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div
          ref={carouselRef}
          className="flex gap-8 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {signatureProducts.map((product) => (
            <div key={product.id} className="min-w-[280px] sm:min-w-[300px] w-[280px] sm:w-[300px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Scent Quiz Section */}
      <ScentQuiz />

      {/* 5. Lifestyle / Gallery Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-10">
        <div>
          <span className="text-[10px] tracking-[0.3em] font-semibold text-stone-400 uppercase block mb-3">
            Atmospheric Serenity
          </span>
          <h2 className="font-serif text-3xl font-light tracking-wide text-stone-900">
            Sanctuaries of Light & Clay
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest font-semibold uppercase text-espresso hover:underline block mt-3"
          >
            Join our Community @auraandwick
          </a>
        </div>

        {/* 4 Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-stone-200/40">
            <Image
              src="/images/claricomb-candle.png"
              alt="Claricomb candle ambient shot"
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg border border-stone-200/40">
            <Image
              src="/images/hero-candle.png"
              alt="Hero candle in tray close-up"
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg border border-stone-200/40">
            <Image
              src="/images/login-candle.png"
              alt="Login page candle with lavender"
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg border border-stone-200/40">
            <Image
              src="/images/nature-pour.png"
              alt="Wax pour detail image"
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
