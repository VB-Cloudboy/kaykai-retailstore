import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../data/product.js';

export function MiniCart() {
  const { summary } = useCart();
  if (summary.itemCount === 0) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg border rounded p-3 w-56 text-sm">
      <div className="font-semibold mb-2">Cart ({summary.itemCount})</div>
      <div className="flex items-center justify-between"><span>Subtotal</span><span>{formatPrice(summary.subtotal)}</span></div>
    </div>
  );
}
