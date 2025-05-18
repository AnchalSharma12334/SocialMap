import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/create-order', async (req: Request, res: Response) => {
  try {
    const { order_amount, customer_details } = req.body;

    const orderData = {
      order_amount,
      order_currency: 'INR',
      customer_details,
      order_meta: {
        return_url: 'https://social-map-gamma.vercel.app/payment-status?order_id={order_id}',
      },
    };

    const response = await axios.post(
      'https://sandbox.cashfree.com/pg/orders',
      orderData,
      {
        headers: {
          'x-client-id': process.env.CASHFREE_APP_ID!,
          'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
          'x-api-version': '2022-09-01',
          'Content-Type': 'application/json',
        }
      }
    );

    res.json({ payment_session_id: response.data.payment_session_id });
  } catch (error: any) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: 'Order creation failed' });
  }
});

export default router;
