import React from "react";
import './single.css';
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";


export const categoryOption = [
    "Perdido",
    "Encontrado",
    "Adopción"
]

export const type = [
    "Perro",
    "Gato",
    "Ave",
    "Conejo",
    "Roedor",
    "Reptile",
    "Erizo",
    "Otro"
]

export const genderType = [
    "Hembra",
    "Macho",
]

export const hairType = [
    "Sin Pelo",
    "Corto",
    "Medio",
    "Largo"
]

export const eyesType = [
    "Oscuros",
    "Claros"
]

export default function Single(){
    return(
        <div className="single">
            <SinglePost
                categoryOption={categoryOption}
                type={type}
                genderType={genderType}
                hairType={hairType}
                eyesType={eyesType}
            />
            <Sidebar />
        </div>
    )
}