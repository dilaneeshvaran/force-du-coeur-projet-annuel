import { Request, Response } from 'express';
import { Payment } from '../models';
import stripe from 'stripe';
import { IncomingMessage } from 'http';
import { updateMembershipDetails } from './memberships';
require('dotenv').config()

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});


export const handleWebhook = async (req: any, res: Response) => {
  
  const payload = req.body;
  console.log("Payload: ", typeof payload)
  const sig: any = req.headers["stripe-signature"]

  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET!
  console.log("Endpoint secret: ", endpointSecret)
  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret
    )

    console.log("Event: ", event)
    if (event.type === "checkout.session.completed") {
      console.log("Session completed successfully")
    }
  } catch (err: any) {
    console.error(err)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Process the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as stripe.Checkout.Session;

    if (session.metadata) { 
      const membershipId = session.metadata.membershipId;
      console.log(":::::::::::metzdaya", session.metadata);

      let type = 'donation';
    if (session.mode === 'subscription') {
      type = 'membership';
    }    




      if (membershipId) {

        try {
          const newPayment = await Payment.create({
            user_id: Number(session.metadata.userId),
            stripe_payment_intent_id: session.payment_intent,
            stripe_customer_id: session.customer,
            amount: session.amount_total ? session.amount_total / 100 : undefined, //cents to dollars
            type: type,
            datePaiement: new Date(),
            typeId: membershipId
          });
          console.log("Payment record created successfully");
        } catch (error) {
          console.error("Error creating payment record: ", error);
        }

        console.log("Membership ID found:", membershipId);
        const updateParams = {
          amount: session.amount_total ? session.amount_total / 100 : undefined, //cents to dollars
          paymentDate: new Date(),
          status: 'active',
          userId: Number(session.metadata.userId),
        };
        console.log("::::::::::::Updating membership details::::::::::::");
        await updateMembershipDetails(membershipId, updateParams);
      } else {
        console.error('Membership ID is missing');
      }
    } else {
      console.error('Session metadata is null');
    }
  }
  res.status(200).end()
};

export const processPayment = async (req: Request, res: Response) => {
  try {
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Membership',
            },
            unit_amount: req.body.amount * 100, //cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/espaceMembres',
      cancel_url: 'http://localhost:5173/espaceMembres',
      metadata: {
        userId: req.body.userId,
        membershipId: req.body.membershipId,
        amount: req.body.amount,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating checkout session" });
  }
};

export const processMembership = async (req: Request, res: Response) => {
  try {
    const priceIdMap = {
      10: 'price_1PT55qGc0PhuZBe9pQAMVC5K',
      30: 'price_1PT524Gc0PhuZBe9P4aSkGZ1',
      50: 'price_1PT55VGc0PhuZBe9K1bSAwKu',
      100: 'price_1PT56AGc0PhuZBe9dPGecJRj',
    };

    const amount = req.body.amount as keyof typeof priceIdMap;

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceIdMap[amount], 
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'http://localhost:5173/espaceMembres?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/espaceMembres',
      metadata: {
        userId: req.body.userId,
        membershipId: req.body.membershipId,
        amount: req.body.amount,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating checkout session" });
  }
};


const createPayment = async (req: Request, res: Response) => {
  try {
    const { user_id, stripe_payment_intent_id, stripe_customer_id, amount, type, datePaiement, typeId } = req.body;
    const newPayment = await Payment.create({
      user_id,
      stripe_payment_intent_id,
      stripe_customer_id,
      amount,
      type,
      datePaiement,
      typeId
    });
    res.status(201).json(newPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating payment" });
  }
}

const getAllPayments = async (req: Request, res: Response) => {
  try {
    if (!Payment) {
      console.error('Payment model is undefined');
      return res.status(500).json({ message: "Payment model is undefined" });
    }
    const payments = await Payment.findAll();
    return res.status(200).json(payments);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error details:', error);
      res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des paiements.", errorDetails: error.message });
    } else {
      console.error('Unknown error:', error);
      res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des paiements." });
    }
  }
}

const getPaymentById = async (req: Request, res: Response) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payment.findByPk(paymentId);
    if (payment !== null) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving payment" });
  }
}

const updatePayment = async (req: Request, res: Response) => {
  try {
    const paymentId = req.params.id;
    const { user_id, stripe_payment_intent_id, stripe_customer_id, amount, type, datePaiement, typeId } = req.body;
    const payment = await Payment.findByPk(paymentId);
    if (payment !== null) {
      payment.user_id = user_id || payment.user_id;
      payment.stripe_payment_intent_id = stripe_payment_intent_id || payment.stripe_payment_intent_id;
      payment.stripe_customer_id = stripe_customer_id || payment.stripe_customer_id;
      payment.amount = amount || payment.amount;
      payment.type = type || payment.type;
      payment.datePaiement = datePaiement || payment.datePaiement;
      payment.typeId = typeId || payment.typeId;
      await payment.save();
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating payment" });
  }
}

const deletePayment = async (req: Request, res: Response) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payment.findByPk(paymentId);
    if (payment !== null) {
      await payment.destroy();
      res.status(200).json({ message: "Payment deleted successfully" });
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) { 
    console.error(error);
    res.status(500).json({ message: "Error deleting payment" });
  }
}

export { createPayment, getAllPayments, getPaymentById, updatePayment, deletePayment };