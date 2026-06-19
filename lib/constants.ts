import { Product } from './types'

export const LOCATIONS = [
  'Cobourg',
  'Montreal',
  'Nogales',
  'Tijuana',
  'Chicago',
]

export const WARRANTY_ITEMS: Product[] = [
  {
    id: 'EX-002',
    name: 'Channel Letters',
    partNumber: 'EX-002',
    category: 'Exterior',
    description: 'Exterior illuminated channel letter sign set mounted on building facade.',
    image: '/images/exterior-sign.jpg',
  },
  {
    id: 'IN-001',
    name: 'Reception Letters',
    partNumber: 'IN-001',
    category: 'Interior',
    description: 'Dimensional reception area letters for lobby or front desk installations.',
    image: '/images/interior-sign.jpg',
  },
  {
    id: 'IN-004',
    name: 'Room ID Insert',
    partNumber: 'IN-004',
    category: 'Interior',
    description: 'Replaceable insert panel for room identification signage systems.',
    image: '/images/interior-sign.jpg',
  },
  {
    id: 'IN-008',
    name: 'Room ID',
    partNumber: 'IN-008',
    category: 'Interior',
    description: 'Standard room identification sign with ADA-compliant braille.',
    image: '/images/interior-sign.jpg',
  },
  {
    id: 'IN-009',
    name: 'Room ID',
    partNumber: 'IN-009',
    category: 'Interior',
    description: 'Room identification sign — alternate mounting configuration.',
    image: '/images/interior-sign.jpg',
  },
  {
    id: 'IN-010',
    name: 'Room ID',
    partNumber: 'IN-010',
    category: 'Interior',
    description: 'Room identification sign with illuminated edge detail.',
    image: '/images/interior-sign.jpg',
  },
  {
    id: 'IN-011',
    name: 'Room ID Insert',
    partNumber: 'IN-011',
    category: 'Interior',
    description: 'Replaceable insert panel — large format room identification.',
    image: '/images/interior-sign.jpg',
  },
]

// Legacy aliases kept for ProductDetailCard / ItemSummary compatibility
export const CATEGORIES = ['Exterior', 'Interior']
export const PRODUCTS_BY_CATEGORY: Record<string, Product[]> = {
  Exterior: WARRANTY_ITEMS.filter((p) => p.category === 'Exterior'),
  Interior: WARRANTY_ITEMS.filter((p) => p.category === 'Interior'),
}
