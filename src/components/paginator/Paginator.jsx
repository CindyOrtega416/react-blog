import React from 'react'

export default function Paginator({ totalPages, pageNumber }) {

    const pagination = [];

    function createLink(i) {
        const page = `?page=${i}`;
        return (
            <div className='page'>
                <a href={page} key={i}>{i}</a>
            </div>
        );
    }

    function createDots() {
        return <div className='page'>...</div>;
    }

    console.log("page I'm in", pageNumber)
    //if there are no pages, return a message
    if(!totalPages) return <div>No pages</div>;

    //if totalPages is less than eight, iterate
    // over that number and return the page links
    if (totalPages < 8) {
        for (let i = 1; i<=totalPages; i++) {
            pagination.push(createLink(i));
        }
        return pagination;
    }

    //if total pages is 8 return sumarization with two parts
    if (totalPages = 8) {

        if (pageNumber >= 1 && pageNumber<=4) {
                 for(let i = 1; i <= 5 ; i++) {
            pagination.push(createLink(i));
        }

        //create the dots
        pagination.push(createDots());

        //Last two pages
        for(let i = totalPages - 1; i <= totalPages; i++) {
            pagination.push(createLink(i));
        }
        }

        // TRAE EL ESTADO DE LA PAGINA QUE INDICA EN QUE PAG ESTA PARADO EL USUARIO
        // if(usuario parado en pag <= 4)
   
        if (pageNumber = 5 ) {
            for(let i = 1; i <= 5 ; i++) {
                pagination.push(createLink(i));
            }
        }
    

    }

    //Otherwide create the first three page links
    for(let i = 1; i<=5; i++) {
        pagination.push(createLink(i));
    }

    //Create the dots
    pagination.push(createDots());

    //Last three page links
    for(let i = totalPages - 1; i <= totalPages; i++) {
        pagination.push(createLink(i));
    }

  return pagination;
  
}
