import React, {useEffect, useState} from "react";
import './sidebar.css';
import axios from "axios";
import {Link} from "react-router-dom";

export default function Sidebar(){
    const [cats, setCats] = useState([])
    const [animalCat, setAnimalCat] = useState([])


    useEffect(()=> {
        const getCats = async () => {
            const res = await axios.get("/category")

            setCats(res.data)
        }
        const getAnimalCat = async() => {
            const res = await axios.get("/animalType")
            setAnimalCat(res.data)
        }

        // eslint-disable-next-line no-unused-expressions
        getCats(), getAnimalCat()
    },[])


    return(
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">Sobre mi</span>
                <img src="" />
                <p></p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">Categorias</span>
                <ul className="sidebarList">
                    {cats.map((c)=> (
                        <Link className="link" to={`/?category=${c.name}`}>
                            <li className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">Tipo de animal</span>
                <ul className="sidebarList">
                    {animalCat.map((c)=> (
                        <Link className="link" to={`/?animalType=${c.name}`}>
                            <li className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
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