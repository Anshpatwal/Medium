import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

export const app= new Hono()

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

app.get('/test', (c) => {
  console.log("Test route hit")
  return c.json({ msg: "Test successful" })
})

export default app

