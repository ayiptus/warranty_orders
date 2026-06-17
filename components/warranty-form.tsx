'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product, OrderItem, ClientInfo } from '@/lib/types'
import { PRODUCTS_BY_CATEGORY, CATEGORIES } from '@/lib/constants'
import { ProductDetailCard } from '@/components/product-detail-card'
import { ItemSummary } from '@/components/item-summary'
import { ChevronLeft, Plus } from 'lucide-react'

export function WarrantyForm() {
  const router = useRouter()
  const [items, setItems] = useState<OrderItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [showProductSelector, setShowProductSelector] = useState(false)

  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
  })

  const [formData, setFormData] = useState({
    quantity: 1,
    serialNumber: '',
    notes: '',
  })

  const handleAddItem = (product: Product) => {
    const newItem: OrderItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      quantity: formData.quantity,
      serialNumber: formData.serialNumber,
      notes: formData.notes,
    }
    setItems([...items, newItem])
    setFormData({ quantity: 1, serialNumber: '', notes: '' })
    setShowProductSelector(false)
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handlePreview = () => {
    console.log('Preview Request:', { clientInfo, items })
    alert('Request preview would be shown here. Check console for details.')
  }

  const handleBackHome = () => {
    router.push('/')
  }

  const availableProducts = selectedCategory
    ? PRODUCTS_BY_CATEGORY[selectedCategory as keyof typeof PRODUCTS_BY_CATEGORY] || []
    : []

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <button
          onClick={handleBackHome}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">Warranty Request Form</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Information */}
            <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Client Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={clientInfo.firstName}
                  onChange={(e) => setClientInfo({ ...clientInfo, firstName: e.target.value })}
                  className="col-span-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={clientInfo.lastName}
                  onChange={(e) => setClientInfo({ ...clientInfo, lastName: e.target.value })}
                  className="col-span-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  className="col-span-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={clientInfo.company}
                  onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
                  className="col-span-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                  className="col-span-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
            </section>

            {/* Product Selection */}
            <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Add Products</h2>

              {!showProductSelector ? (
                <button
                  onClick={() => setShowProductSelector(true)}
                  className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white py-2.5 rounded-lg transition-colors"
                  style={{ backgroundColor: '#111827' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#374151')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111827')}
                >
                  <Plus className="w-4 h-4" />
                  Add Product Item
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1.5">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      <option value="">Select Category...</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedCategory && (
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1.5">
                        Product
                      </label>
                      <select
                        onChange={(e) => {
                          const product = availableProducts.find((p) => p.id === e.target.value)
                          if (product) {
                            handleAddItem(product)
                          }
                        }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        defaultValue=""
                      >
                        <option value="">Select Product...</option>
                        {availableProducts.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name} ({product.partNumber})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1.5">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })
                        }
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1.5">
                        Serial Number
                      </label>
                      <input
                        type="text"
                        value={formData.serialNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, serialNumber: e.target.value })
                        }
                        placeholder="SN-12345"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1.5">
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Additional details about this item..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-24 resize-none"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowProductSelector(false)}
                      className="flex-1 bg-gray-100 text-gray-700 text-sm font-medium py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* Added Items */}
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
              </section>
            )}
          </div>

          {/* Right Column - Summary Sidebar */}
          <div>
            <ItemSummary items={items} onPreview={handlePreview} />
          </div>
        </div>
      </div>
    </div>
  )
}
