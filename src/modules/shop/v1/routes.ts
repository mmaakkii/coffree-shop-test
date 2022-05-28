import { Router } from 'express'
import { createOrder, createProduct, markOrderAsPaid, productList } from './controllers'

const shopRoutes = Router()

shopRoutes.route('/products').get(productList).post(createProduct)
shopRoutes.post('/orders', createOrder)
shopRoutes.get('/orders/:orderId/pay', markOrderAsPaid)

export { shopRoutes }
