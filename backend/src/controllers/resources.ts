import express, { Request, Response } from 'express';
import { validateResource } from '../validation';
import { Resource } from '../models';

const createResource = async (req: Request, res: Response) => {
  const { error, value } = validateResource(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { label, type, description } = value;

    if (!label || !type || !description) {
      res.status(400).json({ message: "Aucun champ ne doit être vide"});
    }

    const newResource = await Resource.create({
      label,
      type,
      description
    });
    res.status(201).json(newResource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la ressource."});
  }
}

const getAllResources = async (req: Request, res: Response) => {
  try {
    const resources = await Resource.findAll();
    return res.status(200).json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des ressources. "});
  }
}

const getResourceById = async (req: Request, res: Response) => {
  try {
    const resourceId = req.params.id;
    const resource = await Resource.findByPk(resourceId);
    if (resource !== null) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ message: "Ressource non retrouvée"});
    }
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la recherche de la ressource"});
  }

}

const updateResource = (req: Request, res: Response) => {
  // TODO
}


const deleteResource = async (req: Request, res: Response) => {
  try {
    const resourceId = req.params.id;
    const resource = await Resource.findByPk(resourceId);
    if (resource !== null) {
      await resource.destroy();
      res.status(200).json({ message: "Suppression de la ressource effectuée"});
    } else {
      res.status(404).json({ message: "Tâche non retrouvée"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur rencontré en essayant de supprimer la ressource"});
  }
}

export { createResource, getAllResources, getResourceById, updateResource, deleteResource };