import express from 'express';
import {
  createStudio,
  getAllStudios,
  getStudioById,
  updateStudio,
  deleteStudio,
} from '../controllers/studio.controller';

const router = express.Router();

router.post('/', createStudio);
router.get('/', getAllStudios);
router.get('/:id', getStudioById);
router.put('/:id', updateStudio);
router.delete('/:id', deleteStudio);

export default router;
