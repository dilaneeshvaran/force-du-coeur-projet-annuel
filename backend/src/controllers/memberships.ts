import express, { Request, Response } from 'express';
import { validateMembership } from '../validation';
import { logger } from '../middlewares';
import { Membership } from '../models';


const createMembership = async (req: Request, res: Response) => {
  const { error, value } = validateMembership(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  
  try {
    const { amount, paymentDate, memberId, status } = value;
    
    if (!amount || !paymentDate || !memberId || !status) {
      res.status(400).json({ message: "Aucun champ ne doit être vide"});
    }

    const newMembership = await Membership.create({
      amount,
      paymentDate,
      memberId,
      status,
    });
    res.status(201).json(newMembership);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création d'un abonnement."});
  }
}

const getAllMemberships = async (req: Request, res: Response) => {
  try {
    const memberships = await Membership.findAll();
    return res.status(200).json(memberships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des abonnements. "});
  }
}

const getMembershipById = async (req: Request, res: Response) => {
  try {
    const membershipId = req.params.id;
    const membership = await Membership.findByPk(membershipId);
    if (membership !== null) {
      res.status(200).json(membership);
    } else {
      res.status(404).json({ message: "Abonnement non retrouvé"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la recherche d'un abonnement"});
  }
}

const updateMembership = (req: Request, res: Response) => {
  // TODO
}


const deleteMembership = async (req: Request, res: Response) => {
  try {
    const membershipId = req.params.id;
    const membership = await Membership.findByPk(membershipId);
    if (membership !== null) {
      await membership.destroy();
      res.status(200).json({ message: "Suppression de l'abonnement effectuée"});
    } else {
      res.status(404).json({ message: "Abonnement non retrouvé"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur rencontré en essayant de supprimer l'abonnement"});
  }
}

export { createMembership, getAllMemberships, getMembershipById, updateMembership, deleteMembership };