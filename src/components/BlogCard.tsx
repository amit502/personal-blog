import React from "react";
import { IBlog } from "../types/BlogTypes";

const BlogCard = (blog: IBlog) => {
    return(
        <div className="col-lg-4 col-md-6 col-12">
            <div className="card">
                <div className="card-title">
                    <h4 className="mb-0">{blog.title}</h4>
                </div>
                <div className="card-author">
                    <span>
                        {blog.User?.firstName + " " + blog.User?.lastName }
                        {blog.createdAt ? " | " + new Date(blog.createdAt || "").toLocaleDateString(): ""}
                    </span>
                </div>
                <div className="card-subtitle">
                    <span>{blog.subtitle}</span>
                </div>
                <div className="card-content">
                    <p>
                        {blog.content?.substring(0,200)}{"..."}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BlogCard;