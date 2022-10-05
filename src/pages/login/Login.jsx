import React from "react";
import './login.css';
import {Link} from "react-router-dom";

export default function Login(){
    return(
        <div className="login">
            <span className="loginTitle">Iniciar sesión</span>
            <form className="loginForm">
                <label>Email</label>
                <input className="loginInput" type="text" placeholder="Ingresa tu email..."/>
                <label>Contraseña</label>
                <input className="loginInput" type="password" placeholder="Ingresa tu contraseña..."/>
                <button className="loginButton">Ingresar</button>
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to='/registrarse'>Registrarse</Link>
            </button>
        </div>
    )
}