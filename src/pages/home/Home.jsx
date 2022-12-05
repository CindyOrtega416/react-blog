import React, {useEffect, useState} from 'react';
import './home.css';
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import {Link, useLocation, useSearchParams} from "react-router-dom";

export default function Home() {

    const [posts, setPosts] = useState([])
    const [data, setData] = useState([])
    // page number is showned to start at 1 but from backend it actually starts from 0
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const {search} = useLocation();

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(`/posts?page=${pageNumber}` + search)
            setData()
            setPosts(res.data.posts)
            setNumberOfPages(res.data.totalPages);
            console.log('response', pages)
        }

        fetchPosts();
    }, [search, pageNumber])

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));


    };

    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));

        console.log('pageNumber', pageNumber)
    };
    console.log('pageNumber', pageNumber)
    console.log('Number of fucking pages', numberOfPages)
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
                    pageNumber > 0 ? (
                        <button disabled={false}>
                            <Link to={`/?page=${pageNumber}`}
                                  onClick={gotoPrevious}>
                                Anterior
                            </Link>
                        </button>
                    ) : (
                        <button disabled={true}>
                            Anterior
                        </button>
                    )
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
                    pageNumber === (numberOfPages - 1) ? (
                        <button disabled={true}>
                            Siguiente
                        </button>
                    ) : (
                        <button disabled={false}>
                            <Link
                                to={`/?page=${pageNumber + 2}`}
                                onClick={gotoNext}>
                                Siguiente
                            </Link>
                        </button>
                    )
                ) : (
                    <></>
                )
            }
        </>

    )
}