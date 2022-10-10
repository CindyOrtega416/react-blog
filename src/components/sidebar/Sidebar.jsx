import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import './sidebar.css';
import axios from "axios";
import {Link} from "react-router-dom";

export default function Sidebar() {
    const [cats, setCats] = useState([])
    const [animalCat, setAnimalCat] = useState([])
    const [genderCat, setGenderCat] = useState([])
    const [clicked, setClicked] = useState("")
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/category")

            setCats(res.data)
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

    const handleClick = () => {
        // 👇️ toggle
        setIsActive(current => !current);

        // 👇️ or set to true
        // setIsActive(true);
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
                            className="sidebarListItem"
                            onClick={() => {
                                handleClick()
                                setClicked({...clicked, category: c.name})
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
                            onClick={() => {
                                setClicked({...clicked, animalType: c.name})
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
                            onClick={() => {
                                setClicked({...clicked, gender: c.name})
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
                <Link className="link" to={`/?${queryString}`}>
                    Filtrar
                </Link>
            </button>
            <button>
                <Link className="link" to={"/"} onClick={() => {
                    setClicked([])
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