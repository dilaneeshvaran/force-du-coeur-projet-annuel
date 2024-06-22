/**
 * Routes pour répertorier les membres de l'association.
 */

import express, { Router, Request, Response } from "express";
import { adminlogin,updateUser,register, login,adminAccess, logout, getAllUsers, getUserById, deleteUser } from '../controllers';
import { authenticateToken } from "../middlewares";

export const router = Router();

// révoquer les jetons
export const tokenRevocationList: string[] = [];

router.post('/register', register);
router.post('/login', login);
//router.get('/', authenticateToken, getAllUsers);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
router.post('/adminlogin', adminlogin);

//router.get('/admin', authenticateToken, authorizeAdmin, adminAccess);
//router.post('/logout', authenticateToken, logout);
