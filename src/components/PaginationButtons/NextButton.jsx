import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function NextButton({ nextPage, setPageNumber, stringify, search}) {

    console.log("La search desde next button es: ", search)
    
       const createLink = (i) => {

                setPageNumber(i)
                   //const page = `/?page=${i}&${q}`; 

                return (
                    <div className='page'>
                        {stringify ? (
                        <Link to={`/?page=${nextPage}&${stringify}`} >Siguiente</Link>
                    ) : (
                        <Link to={`/?page=${nextPage}`} >Siguiente</Link>
                        )}
                    </div>
                );
            }

          return createLink(nextPage, stringify)

}
