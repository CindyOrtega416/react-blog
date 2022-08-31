import React, {useEffect, useState} from 'react';
import { IndividualFilteredCategory } from './IndividualFilteredCategory';
import {useParams} from "react-router-dom";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "../firebase";


export default function Filter({ 
    activeCategory, setActiveCategory, 
    activeGender, setActiveGender, 
    activeAnimal, setActiveAnimal,
    blogs, 
    setFilters, 
    categoryOption,
    genderOption,
    animalType,
     }) {

  /*  useEffect(()=> {
        if(activeCategory === 'Todos' && activeGender === 'Todos' && activeAnimal === 'Todos'){
            setFilters(blogs)
            return
        }

        const filterCategory = blogs?.filter((item)=>
            activeCategory === 'Todos' ? item : item.category === activeCategory
        )

        const filterGender = filterCategory.filter((item)=>
            activeGender === 'Todos' ? item : item.gender === activeGender
        )

        const filterAnimal = filterGender.filter((item)=>
            activeAnimal === 'Todos' ? item : item.type === activeAnimal
        )


        setFilters(filterGender)

    }, [activeCategory, activeGender, activeAnimal, blogs, setFilters])] */

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

                            <div className='py-3'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <h5 className="font-weight-bold">Tipo de Animal</h5>
                                            <div className='card-body d-flex justify-content-center'>
                                                <div>
                                                    {animalType.map(item=> (
                                                        <div className="form-check" >
                                                            <input
                                                                type="radio"
                                                                className="form-check-input"
                                                                value={item.name}
                                                                name="TipoAnimal"
                                                                onClick={()=>setActiveAnimal(item.name)}
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
            </div> 
        </div> 
    );
}

