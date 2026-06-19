export interface SignDimensions {
  h: string
  w: string
  d: string
}

export interface SignItem {
  id: string
  name: string
  code: string
  dimensions: SignDimensions
  illumination: boolean
  backerNeeded: boolean
  quantity: number
  visualImage: string
  implImage: string
}

export interface OrderItem {
  id: string
  sign: SignItem
  warrantyDescription: string
}

export interface ClientInfo {
  fullName: string
  location: string
  email: string
  propertyAddress: string
}
