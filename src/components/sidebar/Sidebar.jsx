import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import './sidebar.css';
import axios from "axios";
import {useLocation, Link} from "react-router-dom";

export default function Sidebar({pageNumber, setPageNumber, numberOfPages, setNumberOfPages}) {
    const [cats, setCats] = useState([])
    const [animalCat, setAnimalCat] = useState([])
    const [genderCat, setGenderCat] = useState([])
    const [clicked, setClicked] = useState("")
    const [isActiveCat, setIsActiveCat] = useState(false);
    const [isActiveAn, setIsActiveAn] = useState(false);
    const [isActiveGen, setIsActiveGen] = useState(false);

    const {search} = useLocation();

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
    }, [])


    //tags.push(`category=${selectedCat}`, `animalType=${selectedAnimal}`)
    //tags.push(selectedCat)
    // const stringData = tags.map((value) => value).join('&')


    let queryString = Object.keys(clicked).map((key) => {
        return key + '=' + clicked[key]
    }).join('&');
    console.log(queryString)

    const handleClickCategory = () => {

        setIsActiveCat(current => !current);

    };

    const handleClickAn = () => {

        setIsActiveAn(current => !current);

    };

    const handleClickGen = () => {

        setIsActiveGen(current => !current);

    };

    console.log(isActiveCat)
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
                                handleClickAn()
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
                                handleClickGen()
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
                <Link className="link" to={`/?page=${pageNumber}&${queryString}`}>
                    Filtrar
                </Link>
            </button>
            <button>
                <Link className="link" to={`/?page=${pageNumber}`} onClick={() => {
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