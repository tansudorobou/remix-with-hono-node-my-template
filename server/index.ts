// server/index.ts
import { Hono } from "hono"
import { env } from "hono/adapter"
import { basicAuth } from 'hono/basic-auth'
import { logger } from "hono/logger"

const app = new Hono()

app.use(logger())

app.use(async (c, next) => {
  await next()
  c.header("X-Powered-By", "Remix and Hono")
})



const route = app
.use(
  '*',
  basicAuth({
    username: 'hono',
    password: 'acoolproject',
  })
)
.get("/api", (c) => {
  console.log("/api",c)
  const { NAME } = env<{ NAME: string }>(c)

  console.log("/api", NAME)

  return c.json({
    message: "Hello",
    name: NAME
  })
})

export default route
export type AppType = typeof route