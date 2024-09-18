import express, { Request, Response } from 'express';
import { CarsService } from './cars.services.ts';
import { CarsController } from './cars.controller.ts';

const router = express.Router();
const carsService = new CarsService();
const carsController = new CarsController(carsService);

router.get('/', (req: Request, res: Response) => carsController.getCars(req, res));

export default router;
