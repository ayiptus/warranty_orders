export type ProductCategory = 'Exterior' | 'Interior' | 'Warranty'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  partNumber: string
}

export interface OrderItem {
  id: string
  product: Product
  quantity: number
  serialNumber: string
  notes: string
}

export interface ClientInfo {
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
}
