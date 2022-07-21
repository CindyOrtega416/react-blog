import React, {useEffect, useState} from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import {db, storage} from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable, listAll} from "firebase/storage";
import {
    addDoc,
    collection,
    getDoc,
    serverTimestamp,
    doc,
    updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { v4 } from 'uuid';
import {useNavigate, useParams} from "react-router-dom";


const initialState = { // initial state for our form
    title: "",
    tags: [],
    trending: "no",
    category: "",
    description: "",
}

const categoryOption = [
    "Lost",
    "Found",
    "Adoption"
]

const animalType = [
    "Dog",
    "Cat",
    "Bird",
    "Rabbit",
    "Rodent",
    "Reptile",
    "Hedgehog",
    "Other"
]

const genderType = [
    "Female",
    "Male",
    "Other"
]

const hairType = [
    "NoHair",
    "Short",
    "Medium",
    "Long"
]

const eyesType = [
    "Dark",
    "Light"
]

export default function AddEditBlog({ user, setActive }) {
   // let urlDownload
    const [form, setForm] = useState(initialState)// initial state for our form
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(null)
/*    const [imageUpload, setImageUpload] = useState()
    const [imageList, setImageList] = useState([])*/

    const { id } = useParams();

    const navigate = useNavigate()

  /*  const imageListRef = ref(storage, "images/") // to use in useEffect (listAll), because we
    // wanna access all the files inside the images folder
*/
    const { title, tags, category, trending, description, type, breed, gender, hair, eyes, idCollar, idChip, phone} = form;

    // OPTION THAT DIDN'T WORK BUT IT'S GOOD ALTERNATIVE TO UPLOAD FILES

   /* const uploadImage = () => {
        if(imageUpload == null) return; // if there's no image, return and get out of this function

        // start using functions provided by firebase
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`) // image name will be the current name of th image + a bunch of random letters created using uuid library
        // uploadBytes takes in 1. The reference to where we wanna upload this; 2. Takes in the image that we wanna upload
        // this will return a promise that says 'whenever you upload, when it's finished, run this function'
        uploadBytes(imageRef, imageUpload).then((snapshot)=> { // snapshot to get the url of the image we're trying to upload
            getDownloadURL(snapshot.ref).then((url) => { // get the download url for this specific image that we just uploaded
                // setImageList((prev) => [...prev, url])
                console.log("url", url)
                toast.info("Image upload to firebase successfully");
                setForm((prev) => ({ ...prev, imgUrl: url }))
                console.log("form", form)
            })
        })
    }*/

    //to show image
    //
    // useEffect(()=> {
    //     // use firebase function to list all images in a specific order
    //     // we use the reference (imageListRef) to say WHAT we wanna list
    //     listAll(imageListRef).then((response) => {
    //         // we need to go through each of the items in our storage (response.items)
    //         // loop through each of them (.forEach)
    //         // grab each individual item ((item)=> {})
    //         // and use getDownloadUrl to get the url based on that item
    //         // then we grab the url from this
    //         // and add this url to the imageList (setImageList)
    //         // with prev we grab the current value of the list and set it equal to the same list but add the new url at the end
    //         response.items.forEach((item)=>{
    //             getDownloadURL(item).then((url) => {
    //                 setImageList((prev)=> [...prev, url])
    //                 // so with this, we're setting the image list to be a list of 2 items (in the example)
    //                 // which are both the url to get access to the pictures
    //
    //             })
    //         })
    //
    //     })
    // }, [])
    //

    useEffect(() => {
        const uploadFile = () => {
            const storageRef = ref(storage, `images/${file.name + v4()}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    setProgress(progress);
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        toast.info("Image upload to firebase successfully");
                        setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
                    });
                }
            );
        };

        file && uploadFile();
    }, [file]);

    useEffect(() => {
        id && getBlogDetail();

    }, [id]);

    const getBlogDetail = async () => {
        const docRef = doc(db, "blogs", id)
        const snapshot = await getDoc(docRef)
        if(snapshot.exists()) {
            setForm({ ...snapshot.data() })
        }
        setActive(null)
    }

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleTags = (tags) => {
        setForm({ ...form, tags})
    }

    const handleTrending = (event) => {
        setForm({ ...form, trending: event.target.value })
    }

    const onCategoryChange = (event) => {
        setForm({ ...form, category: event.target.value })
    }

    const onTypeChange = (event) => {
        setForm({ ...form, type: event.target.value })
    }

    const onGenderChange = (event) => {
        setForm({ ...form, gender: event.target.value })
    }

    const onHairChange = (event) => {
        setForm({ ...form, hair: event.target.value })
    }

    const onEyesChange = (event) => {
        setForm({ ...form, eyes: event.target.value })
    }

    const handleIdCollar = (event) => {
        setForm({ ...form, idCollar: event.target.value })
    }

    const handleIdChip = (event) => {
        setForm({ ...form, idChip: event.target.value })
    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (category && tags && title && description && trending && type && breed && gender && hair && eyes && idCollar && idChip && phone) {
            if(!id) {
                try {
                    await addDoc(collection(db, "blogs"), {
                        ...form,
                        timestamp: serverTimestamp(),
                        author: user.displayName,
                        userId: user.uid
                    })
                    toast.success("Blog created successfully");
                } catch(error) {
                    console.log(error)
                }
            } else {    // if we have the id
                try {
                    await updateDoc(doc(db, "blogs", id), {
                        ...form,
                        timestamp: serverTimestamp(),
                        author: user.displayName,
                        userId: user.uid
                    })
                    toast.success("Blog updated successfully");
                } catch(error) {
                    console.log(error)
                }
            }
        } else {
            return toast.error("All fields are mandatory to fill");
        }
        navigate("/")
    }



    return(
        <div className="container-fluid mb-4">
            <div className="container">
                <div className="col-12">
                    <div className="text-center heading py-2">
                        {id ? "Update Blog" : "Create Blog"}
                    </div>
                </div>
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-10 col-md-8 col-lg-6">
                        <form className="row blog-form" onSubmit={handleSubmit}>
                            <div className="col-12 py-3">
                                <select
                                    value={type}
                                    onChange={onTypeChange}
                                    className="catg-dropdown"
                                >
                                    <option>Animal type</option>
                                    {animalType.map((option, index) => (
                                        <option value={option || ""} key={index}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12 py-3">
                                <input
                                    type="text"
                                    className="form-control input-text-box"
                                    placeholder="Breed"
                                    name="breed"
                                    value={breed}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12 py-3">
                                <select
                                    value={gender}
                                    onChange={onGenderChange}
                                    className="catg-dropdown"
                                >
                                    <option>Gender</option>
                                    {genderType.map((option, index) => (
                                        <option value={option || ""} key={index}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12 py-3">
                                <select
                                    value={hair}
                                    onChange={onHairChange}
                                    className="catg-dropdown"
                                >
                                    <option>Hair Type</option>
                                    {hairType.map((option, index) => (
                                        <option value={option || ""} key={index}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12 py-3">
                                <select
                                    value={eyes}
                                    onChange={onEyesChange}
                                    className="catg-dropdown"
                                >
                                    <option>Eyes Type</option>
                                    {eyesType.map((option, index) => (
                                        <option value={option || ""} key={index}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12 py-3">
                                <p className="trending">Identification collar?</p>
                                <div className="form-check-inline mx-2">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        value="yes"
                                        name="radioOptionCollar"
                                        checked={idCollar === "yes"}
                                        onChange={handleIdCollar}
                                    />
                                    <label htmlFor="radioOption" className="form-check-label">
                                        Yes&nbsp;
                                    </label>
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        value="no"
                                        name="radioOptionCollar"
                                        checked={idCollar === "no"}
                                        onChange={handleIdCollar}
                                    />
                                    <label htmlFor="radioOption" className="form-check-label">
                                        No
                                    </label>
                                </div>
                            </div>
                            <div className="col-12 py-3">
                                <p className="trending">Identification chip?</p>
                                <div className="form-check-inline mx-2">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        value="yes"
                                        name="radioOptionChip"
                                        checked={idChip === "yes"}
                                        onChange={handleIdChip}
                                    />
                                    <label htmlFor="radioOption" className="form-check-label">
                                        Yes&nbsp;
                                    </label>
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        value="no"
                                        name="radioOptionChip"
                                        checked={idChip === "no"}
                                        onChange={handleIdChip}
                                    />
                                    <label htmlFor="radioOption" className="form-check-label">
                                        No
                                    </label>
                                </div>
                            </div>
                            <div className="col-12 py-3">
                                <input
                                    type="text"
                                    className="form-control input-text-box"
                                    placeholder="Phone number"
                                    name="phone"
                                    value={phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12 py-3">
                                <input
                                    type="text"
                                    className="form-control input-text-box"
                                    placeholder="Title"
                                    name="title"
                                    value={title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12 py-3">
                                <ReactTagInput
                                    tags={tags}
                                    placeholder="Tags"
                                    onChange={handleTags}
                                />
                            </div>
                            <div className="col-12 py-3">
                                <p className="trending">Is it trending blog ?</p>
                                <div className="form-check-inline mx-2">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        value="yes"
                                        name="radioOption"
                                        checked={trending === "yes"}
                                        onChange={handleTrending}
                                    />
                                    <label htmlFor="radioOption" className="form-check-label">
                                        Yes&nbsp;
                                    </label>
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        value="no"
                                        name="radioOption"
                                        checked={trending === "no"}
                                        onChange={handleTrending}
                                    />
                                    <label htmlFor="radioOption" className="form-check-label">
                                        No
                                    </label>
                                </div>
                            </div>
                            <div className="col-12 py-3">
                                <select
                                    value={category}
                                    onChange={onCategoryChange}
                                    className="catg-dropdown"
                                >
                                    <option>Please select category</option>
                                    {categoryOption.map((option, index) => (
                                        <option value={option || ""} key={index}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12 py-3">
                <textarea
                    className="form-control description-box"
                    placeholder="Description"
                    value={description}
                    name="description"
                    onChange={handleChange}
                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="file"
                                    className="form-control"
                                // everytime you select a file on this input we'll call this function (yhe arrow one we are creating)
                                // which basically sets the image upload to be equal to the event.target.files
                                // so you can access the file in this specific input. And since we can select multiple files
                                // files will be an array, but for now we are uploading only one file so it will
                                // be the first element in the array, so files[0]
                                    onChange={(event)=> {
                                        setFile(event.target.files[0])
                                    }}
                                />
                            </div>
                          {/*  {imageList.map((url) => {
                                return <img src={url}/>
                            })}*/}
                            <div className="col-12 py-3 text-center">
                                <button
                                    className="btn btn-add"
                                    type="submit"
                                    //onClick={uploadImage}
                                    disabled={progress !== null && progress < 100}
                                >
                                    { id ? "Update" : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}