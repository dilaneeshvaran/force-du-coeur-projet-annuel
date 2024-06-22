/**
 * Routes pour gérer les dons.
 */
import express, { Router, Request, Response } from "express";
import {getTotalDonationsMonth,getTotalDonations,getDonationsByUserId, createDonation, getAllDonations, getDonationById } from '../controllers';

export const router = Router();

//router.post('/', isAuth, createDonation); 
router.post('/', createDonation); 
router.get('/', getAllDonations);
router.get('/total', getTotalDonations);
router.get('/totalMonth', getTotalDonationsMonth);
router.get('/:id', getDonationById);
router.get('/user/:userId', getDonationsByUserId);
