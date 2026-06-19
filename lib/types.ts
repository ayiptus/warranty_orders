export interface Product {
  id: string
  name: string
  partNumber: string
  category: string
  description: string
  image?: string
}

export interface OrderItem {
  id: string
  product: Product
  quantity: number
  serialNumber: string
  notes: string
}

export interface ClientInfo {
  fullName: string
  location: string
  email: string
  propertyAddress: string
}
