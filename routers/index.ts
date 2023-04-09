import  express, { Router, Request, Response, NextFunction } from 'express'
import { TestRouter } from './module/test'
import { ReservationRouter } from './module/reservation'

const testRouter = new TestRouter()
const reservationRouter = new ReservationRouter()

export class IndexRouter {
  router: Router
  constructor() {
    this.router = express.Router()
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.use('/test', testRouter.router)
    this.router.use('/reservation', reservationRouter.router)
  }
}