import React, {useEffect, useState} from 'react';
import './home.css';
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import {useLocation} from "react-router-dom";

export default function Home(){

    const [posts, setPosts] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const {search} = useLocation();

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    useEffect(()=> {
        const fetchPosts = async () =>{
            const res = await axios.get("/posts" + search)
            setPosts(res.data.posts)
            setNumberOfPages(res.data.totalPages);
            console.log('response', res)
        }

        fetchPosts();
    }, [search])

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
      };
    
      const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
      };

    return(
        <>
            <Header />
            <div className="home">
                <Posts posts={posts}/>
                <Sidebar posts={posts}/>
            </div>
        </>

    )
}