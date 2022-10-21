import React from 'react';
import './header.css'

export default function Header() {
    return(
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">React & Node</span>
                <span className="headerTitleLg">Blog</span>
            </div>
            <img
                className="headerImg"
                 src="https://i.pinimg.com/564x/5e/68/ba/5e68ba603a1ee8d3ee836cc49729cac9.jpg"
            />
        </div>
    )
}