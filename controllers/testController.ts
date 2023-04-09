import { Request, Response, NextFunction } from 'express'
import { TestService } from '../service/testService'

const testService = TestService.getInstance()

export class TestController {
  async getHomePage(request: Request, response: Response, next: NextFunction) {
    response.type('text/plain')
      const result = await testService.getHomePage()
      response.send(result)

  }

  async getArticlesPage(request: Request, response: Response, next: NextFunction) {
    response.type('text/plain')
    const result = await testService.getArticlesPage()
    response.send(result)
  }

  async getAboutPage(request: Request, response: Response, next: NextFunction) {
    response.type('text/plain')
    const result = await testService.getAboutPage()
    response.send(result)
  }
}