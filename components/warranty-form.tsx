'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ClientInfo, OrderItem, SignItem } from '@/lib/types'
import { LOCATIONS, SIGNS_BY_LOCATION } from '@/lib/constants'
import { SignDetailCard } from '@/components/sign-detail-card'
import { ItemSummary } from '@/components/item-summary'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Belden sites address mapping
const BELDEN_SITES: Record<string, string> = {
  'Cobourg': '130 Willmott Street, Cobourg, Ontario, K9A 4M3, Canada',
  'Montreal': '2600 Alfred-Nobel Blvd, St-Laurent, QC, H4S 2B4, Canada',
  'Nogales': 'Ave. de los Nogales # 290, Fracc. San Carlos, Nogales, Sonora, Mexico',
  'Tijuana': 'Blvd. Insurgentes # 8272 Col. Libramiento, Tijuana, Baja California, Mexico',
  'Chicago': '8420 W Bryn Mawr Ave., Suite 1030, Chicago, IL, 60631, USA',
  'Cornelius': '10855 Bailey Rd, Ste 300, Cornelius, NC, 28031, USA',
  'Indianapolis': '1320 City Center Drive, Suite 100, Carmel, IN, 46032, USA',
  'Richmond I': '2200 U.S. Highway 27 South, Richmond, IN, 47374, USA',
  'Richmond II': '1411 NW 11th St, Richmond, IN, 47374, USA',
  'Richmond III': '350 N.W. N Street, Richmond, IN, 47374, USA',
  'Santa Clara': '2953 Bunker Hill Lane, Santa Clara, CA, 95054, USA',
  'St. Louis': '1 N. Brentwood Blvd. 15th Floor, St. Louis, MO, 63105, USA',
  'Tucson': '3610 E. Valencia Road, Tucson, AZ, 85756, USA',
  'Shanghai': '900 Yishan Rd, Xuhui District, Shanghai, 200233, China',
  'Pune Phase 1': 'Plot No. D-228/1, Chakan MIDC Phase II, Village Bhamboli, Taluka Khed, District Pune, Maharashtra, 410507, India',
}

const REQUIRED_FIELDS: (keyof ClientInfo)[] = ['fullName', 'location', 'email']

const inputClass =
  'w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'

const labelClass = 'block text-xs font-medium text-gray-600 mb-1.5'

export function WarrantyForm() {
  const router = useRouter()

  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    fullName: '',
    location: '',
    email: '',
    propertyAddress: '',
  })

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ClientInfo, string>>>({})
  const [items, setItems] = useState<OrderItem[]>([])
  const [itemDescriptions, setItemDescriptions] = useState<Record<string, string>>({})
  const [showSelector, setShowSelector] = useState(false)
  const [selectedSignId, setSelectedSignId] = useState('')

  const requiredComplete = REQUIRED_FIELDS.every((f) => clientInfo[f].trim() !== '')

  const locationSigns: SignItem[] = SIGNS_BY_LOCATION[clientInfo.location] ?? []

  const selectedSign = locationSigns.find((s) => s.id === selectedSignId) ?? null

  const validateRequired = () => {
    const errors: Partial<Record<keyof ClientInfo, string>> = {}
    REQUIRED_FIELDS.forEach((f) => {
      if (!clientInfo[f].trim()) errors[f] = 'This field is required'
    })
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleConfirmItem = () => {
    if (!selectedSign) return
    const uid = `${selectedSign.id}-${Date.now()}`
    setItems((prev) => [...prev, { id: uid, sign: selectedSign, warrantyDescription: '' }])
    setItemDescriptions((prev) => ({ ...prev, [uid]: '' }))
    setSelectedSignId('')
    setShowSelector(false)
  }

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    setItemDescriptions((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const handleDescriptionChange = (id: string, value: string) => {
    setItemDescriptions((prev) => ({ ...prev, [id]: value }))
  }

  const handleSendRequest = () => {
    if (!validateRequired()) return
    alert('Request submitted! Modulex will be in touch.')
  }

  const handleSelectItemClick = () => {
    if (!validateRequired()) return
    setShowSelector(true)
    setSelectedSignId('')
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top nav bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between py-3">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </button>

          {/* Tab switcher */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
            {['Warranty Request', 'Exterior Signs', 'Interior Signs'].map((tab) => (
              <button
                key={tab}
                className="px-4 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={
                  tab === 'Warranty Request'
                    ? { backgroundColor: '#111827', color: '#fff' }
                    : { color: '#6b7280' }
                }
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Spacer to balance the back button */}
          <div className="w-24" />
        </div>
      </div>

      {/* Logos */}
      <header className="flex flex-col items-center pt-8 pb-6 px-4 border-b border-gray-100">
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
            Belden &mdash; Modulex
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Request for Warranty / Replacement</h1>
          <p className="mt-1 text-sm text-gray-500">
            Select your signage product or service required
          </p>
          <button className="mt-1 text-sm text-gray-400 underline underline-offset-2 hover:text-gray-700 transition-colors">
            How to place an Order
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left column ──────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Client & Project Information */}
            <section
              className="bg-white border border-gray-200 rounded-xl p-6"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
            >
              <h2 className="text-base font-semibold text-gray-900 mb-5">
                Client &amp; Project Information
              </h2>

              {/* 2×2 grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className={labelClass}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={clientInfo.fullName}
                    onChange={(e) => {
                      setClientInfo({ ...clientInfo, fullName: e.target.value })
                      if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: undefined })
                    }}
                    className={`${inputClass} ${fieldErrors.fullName ? 'border-red-400 focus:ring-red-300' : ''}`}
                  />
                  {fieldErrors.fullName && (
                    <p className="mt-1 text-xs text-red-500">{fieldErrors.fullName}</p>
                  )}
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
                    onChange={(e) => {
                      setClientInfo({ ...clientInfo, email: e.target.value })
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined })
                    }}
                    className={`${inputClass} ${fieldErrors.email ? 'border-red-400 focus:ring-red-300' : ''}`}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>
                  )}
                </div>

                {/* Office / Location */}
                <div>
                  <label className={labelClass}>
                    Office / Location / Plant Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={clientInfo.location}
                    onChange={(e) => {
                      const newLocation = e.target.value
                      const newAddress = BELDEN_SITES[newLocation] || ''
                      setClientInfo({ ...clientInfo, location: newLocation, propertyAddress: newAddress })
                      if (fieldErrors.location) setFieldErrors({ ...fieldErrors, location: undefined })
                      // Reset sign selector when location changes
                      setShowSelector(false)
                      setSelectedSignId('')
                      setItems([])
                      setItemDescriptions({})
                    }}
                    className={`${inputClass} ${fieldErrors.location ? 'border-red-400 focus:ring-red-300' : ''}`}
                  >
                    <option value="">Select your Office / Location / Plant Name</option>
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.location && (
                    <p className="mt-1 text-xs text-red-500">{fieldErrors.location}</p>
                  )}
                </div>

                {/* Property Address */}
                <div>
                  <label className={labelClass}>Property Address</label>
                  <input
                    type="text"
                    placeholder="Enter property address"
                    value={clientInfo.propertyAddress}
                    onChange={(e) => setClientInfo({ ...clientInfo, propertyAddress: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-400">
                Fields marked <span className="text-red-500">*</span> are required before continuing.
              </p>
            </section>

            {/* Sign selector heading */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                Please select the item from your site that requires Warranty / Replacement
              </p>

              {/* "Select item" pill button */}
              {!showSelector && (
                <button
                  onClick={handleSelectItemClick}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors"
                  style={{ backgroundColor: '#111827' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#374151')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111827')}
                >
                  Select item
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {/* Dropdown when open */}
              {showSelector && (
                <div
                  className="bg-white border border-gray-200 rounded-xl p-4 space-y-3"
                  style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
                >
                  {locationSigns.length === 0 ? (
                    <p className="text-sm text-gray-400 italic">
                      Sign list not yet available for this location.
                    </p>
                  ) : (
                    <select
                      value={selectedSignId}
                      onChange={(e) => setSelectedSignId(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select item...</option>
                      {locationSigns.map((sign) => (
                        <option key={sign.id} value={sign.id}>
                          {sign.id} - {sign.name}
                        </option>
                      ))}
                    </select>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => { setShowSelector(false); setSelectedSignId('') }}
                      className="flex-1 bg-gray-100 text-gray-700 text-sm font-medium py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    {selectedSign && (
                      <button
                        onClick={handleConfirmItem}
                        className="flex-1 text-white text-sm font-medium py-2 rounded-lg transition-colors"
                        style={{ backgroundColor: '#111827' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#374151')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111827')}
                      >
                        Add Item
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Added sign detail cards */}
            {items.length > 0 && (
              <div className="space-y-6">
                {items.map((item) => (
                  <SignDetailCard
                    key={item.id}
                    item={item}
                    warrantyDescription={itemDescriptions[item.id] ?? ''}
                    onDescriptionChange={(val) => handleDescriptionChange(item.id, val)}
                    onRemove={() => handleRemoveItem(item.id)}
                  />
                ))}

                {/* Add more items */}
                {!showSelector && (
                  <button
                    onClick={() => { setShowSelector(true); setSelectedSignId('') }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors"
                    style={{ backgroundColor: '#111827' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#374151')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111827')}
                  >
                    Add more items
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ── Right column — sticky summary ─────── */}
          <div>
            <ItemSummary
              items={items}
              onSend={handleSendRequest}
              allDescriptionsFilled={items.length > 0 && items.every((item) => (itemDescriptions[item.id] ?? '').trim() !== '')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
