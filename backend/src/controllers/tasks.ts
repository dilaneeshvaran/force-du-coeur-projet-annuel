import express, { Request, Response } from 'express';
import { validateTask } from '../validation';
import { Task } from '../models';

const createTask = async (req: Request, res: Response) => {
  const { error, value } = validateTask(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    console.log('Received data:', req.body);
    const { title, description, deadline, assigned_date, status, assignedTo, createdBy, failedDate, completedDate } = value; // corrected here

    if (!title || !description || !deadline || !assigned_date || !status || !assignedTo || !createdBy ) {
      return res.status(400).json({ message: "Aucun champ ne doit être vide"});
    }

    const newTask = await Task.create({
      title,
      description,
      deadline,
      assigned_date,
      status,
      assignedTo,
      createdBy,
      failedDate,
      completedDate
    });
    return res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ message: "Erreur lors de la création de la tâche.", error: (error as Error).message });
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

const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const { id, title, description, deadline, assigned_date, status, assignedTo, createdBy, failedDate, completedDate } = req.body;

    const task = await Task.findByPk(taskId);
    if (task !== null) {
      if (id !== undefined) task.id = id;
      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (deadline !== undefined) task.deadline = deadline;
      if (assigned_date !== undefined) task.assigned_date = assigned_date;
      if (status !== undefined) task.status = status;
      if (assignedTo !== undefined) task.assignedTo = assignedTo;
      if (createdBy !== undefined) task.createdBy = createdBy;
      if (failedDate !== undefined) task.failedDate = failedDate;
      if (completedDate !== undefined) task.completedDate = completedDate;

      await task.save();
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Tâche non trouvée."});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de la tâche."});
  }
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
const getTasksByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const tasks = await Task.findAll({ where: { assignedTo: userId } });
    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error getting tasks by user ID:', error);
    return res.status(500).json({ message: "Erreur lors de la récupération des tâches par ID d'utilisateur", error: (error as Error).message });
  }
}
export {getTasksByUserId, createTask, getAllTasks, getTaskById, updateTask, deleteTask };