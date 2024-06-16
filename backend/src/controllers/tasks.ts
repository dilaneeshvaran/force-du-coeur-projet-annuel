import express, { Request, Response } from 'express';
import { validateTask } from '../validation';
import { Task } from '../models';

const createTask = async (req: Request, res: Response) => {
  const { error, value } = validateTask(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { title, description, deadline, assigned_date, status, assingedTo, createdBy } = value;

    if (!title || !description || !deadline || !assigned_date || !status || !assingedTo || !createdBy) {
      res.status(400).json({ message: "Aucun champ ne doit être vide"});
    }

    const newTask = await Task.create({
      title,
      description,
      deadline,
      assigned_date,
      status,
      assingedTo,
      createdBy
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

const updateTask = async (req: Request, res: Response) => {
  const { error, value } = validateTask(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const { id, title, description, deadline, assigned_date, status, assignedTo, createdBy } = value;

  if (!id || !title || !description || !deadline || !assigned_date || !status || !assignedTo || !createdBy) {
    res.status(400).json({ message: "Aucun champ ne doit être vide"});
    return;
  }

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      res.status(404).json({ message: "Tâche non trouvée."});
      return;
    }

    task.title = title;
    task.description = description;
    task.deadline = deadline;
    task.assigned_date = assigned_date;
    task.status = status;
    task.assignedTo = assignedTo;
    task.createdBy = createdBy;

    await task.save();

    res.status(200).json(task);
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

export { createTask, getAllTasks, getTaskById, updateTask, deleteTask };