import React from 'react';
import './topbar.css';
import {Link} from "react-router-dom";

export default function TopBar() {
    const user = false;

    return(
        <div className="top">
            <div className="topLeft">
                <img src="/images/logo-side.svg" alt="Encontrarte" className="logoSide" />
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
                    <li className="topListItem">
                        {user && 'SALIR'}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                { user ? (
                    <img
                        className="topImg"
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="logo"
                        style={{
                            width: "30px",
                            height: "30xp",
                            borderRadius: "50%",
                            marginTop: "12px"
                        }}
                    />
                ): (
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