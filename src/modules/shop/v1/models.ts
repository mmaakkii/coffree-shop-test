import { model, Schema } from 'mongoose'
import {
  ECategories,
  EDiscountType,
  ICustomerDocument,
  ICustomerModel,
  IOrderDocument,
  IOrderModel,
  IProductDocument,
  IProductModel,
} from './types'

const CustomerSchema = new Schema<ICustomerDocument, ICustomerModel>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    emailAddress: {
      type: String,
      required: true,
      index: true,
      unique: true,
      lowercase: true,
      dropDups: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      select: false,
    },
    isStaff: {
      type: Boolean,
      default: false,
      select: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

const ProductSchema = new Schema<IProductDocument, IProductModel>(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,
    price: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    discountType: {
      type: String,
      enum: EDiscountType,
    },
    discountCategory: {
      type: String,
      enum: ECategories,
    },
    discount: Number,
    category: {
      type: String,
      enum: ECategories,
    },
  },
  {
    timestamps: true,
  }
)

const OrderSchema = new Schema<IOrderDocument, IOrderModel>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    items: [
      {
        name: String,
        price: Number,
        category: String,
      },
    ],
    itemTotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    orderTotal: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    waitingTime: {
      type: Number,
      required: true,
    },
    isReady: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export const Customer = model<ICustomerDocument, ICustomerModel>('Customer', CustomerSchema)
export const Product = model<IProductDocument, IProductModel>('Product', ProductSchema)
export const Order = model<IOrderDocument, IOrderModel>('Order', OrderSchema)
