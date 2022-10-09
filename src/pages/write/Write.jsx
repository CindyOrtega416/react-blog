import React, {useContext, useState} from "react";
import './write.css';
import axios from "axios";
import {Context} from "../../context/Context";


 const categoryOption = [
    "Perdido",
    "Encontrado",
    "Adopción"
]

 const type = [
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
    const [category, setCategory] = useState("")
    const [animalType, setAnimalType] = useState("")
    const [gender, setGender] = useState("")
    const [hair, setHair] = useState("")
    const [eyes, setEyes] = useState("")
    const [idCollar, setIdCollar] = useState("No")
    const [idChip, setIdChip] = useState("No")
    const [phone, setPhone] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState(null)

    const { user } = useContext(Context)

    const handleSumit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            category,
            animalType,
            gender,
            hair,
            eyes,
            idCollar,
            idChip,
            phone,
            title,
            description,
        };
        if(file){
            const data = new FormData()
            const filename = Date.now() + file.name;
            data.append("name",filename);
            data.append("file",file);
            newPost.photo = filename;
            try{
                await axios.post("/upload", data);
            }catch(err) {

            }
        }

        try{
           const res = await axios.post("/posts", newPost);
           window.location.replace("/post/"+res.data._id)
        } catch (err){

        }

    }

    return(
        <div className="write">
            { file &&
            <img
                className="writeImg"
                src={URL.createObjectURL(file)}
                alt=""
            />
            }
            <form className="writeForm" onSubmit={handleSumit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none'}}
                        onChange={e=>setFile(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder="Título"
                        className="writeInput"
                        autoFocus={true}
                        onChange={e=>setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder="Descripción"
                        type="text"
                        className="writeInput writeText"
                        onChange={e=>setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="writeFormGroup">
                    <select className="writeInput" onChange={e=>setCategory(e.target.value)}>
                        <option>Categoria(*)</option>
                        {categoryOption.map((option, index) => (
                            <option value={option || ""} key={index}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="writeFormGroup">
                    <select className="writeInput" onChange={e=>setAnimalType(e.target.value)}>
                        <option>Tipo de animal(*)</option>
                        {type.map((option, index) => (
                            <option value={option || ""} key={index}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="writeFormGroup">
                    <select className="writeInput" onChange={e=>setGender(e.target.value)}>
                        <option>Género</option>
                        {genderType.map((option, index) => (
                            <option value={option || ""} key={index}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="writeFormGroup">
                    <select className="writeInput" onChange={e=>setHair(e.target.value)}>
                        <option>Tipo de Pelo</option>
                        {hairType.map((option, index) => (
                            <option value={option || ""} key={index}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="writeFormGroup">
                    <select className="writeInput" onChange={e=>setEyes(e.target.value)}>
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
                            defaultChecked={idCollar === "Si"}
                        />
                        <label htmlFor="radioOption" className="writeFormLabel">
                            Si&nbsp;
                        </label>
                        <input
                            type="radio"
                            className="writeFormInput"
                            value="No"
                            name="radioOptionCollar"
                            defaultChecked={idCollar === "No"}
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
                            defaultChecked={idChip === "Si"}
                        />
                        <label htmlFor="radioOption" className="writeFormLabel">
                            Si&nbsp;
                        </label>
                        <input
                            type="radio"
                            className="writeFormInput"
                            value="No"
                            name="radioOptionChip"
                            defaultChecked={idChip === "No"}
                        />
                        <label htmlFor="radioOption" className="writeFormLabel">
                            No
                        </label>
                    </div>
                </div>

                <div className="writeFormGroup">
                     <input
                         type="text"
                         placeholder="Teléfono (*)"
                         className="writeInput"
                         onChange={e=>setPhone(e.target.value)}
                     />
                </div>

                <button className="writeSubmit" type="submit" >Publicar</button>
            </form>
        </div>
    )
}