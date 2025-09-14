import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext.jsx';
import { product, formatPrice } from './data/product.js';
import { Navbar } from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { VariantSelector } from './components/VariantSelector.jsx';
import { MiniCart } from './components/MiniCart.jsx';

function ProductView() {
  const { dispatch, summary } = useCart();
  const [selected, setSelected] = useState(product.variants[0].id);
  const variant = product.variants.find(v => v.id === selected) || product.variants[0];
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-brand-600 font-semibold mb-4">{formatPrice(variant.price, product.currency)}</p>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="mb-6">
        <VariantSelector variants={product.variants} selectedId={selected} onChange={setSelected} />
      </div>
      <button
        className="px-4 py-2 rounded bg-brand-600 text-white hover:bg-brand-500 transition"
        onClick={() => dispatch({ type: 'ADD_ITEM', item: { variantId: variant.id, price: variant.price, quantity: 1, name: variant.name } })}
      >
        Add to Cart
      </button>
      {summary.itemCount > 0 && (
        <div className="mt-4 text-sm text-gray-700" role="status">{summary.itemCount} item(s) in cart – Subtotal {formatPrice(summary.subtotal)}</div>
      )}
    </div>
  );
}

function AppShell() {
  const [view] = useState('product');
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b p-4">
        <Navbar />
      </header>
      <main className="flex-1 p-4">
        {view === 'product' && <ProductView />}
      </main>
      <Footer />
      <MiniCart />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppShell />
    </CartProvider>
  );
}
