import { Request, Response } from 'express'
import { HttpException } from '@/exceptions/HttpException'
import { consoleLogger } from '@/utils/logger'

const errorMiddleware = (error: HttpException, req: Request, res: Response) => {
  const status: number = error.status || 500
  const message: string = error.message || 'Something went wrong'

  consoleLogger.error(
    `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`,
  )
  return res.status(status).json({
    message,
    status,
    statusCode: status,
    success: false,
    error: true,
  })
}

export default errorMiddleware
