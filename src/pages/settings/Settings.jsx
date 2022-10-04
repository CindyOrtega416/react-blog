import "./settings.css"
import MostPopular from "../../components/MostPopular";
import React from "react";

export default function Settings() {
    return(
        <div className="settings">
            <div className="settingWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Modifica los datos de tu cuenta</span>
                    <span className="settingsDeleteTitle">Elimina tu cuenta</span>
                </div>
                <form className="settingsForm">
                    <label>Foto de perfil</label>
                    <div className="settingsPP">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            alt="logo"
                            style={{
                                width: "30px",
                                height: "30xp",
                                borderRadius: "50%",
                                marginTop: "12px"
                            }}
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{display: "none"}}/>
                    </div>
                    <label>Nombre de usuario</label>
                    <input type="text" placeholder="Text" />
                    <label>Email</label>
                    <input type="email" placeholder="Text" />
                    <label>Contraseña</label>
                    <input type="password"  />
                    <button className="settingsSubmit">Actualizar</button>
                </form>
            </div>
        </div>
    )
}