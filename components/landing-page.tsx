'use client'

import { useRouter } from 'next/navigation'
import { BeldenLogo } from '@/components/belden-logo'
import { ModulexLogo } from '@/components/modulex-logo'

interface CardDef {
  title: string
  image: string
  alt: string
  bullets: string[]
  buttonLabel: string
  buttonAction: 'coming-soon' | 'navigate'
}

const CARDS: CardDef[] = [
  {
    title: 'Exterior Signs',
    image: '/images/exterior-sign.jpg',
    alt: 'Belden exterior building sign with channel letters on a gray facade',
    bullets: [
      'Channel letters & dimensional signs',
      'Monument & pylon signs',
      'Illuminated cabinet signs',
      'Wayfinding & directional',
    ],
    buttonLabel: 'Coming Soon',
    buttonAction: 'coming-soon',
  },
  {
    title: 'Interior Signs',
    image: '/images/interior-sign.jpg',
    alt: 'Large chrome purple Belden B logomark mounted on a dark navy wall',
    bullets: [
      'Lobby & reception signage',
      'Dimensional wall letters',
      'ADA compliant signage',
      'Directional & suite signs',
    ],
    buttonLabel: 'Coming Soon',
    buttonAction: 'coming-soon',
  },
  {
    title: 'Warranty Request',
    image: '/images/interior-sign.jpg',
    alt: 'Belden interior signage representing warranty coverage',
    bullets: [
      'Submit warranty claims online',
      'Track request status',
      'Attach supporting documents',
      'Receive confirmation quickly',
    ],
    buttonLabel: 'Configure Warranty Request',
    buttonAction: 'navigate',
  },
]

export function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="flex flex-col items-center pt-12 pb-8 px-4">
        <BeldenLogo width={160} />
        <div className="mt-4 w-[280px] h-px bg-gray-200" />
        <div className="mt-4">
          <ModulexLogo width={130} />
        </div>
      </header>

      {/* Important Notice */}
      <div className="max-w-4xl mx-auto px-4 mb-10">
        <div className="bg-gray-100 rounded-lg px-6 py-4 text-sm text-gray-700 leading-relaxed">
          <span className="font-semibold">Important Notice:</span> This warranty ordering tool is
          intended for use by authorised Belden partners and distributors only. All warranty
          requests are subject to review and approval. Please ensure all submitted information is
          accurate and complete before submission.
        </div>
      </div>

      {/* Cards */}
      <main className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center p-7"
            >
              {/* Circular image */}
              <div
                className="mb-5 rounded-full overflow-hidden shadow-md border border-gray-300 flex-shrink-0"
                style={{ width: 140, height: 140 }}
              >
                <img
                  src={card.image}
                  alt={card.alt}
                  style={{ width: 140, height: 140, objectFit: 'cover' }}
                />
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-3 text-center">{card.title}</h3>

              {/* Bullet list */}
              <ul className="mb-6 space-y-1 w-full text-center">
                {card.bullets.map((b) => (
                  <li key={b} className="text-[13px] text-gray-600">
                    {b}
                  </li>
                ))}
              </ul>

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
                  onClick={() => router.push('/warranty')}
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
      </main>
    </div>
  )
}
