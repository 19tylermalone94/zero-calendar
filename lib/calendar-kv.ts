import { createClient } from "redis"

const REDIS_URL = process.env.REDIS_URL

export const calendarKv = createClient({
  url: REDIS_URL,
})

// Connect to Redis
calendarKv.connect().catch(console.error)
