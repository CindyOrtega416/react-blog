import React, {useContext, useRef} from "react";
import './login.css';
import {Link} from "react-router-dom";
import {Context} from "../../context/Context";
import axios from "axios";

export default function Login(){

    const userRef = useRef()
    const passwordRef = useRef()
    const { dispatch, isFetching } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({ type:"LOGIN_START"});
        try{
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            })
            //if there is response, it was a successful fetching
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
        }catch(err){
            dispatch({ type: "LOGIN_FAILURE" })
        }
    };

    return(
        <div className="login">
            <span className="loginTitle">Iniciar sesión</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Nombre de Usuario</label>
                <input
                    className="loginInput"
                    type="text"
                    placeholder="Ingresa tu nombre de usuario..."
                    ref={userRef}
                />
                <label>Contraseña</label>
                <input
                    className="loginInput"
                    type="password"
                    placeholder="Ingresa tu contraseña..."
                    ref={passwordRef}
                />
                <button className="loginButton" type="submit" disabled={isFetching}>
                    Ingresar
                </button>
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to='/registrarse'>Registrarse</Link>
            </button>
        </div>
    )
}