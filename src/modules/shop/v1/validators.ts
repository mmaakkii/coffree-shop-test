import Joi from 'joi'
import { ECategories, EDiscountType } from './types'

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string(),
  price: Joi.number().positive().required(),
  tax: Joi.number().positive().required(),
  discountType: Joi.string().valid(...Object.values(EDiscountType)),
  discountCategory: Joi.string().valid(...Object.values(ECategories)),
  category: Joi.string()
    .valid(...Object.values(ECategories))
    .required(),
})

export const createOrderSchema = Joi.object({
  customer: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    emailAddress: Joi.string().email(),
    contactNumber: Joi.string().required(),
  }),
  items: Joi.array().required(),
  waitingTime: Joi.number().positive().required(),
})
