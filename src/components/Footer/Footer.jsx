import React from 'react'
import Paginator from '../../components/paginator/Paginator';
import NextButton from '../../components/PaginationButtons/NextButton';
import PreviousButton from '../../components/PaginationButtons/PreviousButton'; 
import { useLocation } from 'react-router-dom';

export default function Footer({ numberOfPages, previousPage, nextPage, setPageNumber, currentPage, stringify, search}) {


console.log("La search desde el footer es: ", search)
  return (
    <>
    {
                numberOfPages > 1 ? (
                    previousPage === null ? (
                        <button disabled={true}>
                            Anterior
                        </button>
                    ) : (

                        <PreviousButton previousPage={previousPage} setPageNumber={setPageNumber} stringify={stringify}/>
                    )
                ) : (
                    <></>
                )
            }
            <a>{currentPage}</a>
            <a>De</a>
            <a>{numberOfPages}</a>
            
            {/* <Paginator totalPages={numberOfPages} pageNumber={pageNumber} setPageNumber={setPageNumber}/> */}

            {
                numberOfPages > 1 ? (
                    nextPage === null ? (
                        <button disabled={true}>
                            Siguiente
                        </button>
                    ) : (
                  
                       <NextButton nextPage={nextPage} setPageNumber={setPageNumber} stringify={stringify} search={search}/>
                    )
                ) : (
                    <></>
                )
            }
            </>
  )
}
