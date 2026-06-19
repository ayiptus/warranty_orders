'use client'

import { useRouter } from 'next/navigation'
import { BeldenLogo } from '@/components/belden-logo'
import { ModulexLogo } from '@/components/modulex-logo'

const DEMO_IMG = '/images/chicago-demo.png'

interface CardDef {
  title: string
  description: string
  image: string
  alt: string
  buttonLabel: string
  buttonAction: 'coming-soon' | 'navigate'
  href?: string
}

const CARDS: CardDef[] = [
  {
    title: 'Warranty Request',
    description: 'Existing signs that require repair or replacement',
    image: DEMO_IMG,
    alt: 'Belden warranty request signage',
    buttonLabel: 'Configure Warranty Request',
    buttonAction: 'navigate',
    href: '/warranty',
  },
  {
    title: 'Exterior Signs',
    description: 'New signs defined for exterior use in the Brand Guidelines',
    image: DEMO_IMG,
    alt: 'Belden exterior building sign',
    buttonLabel: 'Coming Soon',
    buttonAction: 'coming-soon',
  },
  {
    title: 'Interior Signs',
    description: 'New signs defined for interior use in the Brand Guidelines',
    image: DEMO_IMG,
    alt: 'Belden interior lobby sign',
    buttonLabel: 'Coming Soon',
    buttonAction: 'coming-soon',
  },
]

export function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="flex flex-col items-center pt-10 pb-8 px-4">
        <BeldenLogo width={160} />
        <div className="mt-4 w-72 h-px bg-gray-200" />
        <div className="mt-4">
          <ModulexLogo width={130} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-16">
        {/* Page heading */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Request for Quote / Order</h1>
          <p className="mt-1 text-sm text-gray-500">
            Select your signage category to begin configuring your request
          </p>
          <button className="mt-2 text-sm text-gray-500 underline underline-offset-2 hover:text-gray-800 transition-colors">
            How to place an Order
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center p-7"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
            >
              {/* Circular image */}
              <div
                className="mb-5 rounded-full overflow-hidden border border-gray-200 flex-shrink-0"
                style={{ width: 140, height: 140 }}
              >
                <img
                  src={card.image}
                  alt={card.alt}
                  style={{ width: 140, height: 140, objectFit: 'cover' }}
                />
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-2 text-center">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] text-gray-500 text-center leading-relaxed mb-6 flex-1">
                {card.description}
              </p>

              {/* Button */}
              {card.buttonAction === 'coming-soon' ? (
                <button
                  disabled
                  className="w-full py-2.5 rounded-lg text-sm font-medium text-white cursor-not-allowed"
                  style={{ backgroundColor: '#9CA3AF' }}
                >
                  {card.buttonLabel}
                </button>
              ) : (
                <button
                  onClick={() => router.push(card.href!)}
                  className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
                  style={{ backgroundColor: '#111827' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#374151')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111827')}
                >
                  {card.buttonLabel}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-10 bg-gray-50 border border-gray-200 rounded-xl px-6 py-5">
          <p className="text-sm font-semibold text-gray-800 mb-2">Important Notice</p>
          <ul className="text-sm text-gray-600 leading-relaxed space-y-1 list-none">
            <li>This estimate is provided as a preliminary budget based on the products requested.</li>
            <li>Prices do not include installation or logistics.</li>
            <li>A site survey is required to confirm the scope and generate an official quotation.</li>
            <li>Custom products require additional review and pricing before inclusion in the budget.</li>
            <li>The amounts shown should be considered a wish list or estimate only. A formal quote will be issued once the survey project is completed.</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
