import express, { Request, Response } from 'express';
import db from '../database/config';

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const creerEquipe = (req: Request, res: Response) => {
  // TODO
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const recupererEquipes = (req: Request, res: Response) => {
  // TODO
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const recupererEquipeParId = (req: Request, res: Response) => {
  // TODO
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const mettreAJourEquipe = (req: Request, res: Response) => {
  // TODO
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const supprimerEquipe = (req: Request, res: Response) => {
  // TODO
}

export { creerEquipe, recupererEquipes, recupererEquipeParId, mettreAJourEquipe, supprimerEquipe };