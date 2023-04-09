import { Request } from 'express'
import { vi } from 'vitest'

export const req = {} as Request
export const res = {
  json: vi.fn(),
  send: vi.fn(),
} as any
