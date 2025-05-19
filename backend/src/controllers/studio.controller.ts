import { Request, Response } from 'express';
import Studio from '../models/Studio';

export const createStudio = async (req: Request, res: Response) => {
  try {
    const studio = await Studio.create(req.body);
    res.status(201).json(studio);
  } catch (error) {
    res.status(400).json({ message: 'Error creating studio', error });
  }
};

export const getAllStudios = async (_req: Request, res: Response) => {
  try {
    const studios = await Studio.find();
    res.status(200).json(studios);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching studios', error });
  }
};

export const getStudioById = async (req: Request, res: Response) => {
  try {
    const studio = await Studio.findById(req.params.id);
    if (!studio) return res.status(404).json({ message: 'Studio not found' });
    res.status(200).json(studio);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching studio', error });
  }
};

export const updateStudio = async (req: Request, res: Response) => {
  try {
    const studio = await Studio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!studio) return res.status(404).json({ message: 'Studio not found' });
    res.status(200).json(studio);
  } catch (error) {
    res.status(400).json({ message: 'Error updating studio', error });
  }
};

export const deleteStudio = async (req: Request, res: Response) => {
  try {
    const studio = await Studio.findByIdAndDelete(req.params.id);
    if (!studio) return res.status(404).json({ message: 'Studio not found' });
    res.status(200).json({ message: 'Studio deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting studio', error });
  }
};
