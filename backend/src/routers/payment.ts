import express, { Router } from "express";
import {handleWebhook, processMembership,createPayment, getAllPayments, getPaymentById, updatePayment, deletePayment } from '../controllers';
import rawBodyBuffer  from '../middlewares/rawBodyBuffer'; 
export const router = Router();

router.post('/', createPayment);
router.get('/', getAllPayments);
router.get('/:id', getPaymentById);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);
router.post('/processMembership', processMembership);
router.post('/webhook', express.raw({type: 'application/json'}), handleWebhook);