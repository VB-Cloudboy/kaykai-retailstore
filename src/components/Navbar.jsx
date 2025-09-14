import React from 'react';
import { useCart } from '../context/CartContext.jsx';

export function Navbar() {
  const { summary } = useCart();
  return (
    <nav className="flex items-center justify-between py-3">
      <div className="text-lg font-semibold text-brand-600">KayKai</div>
      <div className="text-sm" aria-live="polite">Cart: {summary.itemCount} item(s)</div>
    </nav>
  );
}
