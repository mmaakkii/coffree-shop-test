import { Document, Model, ObjectId, SchemaDefinition } from 'mongoose'

export enum ECategories {
  BEVERAGES = 'beverages',
  SNACKS = 'snacks',
  COOKIES = 'cookies',
}

export enum EDiscountType {
  FREE = 'free',
  DISCOUNT = 'discount',
  NONE = 'none',
}

export interface ICustomer {
  firstName: string
  lastName?: string | null
  emailAddress?: string | null
  contactNumber: string
  isActive: boolean
  isAdmin: boolean
  isStaff: boolean
  isDeleted: boolean
}

export interface IProduct {
  name: string
  image: string
  price: number
  tax: number
  discountType: EDiscountType
  discountCategory: ECategories
  discount: number
  category: ECategories
}

export interface IOrderItem extends Partial<IProduct> {
  quantity: number
}
export interface IOrder {
  customer: ICustomer
  items: Array<Partial<IProduct>>
  itemTotal: number
  tax: number
  orderTotal: number
  isPaid: boolean
  waitingTime: number
  isReady: boolean
}

export type CustomerSchemaDefinition = SchemaDefinition<ICustomer>
export type ProductSchemaDefinition = SchemaDefinition<IProduct>
export type OrderSchemaDefinition = SchemaDefinition<IOrder>

export interface ICustomerDocument extends ICustomer, Document {}
export interface IProductDocument extends IProduct, Document {}
export interface IOrderDocument extends IOrder, Document {}

export interface ICustomerModel extends Model<ICustomerDocument> {}
export interface IProductModel extends Model<IProductDocument> {}
export interface IOrderModel extends Model<IOrderDocument> {}
