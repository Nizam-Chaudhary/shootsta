import express from 'express';
import * as ambulanceController from '../controllers/ambulance';

const router = express.Router();

router.post('/', ambulanceController.addAmbulance);

router.get('/', ambulanceController.getAmbulances);

router.get('/:id', ambulanceController.getAmbulanceById);

router.put('/:id', ambulanceController.updateAmbulance);

router.delete('/:id', ambulanceController.removeAmbulance);

export default router;
