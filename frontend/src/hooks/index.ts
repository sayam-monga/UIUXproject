import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

// Define the Blog type to be used in both hooks
interface Blog {
  title: string;
  content: string;
  id:any;
  author:any;
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]); // Set correct typing for blogs

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs); // Ensure response data matches the Blog[] type
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};

export const useGetBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null); // Use Blog | null as the type

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlog(response.data.blog); // Assuming the API returns { blog: Blog }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error); // Log the error message
        setLoading(false);
      });
  }, [id]);

  return {
    blog,
    loading,
  };
};
