import React, {useContext} from 'react';
import './topbar.css';
import {Link} from "react-router-dom";
import {Context} from "../../context/Context";

export default function TopBar() {

    const {user, dispatch} = useContext(Context);
    const PF = "http://localhost:5000/images/"

    const handleLogout = () => {
        dispatch({type: "LOGOUT"})
    }

    return (
        <div className="top">
            <div className="topLeft">
                <Link to="/">
                    <img src="/images/logo-side.svg" alt="Encontrarte" className="logoSide"/>
                </Link>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to='/'>HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to='/'>ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to='/write'>CREAR</Link>
                    </li>
                    <li className="topListItem" onClick={handleLogout}>
                        {user && 'SALIR'}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                    <Link to="/settings">
                        <img className="topImg" src={PF + user.profilePic} alt=""/>
                    </Link>
                ) : (
                    <ul className="topList">
                        <li className="topListItem">
                            <Link className="link" to='/login'>
                                INICIAR SESIÓN
                            </Link>
                        </li>
                        <li className="topListItem">
                            <Link className="link" to='/register'>
                                REGISTRARSE
                            </Link>
                        </li>
                    </ul>
                )
                }

            </div>
        </div>
    )
}