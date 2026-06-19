'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product, OrderItem, ClientInfo } from '@/lib/types'
import { WARRANTY_ITEMS, LOCATIONS } from '@/lib/constants'
import { ProductDetailCard } from '@/components/product-detail-card'
import { ItemSummary } from '@/components/item-summary'
import { ChevronLeft, Plus } from 'lucide-react'

const REQUIRED_FIELDS: (keyof ClientInfo)[] = ['fullName', 'location', 'email']

export function WarrantyForm() {
  const router = useRouter()

  const [items, setItems] = useState<OrderItem[]>([])
  const [selectedItemId, setSelectedItemId] = useState<string>('')
  const [showItemSelector, setShowItemSelector] = useState(false)

  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    fullName: '',
    location: '',
    email: '',
    propertyAddress: '',
  })

  const [formData, setFormData] = useState({
    quantity: 1,
    serialNumber: '',
    notes: '',
  })

  const selectedProduct = WARRANTY_ITEMS.find((p) => p.id === selectedItemId) ?? null

  const requiredComplete = REQUIRED_FIELDS.every((f) => clientInfo[f].trim() !== '')

  const handleAddItem = () => {
    if (!selectedProduct) return
    const newItem: OrderItem = {
      id: `${selectedProduct.id}-${Date.now()}`,
      product: selectedProduct,
      quantity: formData.quantity,
      serialNumber: formData.serialNumber,
      notes: formData.notes,
    }
    setItems((prev) => [...prev, newItem])
    setFormData({ quantity: 1, serialNumber: '', notes: '' })
    setSelectedItemId('')
    setShowItemSelector(false)
  }

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handlePreview = () => {
    alert('Request preview would be shown here.')
  }

  const inputClass =
    'w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'

  const labelClass = 'block text-xs font-medium text-gray-600 mb-1.5'

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Back */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Request for Warranty / Replacement</h1>
          <p className="mt-1 text-sm text-gray-500">
            Select your signage product or service required
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left column ─────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Client & Project Information */}
            <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-5">
                Client &amp; Project Information
              </h2>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className={labelClass}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={clientInfo.fullName}
                    onChange={(e) => setClientInfo({ ...clientInfo, fullName: e.target.value })}
                    className={inputClass}
                  />
                </div>

                {/* Office / Location dropdown */}
                <div>
                  <label className={labelClass}>
                    Office / Location / Plant Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={clientInfo.location}
                    onChange={(e) => setClientInfo({ ...clientInfo, location: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Select your Office / Location / Plant Name</option>
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass}>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    className={inputClass}
                  />
                </div>

                {/* Property Address */}
                <div>
                  <label className={labelClass}>Property Address</label>
                  <input
                    type="text"
                    placeholder="Enter property address"
                    value={clientInfo.propertyAddress}
                    onChange={(e) =>
                      setClientInfo({ ...clientInfo, propertyAddress: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Required fields note */}
              <p className="mt-4 text-xs text-gray-400">
                Fields marked with <span className="text-red-500">*</span> are required before
                continuing.
              </p>
            </section>

            {/* Item Selector — only unlocked once required fields are filled */}
            <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-1">
                Please select the item from your site that requires Warranty / Replacement
              </h2>

              {!requiredComplete ? (
                <p className="mt-3 text-sm text-gray-400">
                  Complete the required fields above to select an item.
                </p>
              ) : !showItemSelector && items.length === 0 ? (
                <div className="mt-4">
                  <label className={labelClass}>Select Item</label>
                  <select
                    value={selectedItemId}
                    onChange={(e) => setSelectedItemId(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select Item</option>
                    {WARRANTY_ITEMS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.partNumber} - {item.name}
                      </option>
                    ))}
                  </select>

                  {/* Product preview card */}
                  {selectedProduct && (
                    <div className="mt-4 flex gap-4 border border-gray-200 rounded-xl p-4">
                      <div
                        className="flex-shrink-0 rounded-lg overflow-hidden border border-gray-200"
                        style={{ width: 96, height: 96 }}
                      >
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center gap-1">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {selectedProduct.partNumber}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">{selectedProduct.name}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {selectedProduct.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedProduct && (
                    <button
                      onClick={handleAddItem}
                      className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-medium text-white py-2.5 rounded-lg transition-colors"
                      style={{ backgroundColor: '#111827' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#374151')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111827')}
                    >
                      <Plus className="w-4 h-4" />
                      Add Item
                    </button>
                  )}
                </div>
              ) : (
                /* Subsequent items after the first has been added */
                <div className="mt-4 space-y-4">
                  <div>
                    <label className={labelClass}>Select Item</label>
                    <select
                      value={selectedItemId}
                      onChange={(e) => setSelectedItemId(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select Item</option>
                      {WARRANTY_ITEMS.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.partNumber} - {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Product preview card */}
                  {selectedProduct && (
                    <div className="flex gap-4 border border-gray-200 rounded-xl p-4">
                      <div
                        className="flex-shrink-0 rounded-lg overflow-hidden border border-gray-200"
                        style={{ width: 96, height: 96 }}
                      >
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center gap-1">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {selectedProduct.partNumber}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">{selectedProduct.name}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {selectedProduct.description}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowItemSelector(false)
                        setSelectedItemId('')
                      }}
                      className="flex-1 bg-gray-100 text-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    {selectedProduct && (
                      <button
                        onClick={handleAddItem}
                        className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-white py-2.5 rounded-lg transition-colors"
                        style={{ backgroundColor: '#111827' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#374151')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111827')}
                      >
                        <Plus className="w-4 h-4" />
                        Add Item
                      </button>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* Added items list */}
            {items.length > 0 && (
              <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Added Items</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <ProductDetailCard
                      key={item.id}
                      item={item}
                      onRemove={() => handleRemoveItem(item.id)}
                    />
                  ))}
                </div>

                {/* Add more items */}
                {!showItemSelector && (
                  <button
                    onClick={() => {
                      setShowItemSelector(true)
                      setSelectedItemId('')
                    }}
                    className="mt-5 w-full flex items-center justify-center gap-2 text-sm font-medium border border-dashed border-gray-300 text-gray-600 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add more items
                  </button>
                )}
              </section>
            )}
          </div>

          {/* ── Right column — sticky summary ───────────── */}
          <div>
            <ItemSummary items={items} onPreview={handlePreview} />
          </div>
        </div>
      </div>
    </div>
  )
}
