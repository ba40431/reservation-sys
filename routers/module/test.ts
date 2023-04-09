import  express, { Router, Request, Response, NextFunction } from 'express'
import { TestController } from '../../controllers/testController'

const testController = new TestController()

export class TestRouter {
  router: Router
  constructor() {
    this.router = express.Router()
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get('/', testController.getHomePage)
    this.router.get('/articles', testController.getArticlesPage)
    this.router.get('/about-me', testController.getAboutPage)
  }
}