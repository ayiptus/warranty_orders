'use client'

import { OrderItem } from '@/lib/types'
import { Trash2 } from 'lucide-react'

interface ProductDetailCardProps {
  item: OrderItem
  onRemove: () => void
}

export function ProductDetailCard({ item, onRemove }: ProductDetailCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      {/* Product image */}
      {item.product.image && (
        <div className="rounded-lg overflow-hidden mb-4" style={{ height: 100 }}>
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Header row */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{item.product.name}</h4>
          <p className="text-xs text-gray-500 mt-0.5">Part #: {item.product.partNumber}</p>
        </div>
        <button
          onClick={onRemove}
          className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-gray-50 rounded-lg px-3 py-2">
          <p className="text-[11px] text-gray-500 mb-0.5">Quantity</p>
          <p className="text-sm font-semibold text-gray-900">{item.quantity}</p>
        </div>
        <div className="bg-gray-50 rounded-lg px-3 py-2">
          <p className="text-[11px] text-gray-500 mb-0.5">Serial Number</p>
          <p className="text-sm font-semibold text-gray-900">{item.serialNumber || '—'}</p>
        </div>
      </div>

      {item.notes && (
        <div className="bg-gray-50 rounded-lg px-3 py-2">
          <p className="text-[11px] text-gray-500 mb-0.5">Notes</p>
          <p className="text-sm text-gray-700 leading-relaxed">{item.notes}</p>
        </div>
      )}
    </div>
  )
}
