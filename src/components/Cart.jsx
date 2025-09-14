import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../data/product.js';

export function Cart() {
  const { summary, dispatch } = useCart();
  if (summary.itemCount === 0) return <p className="text-gray-600">Cart is empty.</p>;
  return (
    <div className="space-y-4">
      <ul className="divide-y border rounded">
        {summary.lineItems.map(li => (
          <li key={li.variantId} className="p-3 flex items-center justify-between gap-4">
            <div>
              <div className="font-medium">{li.name}</div>
              <div className="text-xs text-gray-500">Qty: {li.quantity}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold">{formatPrice(li.price * li.quantity)}</div>
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 text-xs border rounded" onClick={() => dispatch({ type: 'UPDATE_QTY', variantId: li.variantId, quantity: li.quantity - 1 })} aria-label={`Decrease quantity of ${li.name}`}>-</button>
                <button className="px-2 py-1 text-xs border rounded" onClick={() => dispatch({ type: 'UPDATE_QTY', variantId: li.variantId, quantity: li.quantity + 1 })} aria-label={`Increase quantity of ${li.name}`}>+</button>
                <button className="px-2 py-1 text-xs border rounded text-red-600" onClick={() => dispatch({ type: 'REMOVE_ITEM', variantId: li.variantId })} aria-label={`Remove ${li.name}`}>x</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between font-semibold">
        <span>Subtotal</span>
        <span>{formatPrice(summary.subtotal)}</span>
      </div>
    </div>
  );
}
