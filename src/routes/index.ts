import { Router } from 'express'

import { shopRoutes } from '../modules/shop/v1/routes'

const baseRouter = Router()

baseRouter.use('/v1/shop', shopRoutes)

export default baseRouter
