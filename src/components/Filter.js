import React, { useState } from 'react';

export default function Filter({ blogs }) {

    const [filteredAnimal, setFilteredAnimal] = useState([])
    return (
    
        <div>
            <div className="blog-heading text-start pt-3 py-2 mb-4">Filtrar</div>
            {
                blogs?.map((item)=> {

                })
            }
        </div>
    );
}

