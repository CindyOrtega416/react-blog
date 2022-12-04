import React, {useEffect, useState} from 'react';
import './home.css';
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";

export default function Home() {

    const [posts, setPosts] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const {search} = useLocation();

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(`/posts?page=${pageNumber}` + search)
            setPosts(res.data.posts)
            setNumberOfPages(res.data.totalPages);
            console.log('response', res)
        }

        fetchPosts();
    }, [search, pageNumber])

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
        console.log('pageNumber', pageNumber)

    };

    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
        console.log('pageNumber', pageNumber)
    };

    return (
        <>
            <Header/>
            <div className="home">
                <Posts posts={posts}/>
                <Sidebar
                    posts={posts}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    numberOfPages={numberOfPages}
                    setNumberOfPages={setNumberOfPages}
                />
            </div>

            {
                numberOfPages > 1 ? (
                    <Link to={`/?page=${pageNumber}`} onClick={gotoPrevious}>
                        Anterior
                    </Link>

                ) : (
                    <></>
                )
            }
            {pages.map((pageIndex) => (
                <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                    <Link to={`/?page=${pageIndex + 1}`}>
                        {pageIndex + 1}
                    </Link>
                </button>

            ))}

            {
                numberOfPages > 1 ? (
                    <Link to={`/?page=${pageNumber + 2}`} onClick={gotoNext}>
                        Siguiente
                    </Link>

                ) : (
                    <></>
                )
            }
        </>

    )
}