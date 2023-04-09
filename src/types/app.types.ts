import type { CorsOptions } from 'cors'

export interface AppProps {
  port?: string | number
  message?: string
  corsOptions?: CorsOptions
}

export interface AppMiddlewareProps {
  corsOptions?: CorsOptions
}
