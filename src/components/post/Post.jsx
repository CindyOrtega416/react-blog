import React from "react";
import './post.css';
import {Link} from "react-router-dom";

export default function Post({post}){
    return(
        <div className="post">
            {post.photo && (
                <img
                    className="postImg"
                    src={post.photo}
                    alt=""
                />
            )}

            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">{post.category}</span>
                </div>
                   <Link className="link" to={`/post/${post._id}`}>
                       <span className="postTitle">{post.title}</span>
                   </Link>
                <hr />
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDescript">
                {post.description}
            </p>
        </div>
    )
}