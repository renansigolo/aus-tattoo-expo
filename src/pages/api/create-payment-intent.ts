import { NextApiRequest, NextApiResponse } from "next"
import { Stripe } from "stripe"

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
  apiVersion: "2022-11-15",
  typescript: true,
})

// const calculateOrderAmount = (items: any) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { items } = req.body

  const product = await stripe.products.retrieve(items[0].id)
  const price = await stripe.prices.retrieve(String(product.default_price))

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(price.unit_amount),
    currency: "aud",
    automatic_payment_methods: {
      enabled: true,
    },
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
}
