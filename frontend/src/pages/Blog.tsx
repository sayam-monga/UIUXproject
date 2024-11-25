import { useParams } from "react-router-dom";
import AppBar from "../components/AppBar";
import { useGetBlog } from "../hooks";
import { InfinitySpin } from "react-loader-spinner";
interface Blog {
  id: number; // Add 'id' as a number
  title: string;
  content: string;
  author?: string; // Optionally include author if needed
}

const Blog = () => {
  const { id } = useParams();
  let newID = "23";
  if (id) {
    newID = id;
  }

  const { loading, blog } = useGetBlog({
    //@ts-ignore
    id: parseInt(newID),
  });

  if (loading || !blog) {
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
    <div>
      <AppBar />
      <div className="w-screen flex justify-center items-center">
        <div className="grid grid-cols-12 max-w-8xl sm:p-10 p-5">
          <div className="col-span-12 w-full sm:col-span-8 flex flex-col sm:border-r-2 pr-3">
            <div className="font-bold text-5xl mb-5">{blog.title}</div>
            <div className="text-xl text-slate-500 mb-5">
              Posted on November 26,2024
            </div>

            <div className="text-lg text-gray-600">{blog.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
