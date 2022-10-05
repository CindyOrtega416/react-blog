import React from "react";
import './singlePost.css';

export default function SinglePost(){
    return(
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img
                    src="https://images.freeimages.com/images/previews/7e5/puppy-1-1519401.jpg"
                    alt=""
                    className="singlePostImg"
                />
                <h1 className="singlePostTitle">
                     Lorem ipsum hola apt
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author: <b>Root</b>
                    </span>
                    <span className="singlePostDate">1 hour ago</span>
                </div>
                <p className="singlePostDescript">
                    Lorem Ipsum is simply dummy
                    text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer
                    took a galley of type and scrambled it to make a type specimen book.
                    Lorem Ipsum is simply dummy
                    text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer
                    took a galley of type and scrambled it to make a type specimen book.
                    Lorem Ipsum is simply dummy
                    text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer
                    took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>
        </div>
    )
}