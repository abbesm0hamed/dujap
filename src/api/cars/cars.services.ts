import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export class CarsService {
  private nocodbUrl: string;
  private nocodbApiToken: string;

  constructor() {
    this.nocodbUrl = process.env.NOCODB_URL as string;
    this.nocodbApiToken = process.env.NOCODB_API_TOKEN as string;
    if (!this.nocodbUrl || !this.nocodbApiToken) {
      throw new Error("NOCODB_URL or NOCODB_API_TOKEN is not defined in the environment variables");
    }
  }

  async getCars() {
    try {
      const response = await fetch(this.nocodbUrl, {
        method: 'GET',
        headers: {
          'xc-token': this.nocodbApiToken,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      const data: any = await response.json();
      if (!Array.isArray(data?.list)) {
        throw new Error('Invalid data format');
      }
      return data?.list;
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  }
}
