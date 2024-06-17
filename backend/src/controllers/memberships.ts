import express, { Request, Response } from 'express';
import { validateMembership } from '../validation';
import { logger } from '../middlewares';
import { Membership } from '../models';
require('dotenv').config()


interface MembershipUpdateParams {
  amount?: number;
  paymentDate?: Date;
  status?: string;
  userId?: number;
  membershipId?: number;
}

const createMembership = async (req: Request, res: Response) => {
  const { error, value } = validateMembership(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  
  try {
    const { amount, paymentDate, userId, status } = value;
    
    if (!amount || !userId) {
      res.status(400).json({ message: "Aucun champ ne doit être vide"});
    }

    const newMembership = await Membership.create({
      amount,
      paymentDate,
      userId,
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

const updateMembership = async (req: Request, res: Response) => {
  try {
    const membershipId = req.params.id;
    const { amount, paymentDate, userId, status } = req.body;
  
    const membership = await Membership.findByPk(membershipId);
    if (membership !== null) {
      if (amount !== undefined) membership.amount = amount; 
      if (paymentDate !== undefined) membership.paymentDate = paymentDate;
      if (userId !== undefined) membership.userId = userId;
      if (status !== undefined) membership.status = status;
  
      await membership.save();
      res.status(200).json(membership);
    } else {
      res.status(404).json({ message: "Membership not found" });
    }
  } catch (error) {
    logger.error('Error updating membership:', error);
    return res.status(500).json({ message: "Erreur lors de la mise a jour d'un abonnement", error: (error as Error).message });
  }
}

export async function updateMembershipDetails(membershipId: string, updateParams: MembershipUpdateParams): Promise<void> {
  const membership = await Membership.findByPk(membershipId);
  console.log("testing:::::::::::::::::::::updateMembershipDetails");
  if (membership) {
    if (updateParams.amount !== undefined) membership.amount = updateParams.amount;
    if (updateParams.paymentDate !== undefined) membership.paymentDate = updateParams.paymentDate;
    if (updateParams.status !== undefined) membership.status = updateParams.status as 'active' | 'inactive';
    if (updateParams.userId !== undefined) membership.userId = updateParams.userId;

    await membership.save();
  } else {
    throw new Error('Membership not found');
  }
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
const getMembershipByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const memberships = await Membership.findAll({ where: { userId: userId } });
    if (memberships.length > 0) {
      res.status(200).json(memberships);
    } else {
      res.status(404).json({ message: "No memberships found for this user"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error while retrieving memberships"});
  }
}
export {getMembershipByUserId, createMembership, getAllMemberships, getMembershipById, updateMembership, deleteMembership };