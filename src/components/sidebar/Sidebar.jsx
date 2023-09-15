import React, {useEffect, useState, useMemo, useCallback} from "react";
import Button from 'react-bootstrap/Button';
import './sidebar.css';
import axios from "axios";
import {useLocation, Link} from "react-router-dom";

export default function Sidebar({currentPage, stringify, clicked, setClicked, query, setQuery}) {
    const [cats, setCats] = useState([])
    const [animalCat, setAnimalCat] = useState([])
    const [genderCat, setGenderCat] = useState([])
    const [isActiveCat, setIsActiveCat] = useState(false);
    const [isActiveAn, setIsActiveAn] = useState(false);
    const [isActiveGen, setIsActiveGen] = useState(false);

    const {search} = useLocation();
    
    console.log("El search desde location es: ", search)
    console.log("Clicked desde sidebar: ", clicked)

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/category")
            setCats(res.data)
            console.log(res)
        }
        const getAnimalCat = async () => {
            const res = await axios.get("/animalType")
            setAnimalCat(res.data)
        }

        const getGenderCat = async () => {
            const res = await axios.get("/gender")
            setGenderCat(res.data)
        }

        // eslint-disable-next-line no-unused-expressions
        getCats(), getAnimalCat(), getGenderCat()
    }, [setCats, setAnimalCat, setGenderCat])


    //tags.push(`category=${selectedCat}`, `animalType=${selectedAnimal}`)
    //tags.push(selectedCat)
    // const stringData = tags.map((value) => value).join('&')



    const handleClickCategory = () => { 

        setIsActiveCat(current => !current);

    };

    const handleClickAnimal = () => {

        setIsActiveAn(current => !current);

    };

    const handleClickGender = () => {

        setIsActiveGen(current => !current);

    };



    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">Sobre mi</span>
                <img src=""/>
                <p></p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">Categorias</span>
                <ul className="sidebarList">
                    {cats.map((c) => (
                        <Button
                            variant="outline-secondary"
                            style={{
                                backgroundColor: c.name === isActiveCat ? 'teal' : '',
                                color: c.name === isActiveCat ? 'white' : '',
                            }}
                            className="sidebarListItem"
                            onClick={() => {
                                handleClickCategory()
                                setClicked({...clicked, category: c.name})
                                setIsActiveCat(c.name)
                            }}
                        >
                            {c.name}
                        </Button>
                    ))}
                </ul>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">Tipo de animal</span>
                <ul className="sidebarList">
                    {animalCat.map((c) => (
                        <Button
                            variant="outline-secondary"
                            style={{
                                backgroundColor: c.name === isActiveAn ? 'teal' : '',
                                color: c.name === isActiveAn ? 'white' : '',
                            }}
                            onClick={() => {
                                setClicked({...clicked, animalType: c.name})
                                handleClickAnimal()
                                setIsActiveAn(c.name)
                            }}
                            className="sidebarListItem">
                            <li
                                className="sidebarListItem"
                            >
                                {c.name}
                            </li>
                        </Button>

                    ))}
                </ul>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">Género</span>
                <ul className="sidebarList">
                    {genderCat.map((c) => (
                        <Button
                            variant="outline-secondary"
                            style={{
                                backgroundColor: c.name === isActiveGen ? 'teal' : '',
                                color: c.name === isActiveGen ? 'white' : '',
                            }}
                            onClick={() => {
                                setClicked({...clicked, gender: c.name})
                                handleClickGender()
                                setIsActiveGen(c.name)

                            }}
                            className="sidebarListItem">
                            <li
                                className="sidebarListItem"
                            >
                                {c.name}
                            </li>
                        </Button>
                    ))}
                </ul>
            </div>
            <button>
                <Link className="link" to={`/?page=1&${stringify}`}>
                    Filtrar
                </Link>
            </button>
            <button>
                <Link className="link" to={`/?page=1`} onClick={() => {
                    setClicked([])
                    setIsActiveCat(false)
                    setIsActiveAn(false)
                    setIsActiveGen(false)
                }}>
                    Limpiar filtros
                </Link>
            </button>
            <div className="sidebarItem">
                <span className="sidebarTitle">Siguenos</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    )
}