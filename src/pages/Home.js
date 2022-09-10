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

    let [lastDoc, setLastDoc] = useState()
    let [firstDoc, setFirstDoc] = useState()

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

/*--------------------------Get data - snapshot----------------------*/

    const updateDocs = async (snapshot) => {
     if(snapshot.docs.length > 0)   {
            let list = []

            snapshot.docs.forEach((doc) => {
                list.push({id: doc.id, ...doc.data()})
            })

         lastDoc = await snapshot.docs[snapshot.docs.length - 1]
         firstDoc = await snapshot.docs[0]

//TODO: cuando filtro por categoria o genero no se ordena por tiempo - arreglar

            list.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)

            setBlogs(list)
            setFilters(list)
            setLoading(false)
            setActive("home")
            setLastDoc(lastDoc)
            setFirstDoc(firstDoc)


        }
    }

/*--------------------------Get data - snapshot - prev page------------------*/

    const updateDocsPrev = async (snapshot) => {  //snapshot no tiene .docs acá
                            // porque al .docs se lo paso tmb como parametro
                            // en el boton prev más abajo (para
                            // poder hacer snapshot.docs.reverse)
       if(snapshot.length > 1) {
            let list = []
            snapshot.forEach((doc) => {
                list.push({id: doc.id, ...doc.data()})

            })

           lastDoc = await snapshot[snapshot.length - 1]
           firstDoc = await snapshot[0]

            list.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)

            setBlogs(list)
            setFilters(list)
            setLoading(false)
            setActive("home")
            setLastDoc(lastDoc)
            setFirstDoc(firstDoc)

            console.log("first doc", firstDoc)

        }
    }

    /*----------------------Conditionals and queries----------------------*/

    const fetchData = () => {

      //  let q = null
        const blogRef =  collection(db, "blogs")
        //00
        const allData = async () => {
            const allQuery= query(blogRef, orderBy("timestamp", "desc"))

            onSnapshot(
                allQuery,
                async (snapshot) => {
                    await updateDocs(snapshot)

                    console.log("Condition with all data")
                }, (error) => {
                    console.log(error)
                }
            )
        }



/*        let q = null

        //00
        if (activeCategory !== 'Todos' && activeGender !== 'Todos') {
            q = query(
                collection(db, "blogs"),
                where("category", "==", activeCategory),
                where("gender", "==", activeGender),
                limit(5))

            onSnapshot(
                q,
                async (snapshot) => {

                    await updateDocs(snapshot) //refactored code

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
                where("gender", "!=", activeGender),
                limit(5))

            onSnapshot(
                q,
                async (snapshot) => {
                    await updateDocs(snapshot) //refactored code

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
                where("gender", "==", activeGender),
                limit(5))

            onSnapshot(
                q,
                async (snapshot) => {
                    await updateDocs(snapshot)    //refactored code

                    console.log("Condition nº 3")
                }, (error) => {
                    console.log(error)
                }

            )


        } else {
            /!* You're going to have to pick one field and query that one then filter
            out the other on the client side. Compound Queries documentation is firm on this one.
            *!/
            // firebase no permite compound queries en distintos campos
            //11
            q = query(
                collection(db, "blogs"),
                orderBy("timestamp", "desc"),
                limit(5))

            onSnapshot(
                q,
                async (snapshot) => {
                    await updateDocs(snapshot)

                    console.log("Condition nº 4")
                    console.log("A ver el last doc", lastDoc)

                    console.log("first doc", firstDoc)
                }, (error) => {
                    console.log(error)
                }
            )

            //  lastDoc = documentSnapshot.docs[]


        }*/
    }

/*----------------------Rendering data-------------------------------*/


    useEffect(() => {
        fetchData()

    }, [activeCategory, activeGender])


/*--------------------------Previous Page----------------------------*/

    const previousPage = () => {
/*        let q = null

        //00
        if (activeCategory !== 'Todos' && activeGender !== 'Todos') {
            q = query(
                collection(db, "blogs"),
                where("category", "==", activeCategory),
                where("gender", "==", activeGender),
                endBefore(firstDoc),
                limit(5))

            onSnapshot(
                q,
                async (snapshot) => {
                   // const documents = snapshot.docs.reverse()
                    //await updateDocsPrev(documents)
                    await updateDocs(snapshot)

                    console.log("Conditional Nº 1 - prev")
                }, (error) => {
                    console.log(error)
                }

            )
            //01
        } else if (activeCategory !== 'Todos' && activeGender === 'Todos') {

                q = query(
                    collection(db, "blogs"),
                    where("category", "==", activeCategory),
                    where("gender", "!=", activeGender),
                    endBefore(firstDoc),
                    limit(5))

                onSnapshot(
                    q,
                    async (snapshot) => {
                        //const documents = snapshot.docs.reverse()
                        //await updateDocsPrev(documents)
                        await updateDocs(snapshot)

                        console.log("Condition nº 2 - prev")
                        console.log("nº 2 first doc", firstDoc)
                    }, (error) => {
                        console.log(error)
                    }
                )

            //10
        } else if (activeCategory === 'Todos' && activeGender !== 'Todos') {
            q = query(
                collection(db, "blogs"),
                where("category", "!=", activeCategory),
                where("gender", "==", activeGender),
                endBefore(firstDoc),
                limit(5))

            onSnapshot(
                q,
                async (snapshot) => {
                   // const documents = snapshot.docs.reverse()
                    //await updateDocsPrev(documents)
                    await updateDocs(snapshot)

                    console.log("Condition nº 3 - prev")
                }, (error) => {
                    console.log(error)
                }

            )

        } else {

            q = query(
                collection(db, "blogs"),
                orderBy("timestamp"),
                startAfter(firstDoc),
                limit(5))

            onSnapshot(
                q,
                async (snapshot) => {
                    const documents = snapshot.docs.reverse()
                    await updateDocsPrev(documents)

                    console.log("Condition nº 4 - prev")
                    console.log("A ver el last doc", lastDoc)
                }, (error) => {
                    console.log(error)
                }
            )
        }*/
    }


/*--------------------------Next Page----------------------------*/

    const nextPage = () => {



  /*      if (activeCategory !== 'Todos' && activeGender !== 'Todos') {
            q = query(
                collection(db, "blogs"),
                where("category", "==", activeCategory),
                where("gender", "==", activeGender),
                startAfter(lastDoc),
                limit(5))

            onSnapshot(
                q,
                async (snapshot) => {

                   await updateDocs(snapshot) //refactored code

                    console.log("Conditional Nº 1 - next")
                }, (error) => {
                    console.log(error)
                }

            )
            //01
        } else if (activeCategory !== 'Todos' && activeGender === 'Todos') {
            q = query(
                collection(db, "blogs"),
                where("category", "==", activeCategory),
                where("gender", "!=", activeGender),
                startAfter(lastDoc),
                limit(3))

            onSnapshot(
                q,
                async (snapshot) => {
                   await updateDocs(snapshot) //refactored code

                    console.log("Condition nº 2 - next")
                }, (error) => {
                    console.log(error)
                }

            )
            //10
        } else if (activeCategory === 'Todos' && activeGender !== 'Todos') {
            q = query(
                collection(db, "blogs"),
                where("category", "!=", activeCategory),
                where("gender", "==", activeGender),
                startAfter(lastDoc),
                limit(5))

            onSnapshot(
                q,
                async (snapshot) => {
                    await updateDocs(snapshot)    //refactored code

                    console.log("Condition nº 3 - next")
                }, (error) => {
                    console.log(error)
                }

            )


        } else {

            q = query(
                collection(db, "blogs"),
                orderBy("timestamp", "desc"),
                startAfter(lastDoc),
                limit(5))

            onSnapshot(
                q,
                async (snapshot) => {
                   await updateDocs(snapshot)

                    console.log("Condition nº 4 - next")
                    console.log("A ver el last doc", lastDoc)
                }, (error) => {
                    console.log(error)
                }
            )
        }*/
    }

/*-----------------------------------------------------------------*/

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
                        <button onClick={previousPage}>Anterior</button>
                        <button onClick={nextPage}>Siguiente</button>
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