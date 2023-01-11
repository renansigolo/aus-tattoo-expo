import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { item } = req.body

    try {
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        mode: "payment",
        metadata: {
          images: item.images[0],
        },
        line_items: [
          {
            price_data: {
              currency: "aud",
              product_data: {
                images: [item.images[0]],
                name: item.name,
              },
              unit_amount: item.price * 100, // to convert into cents
            },
            quantity: item.quantity,
          },
        ],
        success_url: `${req.headers.origin}/shop/booths?status=success&session_id={CHECKOUT_SESSION_ID}#info-pack`,
        cancel_url: `${req.headers.origin}/shop/booths?status=cancelled#payment`,
      }
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params)

      res.status(200).json(checkoutSession)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error"
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
