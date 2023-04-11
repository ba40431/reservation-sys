import  express, { Router, Request, Response, NextFunction } from 'express'
import { ReservationController } from '../../controllers/reservationController'

const reservationController = new ReservationController()

export class ReservationRouter {
  router: Router
  constructor() {
    this.router = express.Router()
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get('/token', reservationController.getToken)
  }
}
