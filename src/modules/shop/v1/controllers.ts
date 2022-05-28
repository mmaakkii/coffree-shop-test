import { NextFunction, Request, Response } from 'express'

import { Customer, Order, Product } from './models'
import { ECategories, EDiscountType } from './types'
import { getEnumKeyByEnumValue } from './utils'
import { createOrderSchema, createProductSchema } from './validators'

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  /*
    payload = {
        name: 'Espresso',
        image: 'http://image-url',
        price: 5.5,
        tax: 0.5,
        discountType: 'free',
        discountCategory: 'cookies',
        discount: 0,
        category: beverages,
      }
  */
  try {
    const { body } = req
    const isValid = createProductSchema.validate(body)

    if (isValid.error) {
      res.status(400).json({
        success: false,
        error: isValid.error.message,
      })
      next()
    }
    const newProduct = await Product.create(body)
    res.status(201).json({
      success: true,
      doc: newProduct,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.response,
    })
  }
}

export const productList = async (req: Request, res: Response) => {
  try {
    const products = await Product.find()
    res.status(200).json({
      success: true,
      products,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.response,
    })
  }
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  /*
    payload = {
      "items": ["6290ecfc0d392fde3576b9aa", "62920b5d6bc5d674c622bd22"],
      "customer": {
          "firstName": "ABC",
          "emailAddress": "test@test.com",
          "contactNumber": "9761182636"
      },
      "waitingTime": 15
    }
  */

  try {
    const { body } = req
    const isValid = createOrderSchema.validate(body)

    if (isValid.error) {
      res.status(400).json({
        success: false,
        error: isValid.error.message,
      })
      next()
    }

    const { customer, items, waitingTime } = body

    const existingCustomer = await Customer.find({ contactNumber: customer.contactNumber })
    let customerId: string

    // Creating a customer only if it doesn't exists on our database.
    if (existingCustomer.length) {
      customerId = existingCustomer[0]._id
    } else {
      const newCustomer = await Customer.create(customer)
      customerId = newCustomer._id
    }

    const orderItems = await Product.find({ _id: { $in: items } })

    // Filtering the products with discount, currently works only with free products.
    const applicableDiscounts = orderItems.filter(
      ({ discountType }) => discountType === EDiscountType.FREE
    )
    let discountedItems = []
    if (applicableDiscounts.length) {
      const discountedItemCounter = {}

      applicableDiscounts.forEach((item) => {
        const category = item['discountCategory']
        discountedItemCounter[category] = discountedItemCounter[category] + 1 || 1
      })

      const discountedCategories = Object.keys(discountedItemCounter)

      const promises = discountedCategories.map((item) => {
        const category: any = getEnumKeyByEnumValue(ECategories, item)
        return Product.find({ category: ECategories[category] })
          .sort({ price: 1 })
          .limit(1)
          .then((results) => discountedItems.push(...results))
      })
      await Promise.all(promises)
    }
    discountedItems = discountedItems.map(({ name, category }) => ({
      name,
      category,
      price: 0,
    }))

    const itemTotal = orderItems.reduce((acc, { price }) => {
      return acc + price
    }, 0)

    const taxTotal = orderItems.reduce((acc, { tax }) => {
      return acc + tax
    }, 0)

    const parsedOrderItems = orderItems.map(({ name, price, category }) => ({
      name,
      price,
      category,
    }))

    const orderTotal = itemTotal + taxTotal

    const createOrderPayload = {
      customer: customerId,
      items: [...parsedOrderItems, ...discountedItems],
      itemTotal,
      waitingTime,
      orderTotal,
      tax: taxTotal,
    }
    const newOrder = await (await Order.create(createOrderPayload)).populate('customer')

    res.status(201).json({
      success: true,
      order: newOrder,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    })
  }
}

// When the user make the payment, this api will mark the order as paid
export const markOrderAsPaid = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params
    await Order.findByIdAndUpdate(orderId, { isPaid: true })
    res.status(200).json({
      success: true,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    })
  }
}
