import express, { Request, Response } from 'express';
import { validateDonation } from '../validation';
import { Donation } from '../models';
import { logger } from '../middlewares';

const createDonation = async (req: Request, res: Response) => {
  const { error, value } = validateDonation(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  
  try {
    const { amount, donationDate, fullname, paymentMethod, email, donationFrequency, donatorId } = value;
    
    if (!amount) {
      res.status(400).json({ message: "amount champ ne doit être vide"});
      return;
    }

    const newDonation = await Donation.create({
      amount,
      donationDate,
      fullname,
      paymentMethod,
      email,
      donationFrequency,
      donatorId
    });
    res.status(201).json(newDonation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du don."});
  }
}

const getAllDonations = async (req: Request, res: Response) => {
  try {
    const donations = await Donation.findAll();
    return res.status(200).json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des dons."});
  }
}

const getDonationById = async (req: Request, res: Response) => {
  try {
    const donationId = req.params.id;
    const donation = await Donation.findByPk(donationId);
    if (donation !== null) {
      res.status(200).json(donation);
    } else {
      res.status(404).json({ message: "Don non retrouvé"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Erreur lors de la recherche du don"});
  }
}




export { createDonation, getAllDonations, getDonationById };