import { Hono } from 'hono'
import {userRouter} from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'


const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SECRET:string
  }
}>()
// We had to do this "<> thingy and declare datatype of DATABASE_URL because typescript dosen't understand that the datatype of our enviroment varable coming from wrangler.toml file"

app.use('/api/*', cors())

app.route("api/v1/user",userRouter);
app.route("api/v1/blog",blogRouter);

app.get("/",(c)=>{
  return c.text("backend running");
})


export default app




