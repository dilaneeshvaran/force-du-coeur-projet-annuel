"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const validation_1 = require("../validation");
const models_1 = require("../models");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, validation_1.validateTask)(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    }
    try {
        const { title, description, deadline, assigned_date, status, assingedTo, createdBy } = value;
        if (!title || !description || !deadline || !assigned_date || !status || !assingedTo || !createdBy) {
            res.status(400).json({ message: "Aucun champ ne doit être vide" });
        }
        const newTask = yield models_1.Task.create({
            title,
            description,
            deadline,
            assigned_date,
            status,
            assingedTo,
            createdBy
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de la tâche." });
    }
});
exports.createTask = createTask;
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield models_1.Task.findAll();
        return res.status(200).json(tasks);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des tâches. " });
    }
});
exports.getAllTasks = getAllTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield models_1.Task.findByPk(taskId);
        if (task !== null) {
            res.status(200).json(task);
        }
        else {
            res.status(404).json({ message: "Tâche non retrouvée" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la recherche de la tâche" });
    }
});
exports.getTaskById = getTaskById;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, validation_1.validateTask)(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    const { id, title, description, deadline, assigned_date, status, assignedTo, createdBy } = value;
    if (!id || !title || !description || !deadline || !assigned_date || !status || !assignedTo || !createdBy) {
        res.status(400).json({ message: "Aucun champ ne doit être vide" });
        return;
    }
    try {
        const task = yield models_1.Task.findByPk(id);
        if (!task) {
            res.status(404).json({ message: "Tâche non trouvée." });
            return;
        }
        task.title = title;
        task.description = description;
        task.deadline = deadline;
        task.assigned_date = assigned_date;
        task.status = status;
        task.assignedTo = assignedTo;
        task.createdBy = createdBy;
        yield task.save();
        res.status(200).json(task);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de la tâche." });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield models_1.Task.findByPk(taskId);
        if (task !== null) {
            yield task.destroy();
            res.status(200).json({ message: "Suppression de la tâche effectuée" });
        }
        else {
            res.status(404).json({ message: "Tâche non retrouvée" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur rencontré en essayant de supprimer la tâche" });
    }
});
exports.deleteTask = deleteTask;
