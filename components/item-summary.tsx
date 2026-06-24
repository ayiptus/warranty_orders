'use client'

import { useState } from 'react'
import { OrderItem } from '@/lib/types'

interface ItemSummaryProps {
  items: OrderItem[]
  onSend: () => void
  allDescriptionsFilled: boolean
}

export function ItemSummary({ items, onSend, allDescriptionsFilled }: ItemSummaryProps) {
  const [policyAccepted, setPolicyAccepted] = useState(false)
  const hasItems = items.length > 0
  const canSend = hasItems && allDescriptionsFilled && policyAccepted

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-base font-semibold text-gray-900">Items Summary</h3>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: '#111827' }}
        >
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Item list */}
      {hasItems ? (
        <ul className="space-y-2 mb-5 max-h-52 overflow-y-auto">
          {items.map((item) => (
            <li key={item.id} className="text-sm text-gray-700 leading-snug">
              {item.sign.id} &mdash; {item.sign.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400 italic mb-5">Your cart is empty</p>
      )}

      {/* Send Request button */}
      <button
        onClick={onSend}
        disabled={!canSend}
        className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
        style={{
          backgroundColor: canSend ? '#111827' : '#9CA3AF',
          cursor: canSend ? 'pointer' : 'not-allowed',
        }}
        onMouseEnter={(e) => {
          if (canSend) e.currentTarget.style.backgroundColor = '#374151'
        }}
        onMouseLeave={(e) => {
          if (canSend) e.currentTarget.style.backgroundColor = '#111827'
        }}
      >
        Send Request to Modulex
      </button>

      {/* Policy checkbox and disclaimer */}
      <div className="mt-3 flex items-start gap-2">
        <input
          type="checkbox"
          id="policy-checkbox"
          checked={policyAccepted}
          onChange={(e) => setPolicyAccepted(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-gray-300 cursor-pointer flex-shrink-0"
          style={{ accentColor: '#111827' }}
        />
        <label htmlFor="policy-checkbox" className="text-[11px] text-gray-400 leading-relaxed cursor-pointer flex-1">
          *Modulex will review your request and confirm whether it falls under the Warranty Policies
          or if there will be any cost associated with replacement or repair services.
        </label>
      </div>
    </div>
  )
}
