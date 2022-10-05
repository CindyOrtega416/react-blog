import React from "react";
import './write.css';


const categoryOption = [
    "Perdido",
    "Encontrado",
    "Adopción"
]

const animalType = [
    "Perro",
    "Gato",
    "Ave",
    "Conejo",
    "Roedor",
    "Reptile",
    "Erizo",
    "Otro"
]

const genderType = [
    "Hembra",
    "Macho",
]

const hairType = [
    "Sin Pelo",
    "Corto",
    "Medio",
    "Largo"
]

const eyesType = [
    "Oscuros",
    "Claros"
]

export default function Write(){
    return(
        <div className="write">
            <img
                className="writeImg"
                src="https://images.freeimages.com/images/previews/7e5/puppy-1-1519401.jpg"
                alt=""
            />
            <form className="writeForm">
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput" style={{ display: 'none'}}/>
                    <input type="text" placeholder="Título" className="writeInput" autoFocus={true}/>
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder="Descripción" type="text" className="writeInput writeText"></textarea>
                </div>

                <div className="writeFormGroup">
                    <select className="writeInput">
                        <option>Categoria(*)</option>
                        {categoryOption.map((option, index) => (
                            <option value={option || ""} key={index}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="writeFormGroup">
                    <select className="writeInput">
                        <option>Tipo de animal(*)</option>
                        {animalType.map((option, index) => (
                            <option value={option || ""} key={index}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="writeFormGroup">
                    <select className="writeInput">
                        <option>Género</option>
                        {genderType.map((option, index) => (
                            <option value={option || ""} key={index}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="writeFormGroup">
                    <select className="writeInput">
                        <option>Tipo de Pelo</option>
                        {hairType.map((option, index) => (
                            <option value={option || ""} key={index}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="writeFormGroup">
                    <select className="writeInput">
                        <option>Color de ojos</option>
                        {eyesType.map((option, index) => (
                            <option value={option || ""} key={index}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="writeFormGroup">
                    <p className="writeText">¿Collar Identificador?</p>
                    <div className="form-check-inline mx-2">
                        <input
                            type="radio"
                            className="writeFormCheck"
                            value="Si"
                            name="radioOptionCollar"
                        />
                        <label htmlFor="radioOption" className="writeFormLabel">
                            Si&nbsp;
                        </label>
                        <input
                            type="radio"
                            className="writeFormInput"
                            value="No"
                            name="radioOptionCollar"
                        />
                        <label htmlFor="radioOption" className="form-check-label">
                            No
                        </label>
                    </div>
                </div>

                <div className="writeFormGroup">
                    <p className="writeText">¿Chip Identificador?</p>
                    <div className="form-check-inline mx-2">
                        <input
                            type="radio"
                            className="writeFormCheck"
                            value="Si"
                            name="radioOptionChip"
                        />
                        <label htmlFor="radioOption" className="writeFormLabel">
                            Si&nbsp;
                        </label>
                        <input
                            type="radio"
                            className="writeFormInput"
                            value="No"
                            name="radioOptionChip"
                        />
                        <label htmlFor="radioOption" className="writeFormLabel">
                            No
                        </label>
                    </div>
                </div>

                <div className="writeFormGroup">
                     <input type="text" placeholder="Teléfono (*)" className="writeInput"/>
                </div>

                <button className="writeSubmit">Publicar</button>
            </form>
        </div>
    )
}