import { Request, Response } from 'express'
import { ClassErrorMiddleware, Controller, Get } from '@overnightjs/core'
import { HttpException } from '@/exceptions/HttpException'
import { StatusCodes } from 'http-status-codes'
import errorMiddleware from '@/middlewares/error.middleware'

@ClassErrorMiddleware(errorMiddleware)
@Controller('')
export default class DefaultRoute {
  @Get('error')
  getAll() {
    throw new HttpException(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Unexpected error!',
    )
  }

  @Get(':id')
  getById(req: Request, res: Response) {
    res.json({
      params: req.params,
    })
  }
}
