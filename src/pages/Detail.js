import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import { db } from "../firebase";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";

export default function Detail({ setActive }) {
    const { id } = useParams()
    const [blog, setBlog] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [tags, setTags] = useState([])

    useEffect(() => {
        const getBlogsData = async () => {
            const blogRef = collection(db, "blogs")
            const blogs = await getDocs(blogRef)
            setBlogs(blogs.docs.map((doc) => ({ id: doc, ...doc.data() })))
            let tags = []
            blogs.docs.map((doc) => tags.push(...doc.get("tags")))
            let uniqueTags = [...new Set(tags)]
            setTags(uniqueTags)
        }
        getBlogsData()
    }, [])

    useEffect(()=> {
        id && getBlogDetail()
    },[id])

    const getBlogDetail = async () => {
        const docRef = doc(db, "blogs", id)
        const blogDetail = await getDoc(docRef)
        setBlog(blogDetail.data())
        setActive(null)

    }
    return(
        <section className="vh-100" style={{backgroundColor: '#f4f5f7'}}>
            <div className="container py-5 h-100" >
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-6 mb-4 mb-lg-0">
                        <div className="card mb-3" style={{borderRadius: '.5rem'}}>
                            <div className="row g-0">
                                <div
                                    className="col-md-4 gradient-custom text-center text-white"
                                    style={{borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem'}}
                                >
                                    <img
                                        src={blog?.imgUrl}
                                        className="img-fluid my-5 "
                                        style={{width: '200px', height: '200px'}}
                                     />
                                    <h5 style={{color: 'black'}}>{blog?.category}</h5>
                                    <span style={{color: 'black'}}>{blog?.author}</span>
                                 {/*   <i className="far fa-edit mb-5"></i>*/}
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-4">
                                        <h6>Information</h6>
                                        <hr className="mt-0 mb-4"/>
                                            <div className="row pt-1">
                                                <div className="col-4 mb-3">
                                                    <h6>Animal</h6>
                                                    <p className="text-muted">{blog?.type}</p>
                                                </div>
                                                <div className="col-4 mb-3">
                                                    <h6>Breed</h6>
                                                    <p className="text-muted">{blog?.breed}</p>
                                                </div>
                                                <div className="col-4 mb-3">
                                                    <h6>Phone</h6>
                                                    <p className="text-muted">{blog?.phone}</p>
                                                </div>
                                            </div>
                                            <h6>Extra information</h6>
                                            <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                                <div className="col-4 mb-3">
                                                    <h6>Gender</h6>
                                                    <p className="text-muted">{blog?.gender}</p>
                                                </div>
                                        <div className="col-4 mb-3">
                                            <h6>Hair Type</h6>
                                            <p className="text-muted">{blog?.hair}</p>
                                        </div>
                                        <div className="col-4 mb-3">
                                            <h6>Eye Color</h6>
                                            <p className="text-muted">{blog?.eyes}</p>
                                        </div>
                                        </div>
                                        <div className="row pt-1">
                                            <div className="col-4 mb-3">
                                                <h6>Id Collar?</h6>
                                                <p className="text-muted">{blog?.idCollar}</p>
                                            </div>
                                            <div className="col-4 mb-3">
                                                <h6>Id Chip?</h6>
                                                <p className="text-muted">{blog?.idChip}</p>
                                            </div>
                                            <div className="col-4 mb-3">
                                                <h6>Date of event?</h6>
                                                <p className="text-muted">{blog?.timestamp.toDate().toDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start">
                                        <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                                        <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                                        <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        /*<div className="single">
            <div
                className="blog-title-box"
                style={{backgroundImage: `url('${blog?.imgUrl}')`}}
            >
                <div className="overlay"></div>
                <div className="blog-title">
                    <span>{blog?.timestamp.toDate().toDateString()}</span>
                    <h2>{blog?.title}</h2>
                </div>
            </div>
            <div className="container-fluid pb-4 pt-4 padding blog-single-content">
                <div className="container padding">
                    <div className="row mx-0">
                        <div className="col-md-8">
                            <span className="meta-info text-start">
                                By <p className="author">{blog?.author}</p> -&nbsp;
                                {blog?.timestamp.toDate().toDateString()}
                            </span>
                            <p className="text-start">{blog?.description}</p>
                        </div>
                        <div className="col-md-3">
                            <Tags tags={tags}/>
                            <MostPopular blogs={blogs} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
*/
    )
}