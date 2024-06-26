import express, { Request, Response } from 'express';
import { validateDonation } from '../validation';
import { Donation } from '../models';
import { logger } from '../middlewares';
import { Op } from 'sequelize';

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

const getDonationsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const donations = await Donation.findAll({ where: { donatorId: userId } });
    if (donations.length > 0) {
      res.status(200).json(donations);
    } else {
      res.status(404).json({ message: "No donations found for this user"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error while retrieving donations"});
  }
}
const getTotalDonations = async (req: Request, res: Response) => {
  try {
    const donations = await Donation.findAll();
    const total = donations.reduce((acc, donation) => acc + donation.amount, 0);
    res.status(200).json({ totalDonations: total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while calculating total donations" });
  }
}

const getTotalDonationsMonth = async (req: Request, res: Response) => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  try {
    const donations = await Donation.findAll({
      where: {
        donationDate: {
          [Op.gte]: firstDayOfMonth,
          [Op.lte]: lastDayOfMonth,
        },
      },
    });
    const total = donations.reduce((acc, donation) => acc + donation.amount, 0);
    res.status(200).json({ totalDonationsMonth: total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while calculating total donations for the month" });
  }
};
export {getTotalDonationsMonth,getTotalDonations, getDonationsByUserId,createDonation, getAllDonations, getDonationById };