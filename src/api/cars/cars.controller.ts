import { Request, Response } from 'express';
import { CarsService } from './cars.services.ts';

export class CarsController {
  private carsService: CarsService;

  constructor(carsService: CarsService) {
    this.carsService = carsService;
  }

  async getCars(req: Request, res: Response) {
    try {
      const cars = await this.carsService.getCars();
      res.json(cars);
    } catch (error) {
      console.error('Failed to fetch cars:', error);
      res.status(500).json({ message: 'Failed to fetch cars' });
    }
  }
}
