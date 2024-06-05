/**
 * Routes pour gérer les dons.
 */
import express, { Router, Request, Response } from "express";
import { createDonation, getAllDonations, getDonationById } from '../controllers';

export const router = Router();

//router.post('/', isAuth, createDonation); 
router.post('/', createDonation); 
router.get('/', getAllDonations);
router.get('/:id', getDonationById);