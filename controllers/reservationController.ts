import { Request, Response, NextFunction } from 'express'
import { ReservationService } from '../service/reservationService'
import { promises } from 'dns'

const reservationService = ReservationService.getInstance()

export class ReservationController {
  async getToken(request: Request, response: Response, next: NextFunction) {
		try {
			const token = await reservationService.getToken()
			if(token === ''){
				response.send('getToken 發生錯誤')
			}
			const result = await reservationService.getSaveSeats(token)
      response.send(result)
		}catch(error) {
			console.log(error)
		}
  }
}
