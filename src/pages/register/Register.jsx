import React, {useState} from "react";
import './register.css';
import {Link} from "react-router-dom";
import axios from "axios";

export default function Register(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = async (e)=> {
        e.preventDefault()
        setError(false)
        try{
            const res = await axios.post("/auth/register", {
                username,
                email,
                password
            });
            res.data && window.location.replace("/login")

        }catch(err){
            setError(true)
        }


    }
    return(
        <div className="register">
            <span className="registerTitle">Registrar</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Nombre de usuario</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Ingresa un nombre de usuario..."
                    onChange={e=>setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Ingresa tu email..."
                    onChange={e=>setEmail(e.target.value)}
                />
                <label>Contraseña</label>
                <input
                    className="registerInput"
                    type="password"
                    placeholder="Ingresa tu contraseña..."
                    onChange={e=>setPassword(e.target.value)}
                />
                <button className="registerButton">Registrar</button>
            </form>
            <button className="registerLoginButton" type="submit">
                <Link className="link" to='/ingresar'>Iniciar Sesión</Link>
            </button>
            {error && <span style={{color: 'red', marginTop: '10px'}}>Ocurrió un error!</span>}
        </div>
    )
}