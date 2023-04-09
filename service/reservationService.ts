import { UserConfig } from '../config/interface'
import dotenv from 'dotenv'
dotenv.config({path: '../config/.env'})

const userConfig: UserConfig = {
  account: process.env.ACCOUNT,
  password: process.env.PASSWORD,
  ga: process.env.GA,
  ga_9PQXQP3QD6: process.env.GA_9PQXQP3QD6,
}


const mealSeqMap: Map<string, number> = new Map([
  ["11:30", 1],
  ["12:30", 1],
  ["14:30", 3],
  ["17:30", 4],
  ["18:00", 4],
  ["18:30", 4],
])

class PrivateReservationService {
  message: string
    
  constructor() {
    this.message = 'I am an instance'
  }

  async getToken() {

  }
}


export class ReservationService {
  private static instance: PrivateReservationService

  constructor() {
    throw new Error('Use ReservationService.getInstance()')
  }

  public static getInstance() {

    if (!this.instance) {
      this.instance = new PrivateReservationService()
    }

    return this.instance
  }
}