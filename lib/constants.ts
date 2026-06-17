import { Product, ProductCategory } from './types'

export const PRODUCTS_BY_CATEGORY: Record<ProductCategory, Product[]> = {
  Exterior: [
    { id: '1', name: 'Weather Seal Gasket', category: 'Exterior', partNumber: 'WS-2024' },
    { id: '2', name: 'Outdoor Connector', category: 'Exterior', partNumber: 'OC-1500' },
    { id: '3', name: 'Protective Enclosure', category: 'Exterior', partNumber: 'PE-3000' },
  ],
  Interior: [
    { id: '4', name: 'Internal Cable Assembly', category: 'Interior', partNumber: 'ICA-500' },
    { id: '5', name: 'Control Panel Module', category: 'Interior', partNumber: 'CPM-200' },
    { id: '6', name: 'Signal Processor Unit', category: 'Interior', partNumber: 'SPU-750' },
  ],
  Warranty: [
    { id: '7', name: 'Extended Warranty Package', category: 'Warranty', partNumber: 'EW-1YR' },
    { id: '8', name: 'Premium Support Plan', category: 'Warranty', partNumber: 'PSP-2YR' },
    { id: '9', name: 'Maintenance Agreement', category: 'Warranty', partNumber: 'MA-5YR' },
  ],
}

export const CATEGORIES: ProductCategory[] = ['Exterior', 'Interior', 'Warranty']
