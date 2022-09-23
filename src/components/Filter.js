import React, { useEffect, useState } from 'react';
import { IndividualFilteredCategory } from './IndividualFilteredCategory';
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";


export default function Filter({
    activeCategory, setActiveCategory,
    activeGender, setActiveGender,
    activeAnimal, setActiveAnimal,
    activeHair, setActiveHair,
    activeEyes, setActiveEyes,
    activeChip, setActiveChip,
    activeCollar, setActiveCollar,
    blogs,
    setFilters,
    categoryOption,
    genderOption,
    animalType,
    hairType,
    eyesType,
    idChip,
    idCollar,
}) {

    /*     const applyCategoryFilter = (category) => {
             // Keep all categories if the filter is not set
             // only keep the blogs that meet the category filter
             return !activeCategory || activeCategory == category.name
         }
 
         const filteredBlogs = categoryOption
         .filter(applyCategoryFilter)
          */
    /*
     const [list, setList] = useState(blogs);

     const handleActiveCategory = (event, value) =>
     !value ? null : setActiveCategory(value)

     const handleActiveAnimal = (event, value) =>
     !value ? null : setActiveAnimal(value)

      const handleActiveGender = (event, value) =>
     !value ? null : setActiveGender(value)

      const handleActiveHair = (event, value) =>
     !value ? null : setActiveHair(value)

       const applyFilters = () => {
        let updatedList = blogs

        if(activeCategory) {
            updatedList = updatedList.filter(
            (item) => item.category ===activeCategory
            )
        }
       }

       if(activeAnimal) {
            updatedList = updatedList.filter(
            (item) => item.type ===activeAnimal
            )
        }
       }

       if(activeGender) {
            updatedList = updatedList.filter(
            (item) => item.gender ===activeGender
            )
        }
       }

        if(activeHair) {
            updatedList = updatedList.filter(
            (item) => item.hair ===activeHair
            )
        }
       }

       render applyFilter

    */

    useEffect(() => {
        if (activeAnimal === 'Todos'
            && activeHair === 'Todos'
            && activeEyes === 'Todos'
            && activeCollar === 'No'
        ) {
            setFilters(blogs)
            return
        }

        const filterAnimal = blogs?.filter((item) =>
            activeAnimal === 'Todos' ? item : item.type === activeAnimal
        )

        const filterHair = filterAnimal.filter((item) =>
            activeHair === 'Todos' ? item : item.hair === activeHair
        )

        const filterEyes = filterHair.filter((item) =>
            activeEyes === 'Todos' ? item : item.eyes === activeEyes
        )

        const filterCollar = filterEyes.filter((item) =>
            activeCollar === 'No' ? item : item.idCollar === activeCollar
        )

        setFilters(filterCollar)
    }, [activeAnimal, activeHair, activeEyes, activeCollar, blogs, setFilters])

    return (

        <div>
            <div className="blog-heading text-start pt-3 py-2 mb-4">Filtrar</div>
            <div className='py-3'>
                <div className='row'>
                    <div className='col-6'>
                        <h5 className="font-weight-bold">Categorias</h5>
                        <div className='card-body d-flex justify-content-center'>
                            <div>
                                {categoryOption.map(item => {

                                    if (item.name !== 'Todos') {
                                        return (
                                            <div className="form-check" >
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    value={item.name}
                                                    name="Category"
                                                    onClick={() => setActiveCategory(item.name)}
                                                />
                                                {item.name}
                                            </div>)

                                    } else {
                                        return (
                                            <div className="form-check" >
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    value={item.name}
                                                    name="Category"
                                                    onClick={() => setActiveCategory(item.name)}
                                                />
                                                {item.name}
                                            </div>)
                                    }





                                })}
                            </div>
                        </div>
                    </div>

                    <div className='col-6'>
                        <h5 className="font-weight-bold">Género</h5>
                        <div className='card-body d-flex justify-content-center'>
                            <div>
                                {genderOption.map(item => {

                                    if (item.name !== 'Todos') {
                                        return (
                                            <div className="form-check" >
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    value={item.name}
                                                    name="Gender"
                                                    onClick={() => setActiveGender(item.name)}
                                                />
                                                {item.name}
                                            </div>)

                                    } else {
                                        return (
                                            <div className="form-check" >
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    value={item.name}
                                                    name="Gender"
                                                    onClick={() => setActiveGender(item.name)}
                                                />
                                                {item.name}
                                            </div>)
                                    }





                                })}
                            </div>
                        </div>
                    </div>

                    <div className='py-3'>
                        <div className='row'>
                            <div className='col-6'>
                                <h5 className="font-weight-bold">Tipo de Animal</h5>
                                <div className='card-body d-flex justify-content-center'>
                                    <div>
                                        {animalType.map(item => (
                                            <div className="form-check" >
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    value={item.name}
                                                    name="TipoAnimal"
                                                    onClick={() => setActiveAnimal(item.name)}
                                                />
                                                {item.name}

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className='col-6'>
                                <h5 className='font-weight-bold'>Tipo de pelo</h5>
                                <div className='card-body d-flex justify-content-center'>
                                    <div>
                                        {hairType.map(item => (
                                            <div className='form-check'>
                                                <input
                                                    type="radio"
                                                    className='form-check-input'
                                                    value={item.name}
                                                    name='TipoPelo'
                                                    onClick={() => setActiveHair(item.name)}
                                                />
                                                {item.name}
                                            </div>
                                        ))
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='py-3'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <h5 className="font-weight-bold">Tipo de Ojos</h5>
                                        <div className='card-body d-flex justify-content-center'>
                                            <div>
                                                {eyesType.map((item) => (
                                                    <div className='form-check'>
                                                        <input
                                                            type='radio'
                                                            className='form-check-input'
                                                            value={item.name}
                                                            name='TipoOjos'
                                                            onClick={() => setActiveEyes(item.name)}
                                                        />
                                                        {item.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-6'>
                                        <h5 className="font-weight-bold">¿Tiene collar?</h5>
                                        <div className='card-body d-flex justify-content-center'>
                                            <div>
                                                {idCollar.map((item) => (
                                                    <div className='form-check'>
                                                        <input
                                                            type='radio'
                                                            className='form-check-input'
                                                            value={item.name}
                                                            name='IdCollar'
                                                            onClick={() => setActiveCollar(item.name)}
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
            </div>
        </div>
    );
}