import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
// @ts-ignore 
import {signupSchema} from " @anshpatwal/medium-common"


export const userRouter = new Hono()

userRouter.post("/signup", async (c) => {
    console.log("Signup route hit");
    const prisma = new PrismaClient({
        datasources: {
            //@ts-ignore
            db: { url: c.env.DATABASE_URL },
        },
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json()
        const {sucess} =signupSchema.safeParse(body)
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            }
        })
        // @ts-ignore 
        const token = await sign({ id: user.id }, c.env.SECRET)
        return c.json({
            token
        })
    } catch (error) {
        console.log(error)
    }
})


userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasources: {
            //@ts-ignore
            db: { url: c.env.DATABASE_URL },
        },
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json()
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        })
        // @ts-ignore 
        const secret = c.env.SECRET
        // @ts-ignore 
        const token = await sign({ id: user.id }, secret)
        return c.json({
            token
        })

    } catch (error) {
        console.log(error)
        return c.json(
            {
                msg: "Invalid Crendtials"
            }
        )
    }
})