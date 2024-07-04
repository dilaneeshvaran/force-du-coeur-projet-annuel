import { Request, Response } from 'express';
import { validateAlert } from '../validation';
import { Alert } from '../models';
import { logger } from '../middlewares';

async function createAlert(req: Request, res: Response) {
  const data = req.body;
  const { error } = validateAlert(data);
  if (error) {
    logger.error(`Validation failed: ${error.details.map(d => d.message).join(', ')}`);
    return res.status(400).json({ message: error.details.map(d => d.message).join(', ') });
  }

  try {
    const alert = await Alert.create(data);
    return res.status(201).json(alert);
  } catch (error) {
    logger.error('Error creating alert:', error);
    return res.status(500).json({ message: 'Error creating alert.' });
  }
}

async function getAllAlerts(req: Request, res: Response) {
  try {
    const alerts = await Alert.findAll();
    return res.status(200).json(alerts);
  } catch (error) {
    logger.error('Error fetching alerts:', error);
    return res.status(500).json({ message: 'Error fetching alerts.' });
  }
}

async function getAlertById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const alert = await Alert.findByPk(id);
    if (alert !== null) {
      return res.status(200).json(alert);
    } else {
      return res.status(404).json({ message: 'Alert not found.' });
    }
  } catch (error) {
    logger.error('Error fetching alert:', error);
    return res.status(500).json({ message: 'Error fetching alert.' });
  }
}

async function updateAlert(req: Request, res: Response) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const alert = await Alert.findByPk(id);
      if (!alert) {
        return res.status(404).json({ message: 'Alert not found.' });
      }
      const updatedAlert = await alert.update(updateData);
      return res.status(200).json(updatedAlert);
    } catch (error) {
      logger.error('Error updating alert:', error);
      return res.status(500).json({ message: 'Error updating alert.' });
    }
  }
  
  async function deleteAlert(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const alert = await Alert.findByPk(id);
      if (!alert) {
        return res.status(404).json({ message: 'Alert not found.' });
      }
      await alert.destroy();
      return res.status(200).json({ message: 'Alert successfully deleted.' });
    } catch (error) {
      logger.error('Error deleting alert:', error);
      return res.status(500).json({ message: 'Error deleting alert.' });
    }
  }

  export { createAlert, getAllAlerts, getAlertById, updateAlert, deleteAlert };