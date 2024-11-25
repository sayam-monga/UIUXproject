import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,decode, verify} from 'hono/jwt'
import { signUpInput,signInInput } from "@kulsoham/medium-common";

const userRouter  = new Hono<{
    Bindings:{
      DATABASE_URL:string
      JWT_SECRET:string
    }
  }>()

  userRouter.post("signup", async (c) => {
    const body = await c.req.json();
    const { success } = signUpInput.safeParse(body);
    
    console.log(body.username);
    console.log(body.email);
    console.log(body.password);
    
    if (!success) {
      return c.json({
        msg: "Incorrect Inputs",
      });
    }
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const user = await prisma.user.create({
        data: {
          //@ts-ignore
          name: body.username,
          email: body.email,
          password: body.password,
        },
      });
  
      //@ts-ignore
      const jwt = await sign({ id: user.id, username: user.username }, c.env.JWT_SECRET);
      
      // Returning token in a consistent format
      //@ts-ignore
      return c.json({ token: jwt, user: { username: user.username, email: user.email, id: user.id } }, 200);
    } catch (error) {
      //@ts-ignore
      return c.json(error, 411);
    }
  });
  

  userRouter.post('signin', async (c) => {
    const body = await c.req.json();
    const { success } = signInInput.safeParse(body);
    const email = body.email;
    const password = body.password;
  
    if (!success) {
      return c.json({
        msg: "Incorrect Inputs",
      });
    }
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
          password: password,
        },
      });
  
      if (!user) {
        c.status(403);
        return c.json({
          err: "User Not found",
        });
      }
  
      const jwt = await sign(
        {
          id: user.id,
          //@ts-ignore
          name: user.username,
        },
        c.env.JWT_SECRET
      );
      
      c.status(200);
      // Returning token in a consistent format
      return c.json({
        token: jwt,
        //@ts-ignore

        user: { username: user.username, email: user.email, id: user.id },
        msg: "signIn successfull",
      });
    } catch (error) {
      console.error(error);
      c.status(500);
      return c.json({ msg: "Internal server error" });
    }
  });
  
      export {userRouter}