import { Request, Response, NextFunction } from 'express'
import { ReservationService } from '../service/reservationService'
import { promises } from 'dns'

const reservationService = ReservationService.getInstance()

export class ReservationController {
  async getToken(request: Request, response: Response, next: NextFunction) {
		try {
			const result = await reservationService.getToken()
      response.send(result)
		}catch(error) {
			console.log(error)
		}
  }
}