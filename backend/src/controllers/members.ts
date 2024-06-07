import express, { Request, Response } from 'express';
import { validateMember } from '../validation';
import { Member } from '../models';
import argon2 from "argon2";
import { logger } from '../middlewares';

const createMember = async (req: Request, res: Response) => {
  const { error, value } = validateMember(req.body);
  if (error) {
    logger.error(error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }
  
  
  try {
    const { name, firstName, email, password, role, memberSince, dateOfBirth } = value;

    const hashedPassword = await argon2.hash(password);

    const newMember = await Member.create({
      name,
      firstName,
      email,
      password: hashedPassword,
      role: role || 'member',
      memberSince,
      dateOfBirth: new Date(dateOfBirth)
    });
    res.status(201).json(newMember);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Erreur lors de la création du membre."});
  }
}

const getAllMembers = async (req: Request, res: Response) => {
  try {
    const members = await Member.findAll();
    return res.status(200).json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des membres."});
  }
}

const getMemberById = async (req: Request, res: Response) => {
  try {
    const memberId = req.params.id;
    const member = await Member.findByPk(memberId);
    if (member !== null) {
      res.status(200).json(member);
    } else {
      res.status(404).json({ message: "Membre non retrouvé"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Erreur lors de la recherche du membre"});
  }
}

// mettre à jour le rôle d'un membre
const updateMember = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const { role } = req.body;
  
  try {
    const member = await Member.findByPk(memberId);
    if (!member) {
      return res.status(400).json({ message: `Membre avec l'ID ${memberId} non retrouvé`});
    }

    if (member.role === 'member') {
      const newRole = 'admin';
      await member.update({ role: newRole });
      const updatedMember = await Member.findByPk(memberId);
      return res.status(200).json({ message: "Le membre est devenu un admin", updatedMember});
    } else {
      const newRole = 'member';
      await member.update({ role: newRole });
      const updatedMember = await Member.findByPk(memberId);
      return res.status(200).json({ message: "L'admin est redevenu un membre simple", updatedMember});
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Erreur survenue lors de la mise à jour du rôle"});
  }
}

const deleteMember = async (req: Request, res: Response) => {
  try {
    const memberId = req.params.id;
    const member = await Member.findByPk(memberId);
    if (member !== null) {
      // supprimer le membre de la BDD
      // pas encore de tokkens ou de sessions donc simple destroy de Sequelize
      await member.destroy();
      res.status(200).json({ message: "Supression du membre réussi"});
    } else {
      res.status(404).json({ message: "Membre non retrouvé"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur rencontré en essayant de supprimer le membre"});
  }
}

export { createMember, getAllMembers, getMemberById, updateMember, deleteMember };