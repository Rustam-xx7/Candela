"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 75;
  const shippingProgress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
  const neededForFreeShipping = Math.max(freeShippingThreshold - cartTotal, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#FAF6F0] p-6 shadow-2xl transition-transform animate-slide-left border-l border-stone-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-stone-200">
          <div>
            <h2 className="font-serif text-2xl font-medium tracking-wide text-stone-900">
              Your Sanctuary Bag
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              {cartCount} {cartCount === 1 ? "item" : "items"} selected
            </p>
          </div>
          <button
            onClick={toggleCart}
            className="rounded-full p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors focus:outline-hidden"
            aria-label="Close cart"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Shipping Goal */}
        {cart.length > 0 && (
          <div className="py-4 border-b border-stone-200">
            <p className="text-sm text-stone-800 font-medium">
              {neededForFreeShipping > 0 ? (
                <span>
                  Add <span className="font-semibold text-espresso">${neededForFreeShipping.toFixed(2)}</span> more for complimentary shipping.
                </span>
              ) : (
                <span className="text-emerald-700 font-medium">
                  🎉 You qualify for complimentary shipping!
                </span>
              )}
            </p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full bg-espresso transition-all duration-500 ease-out"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center">
              <svg
                className="h-12 w-12 text-stone-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="font-serif text-lg text-stone-700">Your bag is empty</h3>
              <p className="text-sm text-stone-400 mt-2 max-w-[250px]">
                Begin your scent ritual by adding handcrafted items to your bag.
              </p>
              <button
                onClick={toggleCart}
                className="mt-6 px-6 py-2.5 bg-espresso text-white text-sm font-medium tracking-wider hover:bg-opacity-95 transition-luxury uppercase rounded-xs"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 pb-4 border-b border-stone-100"
              >
                {/* Product Image in an arch */}
                <div className="relative h-24 w-18 overflow-hidden rounded-t-full bg-stone-100 border border-stone-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-base font-medium text-stone-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5 truncate">
                    {item.scentNotes.join(" • ")}
                  </p>
                  <p className="text-sm font-medium text-espresso mt-2">
                    ${item.price.toFixed(2)} USD
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-stone-200 bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-stone-500 hover:text-stone-800 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-2 text-sm text-stone-800 font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-stone-500 hover:text-stone-800 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-stone-400 hover:text-red-600 transition-colors underline underline-offset-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="pt-4 border-t border-stone-200 bg-[#FAF6F0] space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-600">Subtotal</span>
              <span className="font-semibold text-stone-900">${cartTotal.toFixed(2)} USD</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Taxes and shipping calculated at checkout. Handcrafted packaging and ritual guide included.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  alert("Proceeding to checkout with: " + cart.map(i => `${i.name} (${i.quantity})`).join(", "));
                }}
                className="w-full py-3 bg-espresso text-white text-sm font-medium tracking-widest hover:bg-opacity-95 transition-luxury uppercase text-center rounded-xs"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={toggleCart}
                className="w-full py-2.5 border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 text-sm font-medium tracking-wide transition-luxury text-center rounded-xs"
              >
                Keep Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
