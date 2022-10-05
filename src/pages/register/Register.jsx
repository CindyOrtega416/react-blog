import React from "react";
import './register.css';
import {Link} from "react-router-dom";

export default function Register(){
    return(
        <div className="register">
            <span className="registerTitle">Registrar</span>
            <form className="registerForm">
                <label>Nombre de usuario</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Ingresa un nombre de usuario..."
                />
                <label>Email</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Ingresa tu email..."
                />
                <label>Contraseña</label>
                <input
                    className="registerInput"
                    type="password"
                    placeholder="Ingresa tu contraseña..."
                />
                <button className="registerButton">Registrar</button>
            </form>
            <button className="registerLoginButton">
                <Link className="link" to='/ingresar'>Iniciar Sesión</Link>
            </button>
        </div>
    )
}