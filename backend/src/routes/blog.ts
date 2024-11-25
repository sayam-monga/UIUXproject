import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,decode, verify} from 'hono/jwt'
import { createBlogInput,updateBlogInput } from "@kulsoham/medium-common";

const blogRouter  = new Hono<{
    Bindings:{
      DATABASE_URL:string
      JWT_SECRET:string
    },
    Variables:{
      userId:string
    }
  }>()

  // middleware for user verification
  blogRouter.use("/*", async (c, next) => {
	try {
	  const authHeader = c.req.header("authorization") || "";
	  if (!authHeader.startsWith("Bearer ")) {
		c.status(401);
		return c.json({ msg: "Invalid authorization format. Use 'Bearer <token>'" });
	  }
  
	  const token = authHeader.split(" ")[1]; // Extract the token
	  const user = await verify(token, c.env.JWT_SECRET);
  
	  if (user) {
		//@ts-ignore
		c.set("userId", user.id as string); // Set the userId in the context
		await next(); // Proceed to the next middleware or handler
	  } else {
		c.status(403);
		return c.json({ msg: "Invalid or expired token" });
	  }
	} catch (error) {
	  console.error("Authentication error:", error);
	  c.status(403);
	  return c.json({ msg: "Authentication failed" });
	}
  });
  
  blogRouter.post("/", async (c) => {
	const body = await c.req.json();
	const authorID = c.get("userId"); // Matches the schema's field name
	
	if (!authorID) {
	  c.status(403);
	  return c.json({ msg: "User not authorized" });
	}
  
	// Validate input using zod schema
	const validation = createBlogInput.safeParse(body);
  
	if (!validation.success) {
	  c.status(400);
	  return c.json({
		msg: "Validation error",
		errors: validation.error.errors, // Include detailed validation errors
	  });
	}
  
	const prisma = new PrismaClient({
	  datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
  
	try {
	  // Create the post
	  const post = await prisma.post.create({
		data: {
		  content: body.content,
		  title: body.title,
		  authorID, // Matches the schema's field name
		},
	  });
  
	  // Respond with success
	  c.status(201);
	  return c.json({
		post,
		msg: "Post created successfully",
	  });
	} catch (error) {
	  console.error("Error while creating post:", error);
  
	  c.status(500); // Internal server error
	  return c.json({
		msg: "An error occurred while posting",
		error: error instanceof Error ? error.message : error,
	  });
	} finally {
	  // Ensure PrismaClient is disconnected
	  await prisma.$disconnect();
	}
  });
  
  



blogRouter.put('/', async(c) => {
  const body = await c.req.json();
  const {success} = updateBlogInput.safeParse(body)
  if(!success){
    return c.json({
      msg:"invalid inputs update failed"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
	      //@ts-ignore

    const blogPost = await prisma.post.update({
      where:{
        id:body.id
      },
      data:{
        title:body.title,
        content:body.content,
      }
    })
    if(blogPost){
      c.status(200)
      return c.json({
        blogId:blogPost.id,
        msg:"Blog updated successfully"
      })
    }
  } catch (error) {
    c.status(403)
    return c.json({
      error:error,
      msg:"error while updating the blog"
    })
  }
  })


  
  blogRouter.get("/bulk",async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    try {
		      //@ts-ignore
			  const allBlogs = await prisma.post.findMany({
				select: {
				  content: true,
				  title: true,
				  id: true,
				  author: {
					select: {
					  name: true,
					},
				  },
				},
			  });
			  
			  const mappedBlogs = allBlogs.map((blog) => ({
				...blog,
				author: {
				  username: blog.author.name,
				},
			  }));
			  
			  
      if(allBlogs){
        c.status(200)
        return c.json({
          blogs:allBlogs,
        })
      }
    } catch (error) {
      c.status(403)
      return c.json({
        error:error,
        msg:"Error while fetching the blogs"
      })
    }
  })


  blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
    
        return c.json({
            blog
        });
    } catch(e) {
        c.status(411); // 4
        return c.json({
            message: "Error while fetching blog post"
        });
    }
})

export {blogRouter}