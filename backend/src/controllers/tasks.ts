import express, { Request, Response } from 'express';
import { validateTask } from '../validation';
import { Task } from '../models';

const createTask = async (req: Request, res: Response) => {
  const { error, value } = validateTask(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { title, description, startDate, endDate, status, responsibleId } = value;

    if (!title || !description || !startDate || !endDate || !status || !responsibleId ) {
      res.status(400).json({ message: "Aucun champ ne doit être vide"});
    }

    const newTask = await Task.create({
      title,
      description,
      startDate,
      endDate,
      status,
      responsibleId
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la tâche."});
  }
}

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des tâches. "});
  }
}

const getTaskById = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);
    if (task !== null) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Tâche non retrouvée"});
    }
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la recherche de la tâche"});
  }
}

const updateTask = (req: Request, res: Response) => {
  // TODO
}


const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);
    if (task !== null) {
      await task.destroy();
      res.status(200).json({ message: "Suppression de la tâche effectuée"});
    } else {
      res.status(404).json({ message: "Tâche non retrouvée"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur rencontré en essayant de supprimer la tâche"});
  }
}

export { createTask, getAllTasks, getTaskById, updateTask, deleteTask };