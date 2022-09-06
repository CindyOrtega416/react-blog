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

export default function Home({ setActive, user }) {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([])
    const [filters, setFilters] = useState([])
    const [tags, setTags] = useState([])
    const [trendBlogs, setTrendBlogs] = useState([])
    const [categoryBlogs, setCategoryBlogs] = useState([])

    const [activeCategory, setActiveCategory] = useState('Todos')
    const [activeGender, setActiveGender] = useState('Todos')
    const [activeAnimal, setActiveAnimal] = useState('Todos')
    const [activeHair, setActiveHair] = useState('Todos')
    const [activeEyes, setActiveEyes] = useState('Todos')
    const [activeChip, setActiveChip] = useState('Todos')
    const [activeCollar, setActiveCollar] = useState('No')

    const getTrendingBlogs = async () => {
        const blogRef = collection(db, "blogs")
        const trendQuery = query(blogRef, where("trending", "==", "yes")) // bring only blogs that match trending == yes
        const querySnapshot = await getDocs(trendQuery)
        let trendBlogs = []
        querySnapshot.forEach((doc) => {
            trendBlogs.push({ id: doc.id, ...doc.data() })
        })
        setTrendBlogs(trendBlogs)

    }

    // console.log("activeCategory", activeCategory)

    /* const getCategoryBlogs = async () => {
         const blogRef = collection(db, "blogs")
         const categoryQuery = query(blogRef, where("category", "==", activeCategory))*/

    /*  const unsubscribe = onSnapshot(categoryQuery, (querySnapshot) => {
          let categoryBlogs = [];
          querySnapshot.forEach((doc) => {
              categoryBlogs.push(doc.data())
          })
         
      })*/
    /*       const querySnapshot = await getDocs(categoryQuery)
           let categoryBlogs = []
           querySnapshot.forEach((doc) => {
               categoryBlogs.push({id: doc.id, ...doc.data() })
           }) 
           setCategoryBlogs(categoryBlogs)
           console.log('CategoryCladdifiedBlog: ', categoryBlogs)
       }
   
   */

    //si esta seleccionado 'todos', como hago para que muestre todas las opciones? como hacer para que 
    //interpretre 'marca todas las opciones'
    /* if(activeCategory === 'Todos' && activeGender === 'Todos' && activeAnimal === 'Todos'){
         
     } */


    useEffect(() => {

        let q = null
        let unsub = null;

        //00
        if (activeCategory !== 'Todos' && activeGender !== 'Todos') {
            q = query(
                collection(db, "blogs"),
                where("category", "==", activeCategory),
                where("gender", "==", activeGender))
            unsub = onSnapshot(
                q,
                (snapshot) => {
                    let list = []
                    let tags = []
                    snapshot.docs.forEach((doc) => {
                        tags.push(...doc.get("tags"))
                        list.push({ id: doc.id, ...doc.data() })
                    })
                    const uniqueTags = [...new Set(tags)]
                    list.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)

                    setTags(uniqueTags)
                    setBlogs(list)
                    setFilters(list)
                    setLoading(false)
                    setActive("home")


                    console.log("Conditional Nº 1")
                }, (error) => {
                    console.log(error)
                }

            )
            //01
        } else if (activeCategory !== 'Todos' && activeGender === 'Todos') {
            q = query(
                collection(db, "blogs"),
                where("category", "==", activeCategory),
                where("gender", "!=", activeGender))
            unsub = onSnapshot(
                q,
                (snapshot) => {
                    let list = []
                    let tags = []
                    snapshot.docs.forEach((doc) => {
                        tags.push(...doc.get("tags"))
                        list.push({ id: doc.id, ...doc.data() })
                    })
                    const uniqueTags = [...new Set(tags)]
                    list.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)

                    setTags(uniqueTags)
                    setBlogs(list)
                    setFilters(list)
                    setLoading(false)
                    setActive("home")

                    console.log("Condition nº 2")
                }, (error) => {
                    console.log(error)
                }

            )
            //10
        } else if (activeCategory === 'Todos' && activeGender !== 'Todos') {
            q = query(
                collection(db, "blogs"),
                where("category", "!=", activeCategory),
                where("gender", "==", activeGender))
            unsub = onSnapshot(
                q,
                (snapshot) => {
                    let list = []
                    let tags = []
                    snapshot.docs.forEach((doc) => {
                        tags.push(...doc.get("tags"))
                        list.push({ id: doc.id, ...doc.data() })
                    })
                    const uniqueTags = [...new Set(tags)]
                    list.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)

                    setTags(uniqueTags)
                    setBlogs(list)
                    setFilters(list)
                    setLoading(false)
                    setActive("home")

                    console.log("Condition nº 3")
                }, (error) => {
                    console.log(error)
                }

            )


        } else {
            /* You're going to have to pick one field and query that one then filter 
            out the other on the client side. Compound Queries documentation is firm on this one.
            */
            // firebase no permite compound queries en distintos campos 
            //11
            q = query(collection(db, "blogs"), orderBy("timestamp", "desc"))
            unsub = onSnapshot(
                q,
                (snapshot) => {
                    let list = []
                    let tags = []
                    snapshot.docs.forEach((doc) => {
                        tags.push(...doc.get("tags"))
                        list.push({ id: doc.id, ...doc.data() })
                    })
                    const uniqueTags = [...new Set(tags)]
                    setTags(uniqueTags)
                    setBlogs(list)
                    setFilters(list)
                    setLoading(false)
                    setActive("home")

                    console.log("Condition nº 4")
                }, (error) => {
                    console.log(error)
                }
            )
        }

    }, [activeCategory, activeGender])






    /*useEffect(() => {
        getTrendingBlogs()
        const unsub = onSnapshot(
            query(collection(db, "blogs"), orderBy("timestamp", "desc")),
            (snapshot) => {
                let list = []
                let tags = []
                snapshot.docs.forEach((doc) => {
                    tags.push(...doc.get("tags"))
                    list.push({id: doc.id, ...doc.data()})
                })
                const uniqueTags = [...new Set(tags)]
                setTags(uniqueTags)
                setBlogs(list)
                setFilters(list)
                setLoading(false)
                setActive("home")
 
            }, (error) => {
                console.log(error)
            }
        )
 
        return () => {
            unsub()
            getTrendingBlogs()
        } */
    //  getCategoryBlogs()

    /*      const unsub = onSnapshot(
              query(collection(db, "blogs"), (activeCategory !== 'Todos') ? where("category", "==", activeCategory) : null),
              (snapshot) => {
                  let list = []
                  let tags = []
                  snapshot.docs.forEach((doc) => {
                      tags.push(...doc.get("tags"))
                      list.push({ id: doc.id, ...doc.data() })
                  })
                  const uniqueTags = [...new Set(tags)]
                  setTags(uniqueTags)
                  setBlogs(list)
                  setFilters(list)
                  setLoading(false)
                  setActive("home")
  
              }, (error) => {
                  console.log(error)
              }
          )
  
          return () => {
              unsub()
              // getCategoryBlogs()
          }
  
      }, [activeCategory])
  */

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
                            filters={filters}
                            blogs={blogs}
                            user={user}
                            handleDelete={handleDelete}
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
                        <Tags tags={tags} />
                        <MostPopular blogs={blogs} />
                    </div>
                </div>
            </div>
        </div>

    )
}