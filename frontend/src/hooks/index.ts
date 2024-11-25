import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export const useBlogs =  () =>{
    const[loading , setLoading] = useState(true);
    const[blogs,setBlogs] = useState([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/blog/bulk`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then(response=>{
            setBlogs(response.data.blogs)
            setLoading(false);
        }
        )
    },[])

    return {
        loading,
        blogs
    }
}

export const useGetBlog = ({id}:{id:string}) =>{
    const [loading,setLoading] = useState(true);
    const[blog, setBlog] = useState(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then(response => {
            console.log(response.data.blog)
            setBlog(response.data.blog);
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching blog:", error);  // Log the error message
            setLoading(false);
        })
    }, [id])

    return{
        blog,
        loading
    }
}