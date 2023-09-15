import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import './home.css';
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import {useLocation, useSearchParams} from "react-router-dom";
import Footer from '../../components/Footer/Footer';
import queryString from 'query-string';

export default function Home() {

    const [posts, setPosts] = useState([])
    const [data, setData] = useState([])
    const [pageNumber, setPageNumber] = useState();
    const [currentPage, setCurrentPage] = useState();
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [previousPage, setPreviousPage] = useState();
    const [nextPage, setNextPage] = useState();
    const [clicked, setClicked] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState();
    let {search} = useLocation();
    
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/posts" + search)
            //const res = await axios.get('/posts?page=1')
            setData()
            setPosts(res.data.results.resultPosts)
            setPreviousPage(res.data.results.previous ? res.data.results.previous.page : null)
            setNextPage(res.data.results.next ? res.data.results.next.page : null)
            setNumberOfPages(res.data.totalPages);
            setCurrentPage(res.data.results.page);
        }

        fetchPosts();
    }, [search, numberOfPages, pageNumber, previousPage, nextPage, currentPage, clicked])

    console.log("Número de página", currentPage)

    //se puede refactorizar con query-string, pasar el valor a la var query y filtrar las palabras para evitar repetidos
    const stringify = useMemo(()=> queryString.stringify(clicked), [clicked])
    
    // const queryString = Object.keys(clicked).map((key) => {
    //     return key + '=' + clicked[key]
    // }).filter((e, i, a) => a.indexOf(e) === i)
    // .join('&')
      
    
    console.log("La query desde la home es: ", stringify )

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
                        queryString={queryString}
                        clicked={clicked}
                        setClicked={setClicked}
                        currentPage={currentPage}
                        query={query}
                        setQuery={setQuery}
                        stringify={stringify}
                    />
                </div>
                <Footer 
                numberOfPages={numberOfPages} 
                previousPage={previousPage} 
                nextPage={nextPage}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber} 
                currentPage={currentPage}
                stringify={stringify}
                search={search}
            />
           
        </>

    )
}