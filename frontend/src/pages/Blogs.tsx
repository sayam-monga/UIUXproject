// import AppBar from "../components/AppBar"
// import BlogCard from "../components/BlogCard"
// import { useBlogs } from "../hooks"

// const Blogs = () => {
//     const{loading, blogs} = useBlogs();
//     console.log(blogs);

//     if(loading){
//         return <div>
//             loading...
//         </div>
//     }

//     return (
//     <div className="overflow-x-hidden">
//     <AppBar/>
//     <div className="w-screen flex items-center justify-center">
//         <div className="flex flex-col w-full md:max-w-6xl" >
//         {blogs.map((blog,index)=><BlogCard key={index} id={blog.id} username={blog.author.username} title={blog.title} publishedDate="Mar 12,2024"  content={blog.content}/>)}

//         </div>
//     </div>
//     </div>
//   )
// }

import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { InfinitySpin } from "react-loader-spinner";
const Blogs = () => {
  const { loading, blogs } = useBlogs();
  console.log(blogs);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <InfinitySpin
          //@ts-ignore
          height="150"
          width="150"
          color="black"
          ariaLabel="loading"
        />
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <AppBar />
      <div className="w-screen flex items-center justify-center">
        <div className="flex flex-col w-full md:max-w-6xl">
          {blogs.map((blog, index) => (
            <BlogCard
              key={blog.id ?? index} // Ensure blog.id is not undefined
              id={blog.id ?? 0} // Assuming id is a number, replace 0 with a suitable default value if needed
              username={blog.author?.name ?? "Unknown"} // Use optional chaining to avoid null/undefined error
              title={blog.title ?? "Untitled"} // Use default value if title is undefined
              publishedDate="Mar 12, 2024" // Assuming this is a static value for now
              content={blog.content ?? ""} // Use default value if content is undefined
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
