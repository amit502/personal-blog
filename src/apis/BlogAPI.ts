import axios from "axios";

export const fetchAllBlogs = async () => {
  return await axios({
        baseURL: process.env.REACT_APP_BASE_URL,
        method: "GET",
        url: `blog/fetchAllBlogs`,
      });
}

export const fetchBlogs = async (page:number,size:number) => {
    return await axios({
          baseURL: process.env.REACT_APP_BASE_URL,
          method: "GET",
          url: `blog/fetchBlogs?page=${page}&size=${size}`,
        });
}

export const postBlog = async (body:any) => {
  return await axios({
        baseURL: process.env.REACT_APP_BASE_URL,
        method: body.id ? "PUT" : "POST",
        url: body.id ? `blog/updateBlog/${body.id}` : `blog/createBlog`,
        data: body
      });
}

export const deleteBlog = async (body:any) => {
  return await axios({
        baseURL: process.env.REACT_APP_BASE_URL,
        method: "DELETE",
        url: `blog/deleteBlog/${body.id}`,
        data: body
      });
}