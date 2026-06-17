'use client'

import { OrderItem } from '@/lib/types'

interface ItemSummaryProps {
  items: OrderItem[]
  onPreview: () => void
}

export function ItemSummary({ items, onPreview }: ItemSummaryProps) {
  const hasItems = items.length > 0

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Request Summary</h3>

      <div className="bg-gray-100 rounded-lg px-4 py-3 mb-5 flex items-center gap-3">
        <span className="text-3xl font-bold text-gray-900">{items.length}</span>
        <span className="text-sm text-gray-500">Items Added</span>
      </div>

      {hasItems && (
        <ul className="space-y-2 mb-5 max-h-48 overflow-y-auto">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between text-sm text-gray-700">
              <span className="truncate pr-2">{item.product.name}</span>
              <span className="font-medium flex-shrink-0">&times;{item.quantity}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onPreview}
        disabled={!hasItems}
        className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
        style={{
          backgroundColor: hasItems ? '#111827' : '#9CA3AF',
          cursor: hasItems ? 'pointer' : 'not-allowed',
        }}
        onMouseEnter={(e) => {
          if (hasItems) e.currentTarget.style.backgroundColor = '#374151'
        }}
        onMouseLeave={(e) => {
          if (hasItems) e.currentTarget.style.backgroundColor = '#111827'
        }}
      >
        Preview Request
      </button>
    </div>
  )
}
