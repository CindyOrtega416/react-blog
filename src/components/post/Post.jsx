import React from "react";
import './post.css';
import {Link} from "react-router-dom";

export default function Post(){
    return(
        <div className="post">
            <img
                className="postImg"
                src="https://images.freeimages.com/images/previews/7e5/puppy-1-1519401.jpg"
                alt=""
                />
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">Music</span>
                    <span className="postCat">Life</span>
                </div>
                <span className="postTitle">
                   <Link className="link" to="/post/:postId">Lorem ipsum hola sit amet</Link>
                </span>
                <hr />
                <span className="postDate">1 hour ago</span>
            </div>
            <p className="postDescript">
                Lorem Ipsum is simply dummy
                text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a type specimen book.
            </p>
        </div>
    )
}