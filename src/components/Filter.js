import React, { useState } from 'react';
import { IndividualFilteredCategory } from './IndividualFilteredCategory';

const categoryOption = [
    "Perdido",
    "Encontrado",
    "Adopción"
]

export default function Filter({ setActive }) {

    const [filteredCategory, setFilteredCategory] = useState([])


    return (
    
        <div>
            <div className="blog-heading text-start pt-3 py-2 mb-4">Filtrar</div>
    
            <div className="col-12 py-3">
                    <select
                        className="catg-dropdown"
                    >
                        <option>Categoria</option>
                        {categoryOption.map((option, index) => (
                            <option value={option || ""} key={index}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                {
                    filteredCategory.length > 0&&(
                        <IndividualFilteredCategory />
                    )}
                    {
                        filteredCategory.length < 1&&(
                           <>
                           {blog?.category}
                           </> 
                        )
                    }
            {
                blogs?.map((item)=> {
                    

                })
            }
        </div>
    );
}

