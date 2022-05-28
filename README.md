## Getting Started

- `npm install`
- `npm run start:dev`

## Endpoints

- `POST - localhost:5001/api/v1/shop/products`

  ```
  {
    name: 'Espresso',
    image: 'http://image-url',
    price: 5.5,
    tax: 0.5,
    discountType: 'free',
    discountCategory: 'cookies',
    discount: 0,
    category: beverages
  }

  ```

- `GET - localhost:5001/api/v1/shop/products`
- `POST - localhost:5001/api/v1/shop/orders`
  ```
  {
    "items": ["6290ecfc0d392fde3576b9aa", "62920b5d6bc5d674c622bd22"],
      "customer": {
          "firstName": "ABC",
          "emailAddress": "test@test.com",
          "contactNumber": "9761182636"
      },
      "waitingTime": 15
  }
  ```
- `POST - localhost:5001/api/v1/shop/orders/:orderId/pay` -
