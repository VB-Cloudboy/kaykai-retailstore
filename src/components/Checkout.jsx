import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../data/product.js';

export function Checkout({ onComplete }) {
  const { summary } = useCart();
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  function submit(e) {
    e.preventDefault();
    // Placeholder: pass data upward
    onComplete?.({ orderId: 'TEMP-' + Date.now(), form, total: summary.subtotal });
  }

  return (
    <form onSubmit={submit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input required className="w-full border rounded px-3 py-2" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" required className="w-full border rounded px-3 py-2" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Address</label>
        <textarea required className="w-full border rounded px-3 py-2" rows={3} value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
      </div>
      <div className="font-semibold">Order Total: {formatPrice(summary.subtotal)}</div>
      <button type="submit" className="px-4 py-2 rounded bg-brand-600 text-white hover:bg-brand-500">Place Order (Mock)</button>
    </form>
  );
}
