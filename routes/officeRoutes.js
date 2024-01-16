import express from 'express';
import { getAllOffices, getOfficeById, getOfficesNearLocation, getCarsByOffice } from '../controllers/officeControllers.js';

const router = express.Router();

router.get('/', getAllOffices);

router.get('/:id', getOfficeById);

router.get('/nearme', getOfficesNearLocation);

router.get('/:officeId/cars', getCarsByOffice);

export default router;
