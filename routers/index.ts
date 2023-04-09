import  express, { Router, Request, Response, NextFunction } from 'express'
import { TestRouter } from './module/test'

const testRouter = new TestRouter()

export class IndexRouter {
  router: Router
  constructor() {
    this.router = express.Router()
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.use(testRouter.router)
  }
}