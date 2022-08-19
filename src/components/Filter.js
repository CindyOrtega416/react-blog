import React, {useEffect, useState} from 'react';
import { IndividualFilteredCategory } from './IndividualFilteredCategory';
import {useParams} from "react-router-dom";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "../firebase";

const categoryOption = [
    {
        id:1,
        name: 'Todos'
    },
    {
        id:2,
        name: 'Perdido'
    },
    {
        id:3,
        name: 'Encontrado'
    },
    {
        id:4,
        name: 'Adopción'
    }
]

const genderOption = [
    {
        id: 1,
        name: 'Todos'
    },
    {
        id: 2,
        name: 'Macho'
    },
    {
        id: 3,
        name: 'Hembra'
    }
]

export default function Filter({ activeCategory, setActiveCategory, activeGender, setActiveGender, blogs, setFilters }) {

    useEffect(()=> {
        if(activeCategory === 'Todos' && activeGender === 'Todos'){
            setFilters(blogs)
            return
        }

        const filterCategory = blogs?.filter((item)=>
            activeCategory === 'Todos' ? item : item.category === activeCategory
        )

        const filterGender = filterCategory.filter((item)=>
            activeGender === 'Todos' ? item : item.gender === activeGender
        )


        setFilters(filterGender)

    }, [activeCategory, activeGender, blogs, setFilters])

    return (
    
        <div>
            <div className="blog-heading text-start pt-3 py-2 mb-4">Filtrar</div>
            <div>
                {categoryOption.map(item=>(
                    <>
                {/*    <select className="catg-dropdown">
                        <option>Categoría</option>
                        <option value={item.name || ""} key={item.id}>
                            {item.name}
                        </option>
                    </select>*/}
                    <button
                        onClick={()=>setActiveCategory(item.name)}
                        key={item.id}
                        className={`bg-white border-2 rounded-lg 
                        px-4 py-2 mr-2 mb-2 ${activeCategory === item.name && ' ' +
                    'bg-primary font-bold'}`} >
                        {item.name}
                    </button>
                    </>
                ))}
            </div>
            <div>
                {genderOption.map(item=> (
                    <button
                        className={`bg-white border-2 rounded-lg 
                        px-4 py-2 mr-2 mb-2 ${activeGender === item.name && ' ' +
                        ' font-bold'}`}
                        onClick={()=>setActiveGender(item.name)}
                        key={item.id}>
                        {item.name}
                    </button>
                ))}
            </div>
            {/*{blogs?.map((item)=> (
                <div className="col-12 py-3">
                    <select
                        className="catg-dropdown"
                    >
                        <option>Category</option>
                       { categoryOption.map((option, index) => (
                            <option value={option || ""} key={index}>
                                {option}
                            </option>
                        ))}
                    </select>

                </div>

            ))}
            */}
        </div>
    );
}

