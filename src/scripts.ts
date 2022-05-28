const FAKE_PRODUCTS = require('src/modules/shop/v1/data/fakeData')
const Product = require('src/modules/shop/v1/models')

const populateProducts = async () => {
  await Product.insertMany(FAKE_PRODUCTS)
}
