'use client'

import { OrderItem } from '@/lib/types'
import { Trash2 } from 'lucide-react'

interface SignDetailCardProps {
  item: OrderItem
  warrantyDescription: string
  onDescriptionChange: (value: string) => void
  onRemove: () => void
}

export function SignDetailCard({
  item,
  warrantyDescription,
  onDescriptionChange,
  onRemove,
}: SignDetailCardProps) {
  const { sign } = item

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-5"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
    >
      {/* Card header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">{sign.id}</span>
          <h4 className="text-base font-semibold text-gray-900 mt-0.5">{sign.name}</h4>
          <p className="text-xs text-gray-400 mt-0.5">Code: {sign.code}</p>
        </div>
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors ml-3 flex-shrink-0"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Two-column image row */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4">
        {/* Visual Representation — wider (3/5) */}
        <div className="sm:col-span-3">
          <p className="text-[11px] text-gray-400 mb-1.5">Visual Representation</p>
          <div
            className="w-full rounded-lg overflow-hidden bg-gray-100"
            style={{ aspectRatio: '2 / 1' }}
          >
            <img
              src={sign.visualImage}
              alt={`${sign.name} visual representation`}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Dimensions */}
          <div className="mt-2 text-[11px] text-gray-500 space-y-0.5 leading-relaxed">
            <p><span className="font-medium text-gray-700">H:</span> {sign.dimensions.h}</p>
            <p><span className="font-medium text-gray-700">W:</span> {sign.dimensions.w}</p>
            <p><span className="font-medium text-gray-700">D:</span> {sign.dimensions.d}</p>
          </div>
        </div>

        {/* Implementation Photo — narrower (2/5) */}
        <div className="sm:col-span-2">
          <p className="text-[11px] text-gray-400 mb-1.5">Implementation Photo</p>
          <div
            className="w-full rounded-lg overflow-hidden bg-gray-100"
            style={{ aspectRatio: '4 / 5' }}
          >
            <img
              src={sign.implImage}
              alt={`${sign.name} implementation photo`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Key-value row */}
      <div className="flex flex-wrap gap-4 mb-4 py-3 border-t border-b border-gray-100">
        <div className="text-xs text-gray-600">
          <span className="font-medium text-gray-800">Illumination:</span>{' '}
          {sign.illumination ? 'Yes' : 'No'}
        </div>
        <div className="text-xs text-gray-600">
          <span className="font-medium text-gray-800">Backer Needed:</span>{' '}
          {sign.backerNeeded ? 'Yes' : 'No'}
        </div>
        <div className="text-xs text-gray-600">
          <span className="font-medium text-gray-800">Quantity:</span> {sign.quantity}
        </div>
      </div>

      {/* Warranty description textarea */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">
          Please describe briefly the warranty / replacement request{' '}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          value={warrantyDescription}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Enter your request here"
          rows={3}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
        />
      </div>
    </div>
  )
}
