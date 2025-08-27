import { createClient } from "redis"

const REDIS_URL = process.env.REDIS_URL

export const kv = createClient({
  url: REDIS_URL,
})

// Connect to Redis
kv.connect().catch(console.error)

export async function testKvConnection() {
  try {
    await kv.set("test_connection", "working")
    const result = await kv.get("test_connection")

    return {
      success: true,
      message: "Redis connection successful",
      result,
      environmentVariables: {
        REDIS_URL: REDIS_URL ? "Set (value hidden)" : "Not set",
        NODE_ENV: process.env.NODE_ENV,
      },
    }
  } catch (error) {
    return {
      success: false,
      message: "Redis connection failed",
      error: error instanceof Error ? error.message : "Unknown error",
      environmentVariables: {
        REDIS_URL: REDIS_URL ? "Set (value hidden)" : "Not set",
        NODE_ENV: process.env.NODE_ENV,
      },
    }
  }
}
