import { Request, Response } from 'express'
import { Controller, Get } from '@overnightjs/core'

@Controller('example')
export default class Example {
  @Get('/')
  exampleRoute(req: Request, res: Response) {
    res.json({
      example: true,
    })
  }
}
