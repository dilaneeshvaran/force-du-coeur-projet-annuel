import { Request, Response } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';;
import { validateUser, validateUserAuth } from '../validation';
import { generateToken } from '../services';
import { User } from '../models';
import { RequestWithUser, logger } from '../middlewares';
import { tokenRevocationList } from '../routers/users';

const register = async (req: Request, res: Response) => {
  const { error, value } = validateUser(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { username, password, email, firstname, lastname } = value;
    const hashedPassword = await argon2.hash(password);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      firstname,
      lastname
    });

    const isValidPassword = await newUser.validPassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

  const token = generateToken(newUser.userId);

    res.status(201).json({ newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur."});
  }
} 
 

const login = async (req: RequestWithUser, res: Response) => {
  const { error, value } = validateUserAuth(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { password, email } = value;

  try {
    const user = await User.findOne({ where: { email } });
    // si l'user n'existe pas
    if (!user) {
      return res.status(401).send({ message: "nom d'utilisateur ou mot de passe erroné."});
    }

    const isPasswordCorrect = await argon2.verify(user.password, password);

    if (!isPasswordCorrect) {
      return res.status(401).send({ message: "le mot de passe est erroné."});
    }

    const token = jwt.sign({ id: user.userId}, 'your_secret_key', { expiresIn: '3h'});

    return res.status(200).send({ messsage: "authentification de l'user réussie", token });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ message: "erreur interne" });
  }
}


const adminAccess = (req: Request, res: Response) => {
  // TODO
}


const logout = async (req: RequestWithUser, res: Response) => {
  // TODO
  const token = req.token;

  if (token) {
    tokenRevocationList.push(token);
    res.status(200).json({ message: 'Deconnexion réussie'});
  } else {
    res.status(400).json({ message: 'Pas de jeton fourni'});
  }
}

const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (user !== null) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "utilisateur non retrouvé"});
    }
  } catch(error) {
    logger.error(error);
    res.status(500).json({ message: "Erreur lors de la recherche de l'utilisateur"});
  }
}


const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des utilisateurs."});
  }
}

export { register, login, adminAccess, logout, getUserById, getAllUsers };