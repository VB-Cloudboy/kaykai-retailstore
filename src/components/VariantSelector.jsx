import React from 'react';

export function VariantSelector({ variants, selectedId, onChange }) {
  return (
    <div className="space-y-2">
      <div className="font-medium">Choose a variant</div>
      <div className="flex flex-wrap gap-2">
        {variants.map(v => (
          <button
            key={v.id}
            type="button"
            onClick={() => onChange(v.id)}
            className={`px-3 py-1 rounded border text-sm ${selectedId === v.id ? 'bg-brand-600 text-white border-brand-600' : 'border-gray-300 hover:border-brand-400'}`}
            aria-pressed={selectedId === v.id}
          >
            {v.name}
          </button>
        ))}
      </div>
    </div>
  );
}
