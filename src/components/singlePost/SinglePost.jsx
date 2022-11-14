import React, {useContext, useEffect, useState} from "react";
import './singlePost.css';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import {Context} from "../../context/Context";

export default function SinglePost({
                                       categoryOption,
                                       genderType,
                                       type,
                                       hairType,
                                       eyesType
                                   }) {
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    const [post, setPost] = useState({})
    const PF = "http://localhost:5000/images/";
    const {user} = useContext(Context);

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
    const [updateMode, setUpdateMode] = useState(false)

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path)
            setPost(res.data);
            setCategory(res.data.category);
            setAnimalType(res.data.animalType);
            setGender(res.data.gender);
            setHair(res.data.hair);
            setEyes(res.data.eyes);
            setIdCollar(res.data.idCollar);
            setIdChip(res.data.idChip);
            setPhone(res.data.phone);
            setTitle(res.data.title)
            setDescription(res.data.description)
        }

        getPost()
    }, [path])

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, {
                data: {username: user.username},
            })
            window.location.replace("/")
        } catch (err) {
            console.log(err)
        }

    }

    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title,
                description,
                category,
                gender,
                hair,
                eyes,
                idCollar,
                idChip,
                phone
            })
            setUpdateMode(false)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img
                        src={post.photo.indexOf('https') ? PF + post.photo : post.photo}
                        alt=""
                        className="singlePostImg"
                    />
                )} {
                updateMode ? (
                    <input
                        type="text"
                        value={title}
                        className="singlePostTitleInput"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <h1 className="singlePostTitle">
                        {title}
                        {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <i
                                    className="singlePostIcon far fa-edit"
                                    onClick={() => setUpdateMode(true)}
                                ></i>
                                <i
                                    className="singlePostIcon far fa-trash-alt"
                                    onClick={handleDelete}
                                ></i>
                            </div>
                        )}
                    </h1>
                )}

                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link className='link' to={`/?user=${post.username}`}>
                           <b>{post.username}</b>
                        </Link>

                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>

                {/*Description*/}
                <>
                    {updateMode ? (
                        <textarea
                            className="singlePostDescriptInput"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    ) : (
                        <p className="singlePostDescript">
                            {description}
                        </p>
                    )}
                </>
                {/*category*/}
                <>
                    {updateMode ? (
                        <select
                            className="writeInput"
                            placeholder="Categoria(*)"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categoryOption.map((option, index) => (
                                <option value={option || ""} key={index}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="singlePostDescript">
                            {category}
                        </p>
                    )}
                </>

                {/*animalType*/}
                <>
                    {updateMode ? (
                        <select
                            className="writeInput"
                            placeholder="Tipo de animal(*)"
                            value={animalType}
                            onChange={(e) => setAnimalType(e.target.value)}
                        >
                            {type.map((option, index) => (
                                <option value={option || ""} key={index}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="singlePostDescript">
                            {animalType}
                        </p>
                    )}
                </>

                {/*gender*/}
                <>
                    {updateMode ? (
                        <select
                            className="writeInput"
                            placeholder="Género"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            {genderType.map((option, index) => (
                                <option value={option || ""} key={index}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="singlePostDescript">
                            {gender}
                        </p>
                    )}
                </>

                {/*hair*/}
                <>
                    {updateMode ? (
                        <select
                            className="writeInput"
                            placeholder="Tipo de pelo"
                            value={hair}
                            onChange={(e) => setHair(e.target.value)}
                        >
                            {hairType.map((option, index) => (
                                <option value={option || ""} key={index}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="singlePostDescript">
                            {hair}
                        </p>
                    )}
                </>

                {/*eyes*/}
                <>
                    {updateMode ? (
                        <select
                            className="writeInput"
                            placeholder="Color de ojos"
                            value={eyes}
                            onChange={(e) => setEyes(e.target.value)}
                        >
                            {eyesType.map((option, index) => (
                                <option value={option || ""} key={index}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="singlePostDescript">
                            {eyes}
                        </p>
                    )}
                </>

                {/*idCollar*/}
                <>
                    {updateMode ? (
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
                    ) : (
                        <p className="singlePostDescript">
                            {idCollar}
                        </p>
                    )}
                </>

                {/*idCollar*/}
                <>
                    {updateMode ? (
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
                    ) : (
                        <p className="singlePostDescript">
                            {idChip}
                        </p>
                    )}
                </>

                {/*Phone*/}
                <>
                    {updateMode ? (
                        <textarea
                            className="singlePostDescriptInput"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    ) : (
                        <p className="singlePostDescript">
                            {phone}
                        </p>
                    )}
                </>
                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                )}

            </div>

        </div>
    )
}