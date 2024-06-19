import express, { Router } from "express";
import {processRegister,handleWebhook,processMembership, processPayment,createPayment, getAllPayments, getPaymentById, updatePayment, deletePayment } from '../controllers';
import rawBodyBuffer  from '../middlewares/rawBodyBuffer'; 
export const router = Router();

router.post('/', createPayment);
router.get('/', getAllPayments);
router.get('/:id', getPaymentById);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);
router.post('/processPayment', processPayment);
router.post('/webhook', express.raw({type: 'application/json'}), handleWebhook);
router.post('/processMembership', processMembership);
router.post('/processRegister', processRegister);