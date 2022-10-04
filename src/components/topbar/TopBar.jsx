import React from 'react';
import './topbar.css';

export default function TopBar() {
    return(
        <div className="top">
            <div className="topLeft">
                <img src="/images/logo-side.svg" alt="Encontrarte" className="logoSide" />
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">Menu</li>
                    <li className="topListItem">Acerca</li>
                    <li className="topListItem">Crear</li>
                    <li className="topListItem">Salir</li>
                </ul>
            </div>
            <div className="topRight">
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
            </div>
        </div>
    )
}