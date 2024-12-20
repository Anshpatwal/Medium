import { Hono } from 'hono'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { auth } from 'hono/utils/basic-auth'


export const blogRouter = new Hono()

blogRouter.use("/*", async (c, next) => {
    const header = c.req.header("Authorization") || "";
    if (!header || !header.startsWith("Bearer ")) {
        c.status(401);
        return c.json({
            msg: "Authorization header missing or invalid"
        });
    }
    const token = header.split(" ")[1];
    try {
        // @ts-ignore
        const response = await verify(token, c.env.SECRET);
        if (response.id) {
            // @ts-ignore
            c.set("userId", response.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                msg: "Unauthorized"
            });
        }
    } catch (error) {
        c.status(403);
        return c.json({
            msg: "Invalid or expired token",
            //@ts-ignore
            error: error.message
        });
    }
});


blogRouter.post("/", async (c) => {
    const body = await c.req.json()
    //@ts-ignore
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasources: {
            //@ts-ignore
            db: { url: c.env.DATABASE_URL },
        },
    }).$extends(withAccelerate())

    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                description: body.description,
                //@ts-ignore
                authorId: authorId
            }
        })
        return c.json({
            id: post.id,
            msg: "Blog created sucessfully"
        })
    } catch (error) {
        console.log(error)
        return c.json({
            msg: "error while posting the blog"
        })
    }
})

blogRouter.put("/", async (c) => {
    const body = await c.req.json()
    //@ts-ignore
    const authorId = c.get("userId")
    console.log(body.id)
    const prisma = new PrismaClient({
        datasources: {
            //@ts-ignore
            db: { url: c.env.DATABASE_URL },
        },
    }).$extends(withAccelerate())

    try {//@ts-ignore
        console.log(body.id)
        const blog = await prisma.post.update({
            where: {
                //@ts-ignore
                id: body.id,
                //@ts-ignore
                authorId: authorId,
            },
            data: {
                title: body.title,
                description: body.description
            }
        })
        return c.json({
            id: blog.id,
            msg: "Blog updated sucessfully"
        })
    } catch (error) {
        console.log(error)
        return c.json({
            msg: "error while Updating the blog"
        })
    }
})


blogRouter.get("/bulk", async (c) => {
    const body = await c.req.json()
    const prisma = new PrismaClient({
        datasources: {
            //@ts-ignore
            db: { url: c.env.DATABASE_URL },
        },
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findMany({
            where: {
                //@ts-ignore
                id: body.id
            },
        })
        return c.json({
            blog
        })
    } catch (error) {
        console.log(error)
        return c.json({
            msg: "error while posting the blog"
        })
    }

})


blogRouter.get("/:id", async (c) => {
    const body = await c.req.json()
    const id = c.req.param("id")
    const prisma = new PrismaClient({
        datasources: {
            //@ts-ignore
            db: { url: c.env.DATABASE_URL },
        },
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findFirst({
            where: {
                //@ts-ignore
                id: id
            },
        })
        return c.json({
            blog
        })
    } catch (error) {
        console.log(error)
        return c.json({
            msg: "error while posting the blog"
        })
    }

})

