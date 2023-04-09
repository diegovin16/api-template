import { Request, Response } from 'express'
// import { Get, Controller } from '@/decorators'
import {
  Controller,
  Middleware,
  Get,
  Post,
  Put,
  Delete,
} from '@overnightjs/core'

@Controller('')
export default class DefaultRoute {
  @Get(':id')
  getById(req: Request, res: Response) {
    res.json({
      baseRoute: req.params.id,
    })
  }

  @Get('')
  getAll(req: Request, res: Response) {
    res.json({
      all: true,
    })
  }
}
