import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";

const BlogSection = ({ posts, user, handleDelete, filters }) => {
    const userId = user?.uid;
    return (
        <div>
            <div className="blog-heading text-start py-2 mb-4">Reportes</div>
            {posts?.map((item) => (
                <div className="row pb-4" key={item.id}>
                    <div className="col-md-5">
                        <div className="hover-blogs-img">
                            <div className="blogs-img">
                                <img src={item.imgUrl} alt={item.title} />
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="text-start">
                            <h6 className="category catg-color">{item.category}</h6>
                            <span className="title py-2">{item.title}</span>
                            <span className="meta-info">
                                <p className="author">{item.author}</p> -&nbsp;
                                {item.timestamp.toDate().toDateString()}
                            </span>
                        </div>
                        <div className="short-description text-start">
                            {excerpt(item.description, 120)}
                        </div>
                        <Link to={`/detail/${item.id}`}>
                            <button className="btn btn-read">Ver más</button>
                        </Link>
                        {userId && item.userId === userId && ( // I can delete a blog (and view the delete icon) only if I have a userId and the userId is equal to the userId linked to the blog (item)
                            <div style={{ float: "right" }}>
                                <FontAwesome
                                    name="trash"
                                    style={{ margin: "15px", cursor: "pointer" }}
                                    size="2x"
                                    onClick={() => handleDelete(item.id)}
                                />
                                <Link to={`/update/${item.id}`}>
                                    <FontAwesome
                                        name="edit"
                                        style={{ cursor: "pointer" }}
                                        size="2x"
                                    />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogSection;