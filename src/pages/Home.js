import React, { useEffect, useState } from "react";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query, serverTimestamp,
    where,
    limit,
    startAfter,
    endBefore,
    limitToLast
} from "firebase/firestore";
import { db } from "../firebase";
import BlogSection from "../components/BlogSection";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";
import Trending from "../components/Trending";
import Filter from "../components/Filter";
import { categoryOption, genderOption, animalType, hairType, eyesType, idChip, idCollar } from "../utility/FilterOptions";
import axios from "axios";

export default function Home({ setActive, user }) {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([])
    const [filters, setFilters] = useState([])
    const [trendBlogs, setTrendBlogs] = useState([])

    const [activeCategory, setActiveCategory] = useState('Todos')
    const [activeGender, setActiveGender] = useState('Todos')
    const [activeAnimal, setActiveAnimal] = useState('Todos')
    const [activeHair, setActiveHair] = useState('Todos')
    const [activeEyes, setActiveEyes] = useState('Todos')
    const [activeChip, setActiveChip] = useState('Todos')
    const [activeCollar, setActiveCollar] = useState('No')

    const [posts, setPosts] = useState([]);

    useEffect(()=> {
        const fetchPosts = async ()=> {
           try{
               const res = await axios.get("/posts")
               setPosts((res.data))
           } catch(err){
               console.log(err)
           }
        }

        fetchPosts()
    },[])


    if (loading) {
        return <Spinner />
    }


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete the blog?")) {
            try {
                setLoading(true)
                await deleteDoc(doc(db, "blogs", id))
                toast.success("Blog deleted successfully")
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
    }


    console.log("blogs", blogs)

    return (
        <div className="container-fluid pb-4 pt-4 padding">
            <div className="container padding">
                <div className="row mx-0">
                    <Trending blogs={trendBlogs} />
                    <div className="col-md-8">
                        <BlogSection
                            posts={posts}
                            user={user}
                        />
                    </div>
                    <div className="col-md-3">
                        <Filter
                            blogs={blogs}
                            setFilters={setFilters}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            activeGender={activeGender}
                            setActiveGender={setActiveGender}
                            activeAnimal={activeAnimal}
                            setActiveAnimal={setActiveAnimal}
                            activeHair={activeHair}
                            setActiveHair={setActiveHair}
                            activeEyes={activeEyes}
                            setActiveEyes={setActiveEyes}
                            activeCollar={activeCollar}
                            setActiveCollar={setActiveCollar}
                            categoryOption={categoryOption}
                            genderOption={genderOption}
                            animalType={animalType}
                            hairType={hairType}
                            eyesType={eyesType}
                            idCollar={idCollar}
                        />
                      {/*  <Tags tags={tags} />*/}
                        <MostPopular blogs={blogs} />
                    </div>
                </div>
            </div>
        </div>

    )
}