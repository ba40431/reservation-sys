import { UserConfig, RestaurantConfig, Config, Response } from '../config/interface'
import axios from 'axios'
import dotenv from 'dotenv'
import { response } from 'express'
import { global } from '../config/environment'

dotenv.config({path: '../config/.env'})

const userConfig: UserConfig = {
  account: process.env.ACCOUNT,
  password: process.env.PASSWORD,
  ga: process.env.GA,
  ga_9PQXQP3QD6: process.env.GA_9PQXQP3QD6
}

const restaurantConfig: RestaurantConfig =  {
  storeId: process.env.STORE_ID,
  peopleCount: process.env.PEOPLE_COUNT,
	mealPeriod: process.env.MEAL_PERIOD,
  mealDate: process.env.MEAL_DATE,
  mealTime: process.env.MEAL_TIME
}

const config: Config = {
  account: process.env.ACCOUNT,
  password: process.env.PASSWORD,
  ga: process.env.GA,
  ga_9PQXQP3QD6: process.env.GA_9PQXQP3QD6,
  storeId: process.env.PASSWORD,
  peopleCount: process.env.PEOPLE_COUNT,
	mealPeriod: process.env.MEAL_PERIOD,
  mealDate: process.env.MEAL_DATE,
  mealTime: process.env.MEAL_TIME
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
  userConfig: UserConfig
    
  constructor() {
    this.message = 'I am an instance'
    this.userConfig = userConfig
  }

  async getToken() {
    try {
      const response = await axios.post<Response>(process.env.LOGIN_API, userConfig)
      const { data } = response
      if (data.statusCode !== 1000) {
        return data.result.msg
      }
      const token = data.result.customerLoginResp.token
      // return token
    } catch (error) {
      console.log(error)
    }
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