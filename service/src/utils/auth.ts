/**
 * Авторизация для пишущих эндпоинтов avaposter (Bearer-токен).
 * Активна только если задан API_AUTH_TOKEN — иначе пропускает (как было до).
 * См. posteren-api-extension-spec §8.
 */
import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'

export function requireApiToken(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.API_AUTH_TOKEN
  if (!expected) return next() // авторизация выключена, пока токен не задан

  const got = (req.headers.authorization || '').replace(/^Bearer\s+/i, '')
  const a = Buffer.from(got)
  const b = Buffer.from(expected)
  if (a.length === b.length && crypto.timingSafeEqual(a, b)) return next()

  res.status(401).json({ code: 401, msg: 'unauthorized' })
}

export default { requireApiToken }
