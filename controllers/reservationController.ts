import { Request, Response, NextFunction } from 'express'
import { ReservationService } from '../service/reservationService'
import { promises } from 'dns'

const reservationService = ReservationService.getInstance()

export class ReservationController {
  async getBooking(request: Request, response: Response, next: NextFunction) {
		try {
			const token = await reservationService.getToken()
			if(token === ''){
				response.send('getToken 發生錯誤')
			}
			const expirationTime = await reservationService.getSaveSeats(token)
			if(expirationTime === ''){
				response.send('無法取得訂位效期')
			}
			const result = await reservationService.saveBooking(token)
			console.log(result)
      response.send(result)
		}catch(error) {
			console.log(error)
		}
  }
}
