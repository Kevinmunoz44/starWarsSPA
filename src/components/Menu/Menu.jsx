import React from 'react';
import './Menu.css';
import LogoStarWars from './LogoSW.png'


const Menu = () => {
    return (
        <nav>
            <img src={LogoStarWars} alt="Star Wars Logo" className="logo" />
            <ul>
                <li><a href="#ObtainSticker">Obtain Sticker</a></li>
                <li><a href="#my-album">My Álbum</a></li>
            </ul>
        </nav>
    )
}

export default Menu;
