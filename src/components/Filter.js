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
            <div className='py-3'>
                <div className='row'>
                    <div className='col-6'>
                        <h5 className="font-weight-bold">Categorias</h5>
                            <div className='card-body d-flex justify-content-center'>
                                <div>
                                    {categoryOption.map(item=>(
                                        <div className="form-check" >
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                value={item.name}
                                                name="Category"
                                                onClick={()=>setActiveCategory(item.name)}
                                            />
                                            {item.name}
                                        
                                        </div>
                        ))}
                                </div>
                            </div>
                    </div>

                            <div className='col-6'>
                                <h5 className="font-weight-bold">Género</h5>
                                    <div className='card-body d-flex justify-content-center'>
                                        <div>
                                            {genderOption.map(item=> (
                                                <div className="form-check" >
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        value={item.name}
                                                        name="Género"
                                                        onClick={()=>setActiveGender(item.name)}
                                                    />
                                                    {item.name}
                                    
                                    </div>
                                ))}
                                        </div>
                                    </div>
                            </div>
                </div>
            </div> 
        </div> 
    

    );
}

