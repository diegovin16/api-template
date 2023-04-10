import express from 'express'
import cors from 'cors'
import { consoleLogger, errorLogger, logger } from '@/utils/logger'
import * as fs from 'fs'
import * as path from 'path'
import 'express-async-errors'
import { Server } from '@overnightjs/core'
import errorMiddleware from '@/middlewares/error.middleware'
import type { AppMiddlewareProps, AppProps } from './types/app.types'

const CONTROLLERS_PATH = './controllers'

export default class App extends Server {
  private readonly PORT: string | number

  private readonly message: string

  constructor({ port, message, corsOptions }: AppProps = {}) {
    super()
    this.PORT = port || 3000
    this.message = message || `App listening on port ${this.PORT} 🚀`

    this.initializeMiddlewares({ corsOptions })
    this.initializeRoutes()
    this.initializeErrorMiddleware()
  }

  private initializeMiddlewares({ corsOptions = {} }: AppMiddlewareProps) {
    this.app.use(logger)
    this.app.use(errorLogger)
    this.app.use(express.json())
    this.app.use(cors(corsOptions))
  }

  private initializeErrorMiddleware() {
    this.app.use(errorMiddleware)
  }

  private initializeRoutes() {
    const files = fs.readdirSync(path.join(__dirname, CONTROLLERS_PATH))
    files.forEach(file => {
      if (
        file.includes('test') ||
        file.includes('spec') ||
        (!file.includes('ts') && !file.includes('js'))
      )
        return
      import(path.join(__dirname, CONTROLLERS_PATH, file)).then(route => {
        let controllerClass
        try {
          // eslint-disable-next-line new-cap
          controllerClass = new route.default()
        } catch {
          // eslint-disable-next-line new-cap
          controllerClass = new route.default.default()
        }
        super.addControllers(controllerClass)
        consoleLogger.info(`  | New controller by file: ${file}`)
      })
    })
  }

  public async bootstrap() {
    this.app.listen(this.PORT, () => {
      consoleLogger.info(this.message)
    })
  }
}
