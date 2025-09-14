export const product = {
  id: 'kaykai-flagship',
  name: 'KayKai Flagship Product',
  tagline: 'Premium quality for daily excellence',
  description: `Crafted with attention to detail, the KayKai Flagship Product delivers consistent performance and premium feel. Perfect for enthusiasts and newcomers alike.`,
  basePrice: 4900, // cents
  currency: 'SGD',
  images: [
    '/images/hero-placeholder.jpg'
  ],
  variants: [
    { id: 'standard-blue', name: 'Standard / Blue', color: 'Blue', size: 'Standard', price: 4900, sku: 'KK-ST-BL' },
    { id: 'standard-black', name: 'Standard / Black', color: 'Black', size: 'Standard', price: 4900, sku: 'KK-ST-BK' },
    { id: 'deluxe-blue', name: 'Deluxe / Blue', color: 'Blue', size: 'Deluxe', price: 5900, sku: 'KK-DX-BL' }
  ]
};

export function formatPrice(cents, currency = 'SGD') {
  return new Intl.NumberFormat('en-SG', { style: 'currency', currency }).format(cents / 100);
}
