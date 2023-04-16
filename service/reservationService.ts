import { UserConfig, RestaurantConfig, Config, Response } from '../config/interface'
import axios from 'axios'
import dotenv from 'dotenv'
import { response } from 'express'
import { global } from '../config/environment'

dotenv.config({path: './config/.env'})

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

const headers = {
  "content-type": "application/json",
  "accept": "application/json",
  "authority": "www.feastogether.com.tw",
  "scheme": "https",
  "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
  "accept-encoding": "gzip, deflate, br",
  "cache-control": "no-cache",
  "origin": "https://www.feastogether.com.tw",
  "pragma": "no-cache",
  "referer": "https://www.feastogether.com.tw/booking/Kaifun/search",
  "sec-ch-ua": `"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"`,
  "sec-ch-ua-mobile": "?1",
  "sec-ch-ua-platform": `"Android"`,
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36"
}

class PrivateReservationService {
  message: string
  userConfig: UserConfig
    
  constructor() {
    this.message = 'I am an instance'
    this.userConfig = userConfig
  }

  async getToken(): Promise<string> {
    try {
      const payload = {
        act: userConfig.account,
        pwd: userConfig.password
      }
      const header = {
        "act": userConfig.account,
        "Cookie": `_ga=${config.ga}; _ga_9PQXQP3QD6=${config.ga_9PQXQP3QD6}`
      }
      const response = await axios<Response>({
        url: process.env.LOGIN_API,
        method: 'post',
        headers: { ...headers, ...header},
        data: payload
      })
      const { data } = response
      if (data.statusCode !== 1000) {
        console.log(data.result.msg)
        return ''
      }
      const token = data.result.customerLoginResp.token
      return token
    } catch (error) {
      console.log(`getToken 發生錯誤 ${error}`)
      return ''
    }
  }

  // 立即訂位
  async getSaveSeats(token: string): Promise<string> {
    const requestData = {
      storeId: restaurantConfig.storeId,
      peopleCount: Number(restaurantConfig.peopleCount),
      mealPeriod: restaurantConfig.mealPeriod,
      mealDate: restaurantConfig.mealDate,
      mealTime: restaurantConfig.mealTime,
      mealSeq: mealSeqMap.get(restaurantConfig.mealTime),
      zked: "1j6ul4y94ejru6xk7vu4vu4", // hard-coded for now, as it's commented out in the original code
      scgVerifyStr: "",
      svgCode: null
    }

    const header = {
      "act": userConfig.account,
      "Cookie": `_ga=${config.ga}; _ga_9PQXQP3QD6=${config.ga_9PQXQP3QD6}`,
      "authorization": `Bearer ${token}`
    }
    try {
      const response = await axios<Response>({
        url: process.env.SAVE_SEATS_API,
        method: 'post',
        headers: { ...headers, ...header},
        data: requestData
      })

      const { data } = response
      if (data.statusCode !== 1000) {
        return data.result.msg
      }
      return data.result.expirationTime
    }catch (error) {
      console.log(`getSaveSeats 發生錯誤 ${error}`)
      return ''
    }

  }

  async saveBooking(token: string): Promise<string> {
    const requestData = {
      storeId: restaurantConfig.storeId,
      mealPeriod: restaurantConfig.mealPeriod,
      mealDate: restaurantConfig.mealDate,
      mealTime: restaurantConfig.mealTime,
      mealPurpose: "",
      mealSeq: mealSeqMap.get(restaurantConfig.mealTime),
      special: 0,
      childSeat: 0,
      adult: Number(restaurantConfig.peopleCount),
      child: 0,
      chargeList: [
        {
          seq:   201,
          count: Number(restaurantConfig.peopleCount)
        },
        {
          seq:   202,
          count: 0
        }
      ],
      storeCode: "TGBQ",
      redirectType: "iEat_card",
      domain: "https://www.feastogether.com.tw",
      pathFir: "booking",
      pathSec: "result",
      yuuu: "892389djdj883831445"
    }

    const header = {
      "act": userConfig.account,
      "Cookie": `_ga=${config.ga}; _ga_9PQXQP3QD6=${config.ga_9PQXQP3QD6}`,
      "authorization": `Bearer ${token}`
    }
    try {
      const response = await axios<Response>({
        url: process.env.BOOKING_API,
        method: 'post',
        headers: { ...headers, ...header},
        data: requestData
      })

      const { data } = response
      if (data.statusCode !== 1000) {
        return data.result.msg
      }
      console.log(data.result)
      return data.message
    }catch (error) {
      console.log(`saveBooking 發生錯誤 ${error}`)
      return ''
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
