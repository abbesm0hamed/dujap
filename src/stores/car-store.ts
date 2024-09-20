import { CarDetails } from "../types/car.js";
import { fetchData } from "../utils/fetcher.ts";
import { getBaseUrl } from "../utils/index.utils.ts";

class CarStore extends EventTarget {
  private cars: CarDetails[] = [];
  private lastFetchTime: number = 0;
  private fetchPromise: Promise<CarDetails[]> | null = null;
  private readonly CACHE_DURATION = 60000; // 1 minute

  async getCars(): Promise<CarDetails[]> {
    const now = Date.now();
    if (this.cars.length === 0 || now - this.lastFetchTime > this.CACHE_DURATION) {
      if (!this.fetchPromise) {
        this.fetchPromise = this.fetchCars();
      }
      await this.fetchPromise;
      this.fetchPromise = null;
    }
    return this.cars;
  }

  private async fetchCars(): Promise<CarDetails[]> {
    try {
      const cars = await fetchData<CarDetails[]>(getBaseUrl('/cars'));
      if (Array.isArray(cars) && cars.length > 0) {
        this.cars = cars;
        this.lastFetchTime = Date.now();
        this.dispatchEvent(new CustomEvent('update'));
      } else {
        console.warn('No cars data received or data is not an array');
        this.cars = [];
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
    return this.cars;
  }

  async refreshCars(): Promise<void> {
    this.fetchPromise = this.fetchCars();
    await this.fetchPromise;
    this.fetchPromise = null;
  }
}

export const carStore = new CarStore();
