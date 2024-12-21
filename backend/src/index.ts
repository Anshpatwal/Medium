import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

export const app = new Hono()

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
  allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT'], 
}));



app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

app.get('/test', (c) => {
  console.log("Test route hit")
  return c.json({ msg: "Test successful" })
})

export default app

