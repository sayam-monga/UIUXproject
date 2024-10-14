import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode , sign , verify} from 'hono/jwt';
import { userRouter } from '../routes/user';
import { bookRouter } from '../routes/blog';
import { cors } from 'hono/cors';
const app = new Hono<{
  Bindings : {
    DATABASE_URL:string,
    JWT_SECRET:string
  }
  Variables :{
    prisma:any
  }
}>()
app.use('/*' , cors());
app.route('/api/v1/user' ,userRouter);
app.route('/api/v1/book' ,bookRouter);
// app.use('/api/v1/blog/*' , async (c,next)=>{
//   const header = c.req.header("Authorization") || "";
//   const  token = header.split(" ")[1];

//   const response = await verify(header,c.env.JWT_SECRET);
//   if(response.id){
//     next();
//   }
//   else{
//     c.status(403);
//     return c.json({error:"unauth"});
//   }

// })

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })
// app.post("/api/v1/signup", async (c)=>{
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
// }).$extends(withAccelerate())
// const body = await c.req.json();
// try {
//   const user = await prisma.user.create({
//     data: {
//       email: body.email,
//       password: body.password
//     }
//   });
//   const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
//   return c.json({ jwt });
// } catch(e) {
//   c.status(403);
//   return c.json({ error: "error while signing up" });
// }
// })
// app.post("/api/v1/signin",async (c)=>{
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate())
//   const body = await c.req.json();
//   const user = await prisma.user.findUnique({
//     where:{
//       email:body.email,
//       password:body.password
//     }
//   })
//   if(!user){
//     c.status(403);
//     return c.json({ error: "user not found" });
//   }
//   const jwt = await sign({id:user.id} , c.env.JWT_SECRET);
//   return c.json({jwt});

// })
// app.get("/api/v1/blog/:id",(c)=>{
//   const id = c.req.param('id');
//   console.log(id);
//   return c.text("blog");
// })
// app.put("/api/v1/blog",(c)=>{

//   return c.text("blog put");
// })
// app.post("/api/v1/blog",(c)=>{

//   return c.text("blog put");
// })

export default app
