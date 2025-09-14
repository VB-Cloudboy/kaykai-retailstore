import React from 'react';
import { formatPrice } from '../data/product.js';

export function OrderConfirmation({ order }) {
  if (!order) return null;
  return (
    <div className="max-w-md space-y-4">
      <h2 className="text-2xl font-bold">Thank you!</h2>
      <p className="text-gray-600">Your order <span className="font-mono">{order.orderId}</span> has been received.</p>
      <div className="font-semibold">Total: {formatPrice(order.total)}</div>
      <p className="text-sm text-gray-500">(Payment integration coming in a future phase.)</p>
    </div>
  );
}
