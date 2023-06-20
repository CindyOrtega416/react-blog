import React from 'react'
import { Link } from 'react-router-dom'

export default function PreviousButton({ previousPage, setPageNumber, stringify }) {
    
    function createLink(i) {
        
        setPageNumber(i) 
        //const page = `?page=${i}&${queryString}`;

        return (
            <div className='page'>
                {stringify ? (
                    <Link to={`/?page=${previousPage}&${stringify}`} >Anterior</Link>
                ) : (
                    <Link to={`/?page=${previousPage}`} >Anterior</Link>
                )}
               
            </div>
        );
    }

  return createLink(previousPage)
}
