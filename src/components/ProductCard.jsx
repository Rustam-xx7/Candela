"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  const { id, name, price, scentNotes, image } = product;

  return (
    <Link href={`/collections/${id}`} className="group block text-center">
      {/* Arched image container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-t-full bg-stone-100 border border-stone-200/40 shadow-sm transition-all duration-500 ease-out group-hover:shadow-md group-hover:border-stone-300">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Scent Pill Tags */}
      {scentNotes && scentNotes.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {scentNotes.slice(0, 2).map((note, index) => (
            <span
              key={index}
              className="px-2.5 py-0.5 text-[10px] tracking-wide font-medium bg-sage text-sage-text rounded-full uppercase"
            >
              {note}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h3 className="mt-3 font-serif text-lg tracking-widest text-[#2C1810] font-medium uppercase group-hover:text-espresso transition-colors duration-300">
        {name}
      </h3>

      {/* Price */}
      <p className="mt-1 text-sm font-medium text-stone-500">
        ${price.toFixed(2)}
      </p>
    </Link>
  );
}
