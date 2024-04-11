/**
 * Routes pour gérer les donations.
 */
import express, { Router, Request, Response } from "express";
import { createDonation, deleteDonation, getAllDonations, getDonationById, updateDonation } from '../controllers';
import { isAuth } from "../middlewares";

export const router = Router();

router.post('/', isAuth, createDonation); 
router.get('/', getAllDonations);
router.get('/:id', getDonationById);
router.put('/:id', isAuth, updateDonation);
router.delete('/:id', isAuth, deleteDonation);