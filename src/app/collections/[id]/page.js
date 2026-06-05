"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { products } from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import ProductCard from "../../../components/ProductCard";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  // Find product by id
  const product = useMemo(() => {
    return products.find((p) => p.id === id);
  }, [id]);

  // States
  const [activeImage, setActiveImage] = useState(product?.image || "");
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState(null); // 'notes', 'care', 'shipping'
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center space-y-6 animate-fade-in">
        <h2 className="font-serif text-3xl text-stone-800">Fragrance Not Found</h2>
        <p className="text-sm text-stone-500 max-w-xs mx-auto">
          The scent ritual you are looking for has departed our apothecary or is temporarily unavailable.
        </p>
        <button
          onClick={() => router.push("/collections")}
          className="px-8 py-3 bg-espresso text-white text-xs font-semibold tracking-widest uppercase hover:bg-opacity-95 transition-luxury rounded-xs"
        >
          Return to Collections
        </button>
      </div>
    );
  }

  // Set initial image if state is empty (prevents empty activeImage issues)
  if (!activeImage && product.image) {
    setActiveImage(product.image);
  }

  // Get related products (same profile, excluding current)
  const relatedProducts = useMemo(() => {
    let related = products.filter((p) => p.scentProfile === product.scentProfile && p.id !== product.id);
    if (related.length === 0) {
      related = products.filter((p) => p.id !== product.id);
    }
    return related.slice(0, 4);
  }, [product]);

  const handleQuantityChange = (val) => {
    if (val < 1) return;
    setQuantity(val);
  };

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div className="pb-20 space-y-24">
      
      {/* 1. Main Product Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Thumbnail Selector + Main Image (Col span 7) */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-6">
            {/* Thumbnails list */}
            <div className="flex sm:flex-col order-2 sm:order-1 gap-3 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
              {product.thumbnails.map((thumb, index) => {
                const isActive = activeImage === thumb;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveImage(thumb)}
                    className={`relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-stone-100 transition-all ${
                      isActive ? "border-espresso ring-1 ring-espresso" : "border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    <Image
                      src={thumb}
                      alt={`${product.name} Thumbnail ${index + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* Main Arch-Framed Image */}
            <div className="flex-1 flex justify-center order-1 sm:order-2">
              <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-t-[14rem] border border-stone-200/50 shadow-md bg-stone-50 transition-all duration-500">
                <Image
                  src={activeImage || product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Product Details Panel (Col span 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Category, Title, Reviews */}
            <div className="space-y-2 border-b border-stone-200/60 pb-5">
              <span className="text-[10px] tracking-[0.2em] font-semibold text-stone-400 uppercase block">
                {product.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-stone-900 leading-tight">
                {product.name}
              </h1>
              
              {/* Ratings */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex text-amber-500 text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-xs text-stone-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <p className="text-2xl font-medium text-espresso font-serif border-b border-stone-200/60 pb-5">
              ${product.price.toFixed(2)} USD
            </p>

            {/* Description */}
            <p className="text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* Scent Notes Pill Tags */}
            <div className="flex flex-wrap gap-2">
              {product.scentNotes.map((note, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1 text-xs tracking-wider bg-sage text-sage-text rounded-full uppercase font-medium"
                >
                  {note}
                </span>
              ))}
            </div>

            {/* Spec Card Details Grid */}
            <div className="grid grid-cols-2 gap-4 border border-stone-200 p-4 rounded-sm bg-[#FAF6F0]">
              <div className="text-center border-r border-stone-200 py-1">
                <span className="text-[9px] tracking-widest uppercase text-stone-400 font-semibold block">Burn Time</span>
                <span className="text-sm font-medium text-stone-800 block mt-1">{product.burnTime}</span>
              </div>
              <div className="text-center py-1">
                <span className="text-[9px] tracking-widest uppercase text-stone-400 font-semibold block">Net Weight</span>
                <span className="text-sm font-medium text-stone-800 block mt-1">{product.weight}</span>
              </div>
            </div>

            {/* Quantity Adjuster & Add Buttons */}
            <div className="space-y-4 pt-4 border-t border-stone-200/60">
              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">Quantity</span>
                <div className="flex items-center border border-stone-300 bg-white">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-3.5 py-1.5 text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-medium text-stone-800 w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-3.5 py-1.5 text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  onClick={handleAdd}
                  className="py-3.5 bg-espresso text-white text-xs font-semibold tracking-widest uppercase hover:bg-opacity-95 transition-luxury text-center rounded-xs shadow-sm"
                >
                  Add to Bag
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`py-3.5 border border-stone-300 text-xs font-semibold tracking-widest uppercase transition-luxury text-center rounded-xs flex items-center justify-center gap-2 ${
                    isWishlisted ? "bg-red-50/55 border-red-300 text-red-700" : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <svg
                    className={`h-4 w-4 transition-colors ${isWishlisted ? "fill-red-600 stroke-red-600" : "stroke-current fill-none"}`}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </button>
              </div>
            </div>

            {/* Accordion Drawers */}
            <div className="border-t border-stone-200/80 pt-4 space-y-2">
              
              {/* Accordion 1: Scent Notes */}
              <div className="border-b border-stone-200/60 pb-3">
                <button
                  onClick={() => toggleAccordion("notes")}
                  className="w-full flex items-center justify-between text-xs font-semibold tracking-widest uppercase text-stone-800 hover:text-espresso py-2"
                >
                  <span>Scent Notes</span>
                  <svg
                    className={`h-4 w-4 transition-transform duration-300 ${activeAccordion === "notes" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeAccordion === "notes" && (
                  <div className="pt-2 pb-1 text-sm text-stone-500 leading-relaxed animate-fade-in">
                    {product.details.notes}
                  </div>
                )}
              </div>

              {/* Accordion 2: Ingredients & Care */}
              <div className="border-b border-stone-200/60 pb-3">
                <button
                  onClick={() => toggleAccordion("care")}
                  className="w-full flex items-center justify-between text-xs font-semibold tracking-widest uppercase text-stone-800 hover:text-espresso py-2"
                >
                  <span>Ingredients & Care</span>
                  <svg
                    className={`h-4 w-4 transition-transform duration-300 ${activeAccordion === "care" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeAccordion === "care" && (
                  <div className="pt-2 pb-1 text-sm text-stone-500 leading-relaxed animate-fade-in">
                    {product.details.care}
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Returns */}
              <div className="border-b border-stone-200/60 pb-3">
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full flex items-center justify-between text-xs font-semibold tracking-widest uppercase text-stone-800 hover:text-espresso py-2"
                >
                  <span>Shipping & Returns</span>
                  <svg
                    className={`h-4 w-4 transition-transform duration-300 ${activeAccordion === "shipping" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeAccordion === "shipping" && (
                  <div className="pt-2 pb-1 text-sm text-stone-500 leading-relaxed animate-fade-in">
                    {product.details.shipping}
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. Handcrafted for Serenity (Secondary Info fold) */}
      <section className="bg-[#FAF6F0] border-y border-stone-200/40 py-20 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image (arched layout) */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-t-[14rem] border border-stone-200/50 shadow-md">
                <Image
                  src="/images/nature-pour.png"
                  alt="Atmospheric pouring wax shot"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-serif text-3xl font-light tracking-wide text-stone-900">
                  Handcrafted for Serenity
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  We believe your home should be a sanctuary. Each Venso Candle is crafted using a proprietary blend of sustainably sourced coconut and apricot wax, premium fragrance oils, and lead-free cotton wicks.
                </p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Our '{product.name}' blend is specifically formulated to promote neuro-aesthetic harmony. By combining the sweetness of organic notes with deep herbal or woody foundations, we've created a scent that literally helps lower the heart rate and clear the mind.
                </p>
              </div>

              {/* Natural checklist points */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-stone-200/80 text-center sm:text-left">
                <div>
                  <span className="font-serif text-2xl font-light text-espresso block">100%</span>
                  <span className="text-[10px] tracking-widest font-semibold uppercase text-stone-400 block mt-1">Natural Wax</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-light text-espresso block">Vegan</span>
                  <span className="text-[10px] tracking-widest font-semibold uppercase text-stone-400 block mt-1">Cruelty Free</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-light text-espresso block">Zero</span>
                  <span className="text-[10px] tracking-widest font-semibold uppercase text-stone-400 block mt-1">Phthalates</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Related Scents */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between border-b border-stone-200 pb-5 mb-10">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-stone-400 font-semibold uppercase block mb-2">
              You May Also Adore
            </span>
            <h2 className="font-serif text-3xl font-light tracking-wide text-stone-900">
              Related Scents
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-xs font-semibold uppercase tracking-wider text-espresso border-b border-espresso pb-1 hover:text-stone-950 hover:border-stone-950 transition-colors"
          >
            View All Collections
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
}
