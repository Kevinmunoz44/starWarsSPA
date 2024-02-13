import React from 'react';
import './Album.css';

function Album({ album }) {

  return (
    <div className="album">
      <h2>Album</h2>
      {/* Itera sobre las secciones del álbum */}
      {Object.keys(album).map(section => (
        <div key={section} className="album-section">
          {/* Título de la sección, con la primera letra en mayúscula */}
          <h3>{section.charAt(0).toUpperCase() + section.slice(1)}:</h3>
          {/* Itera sobre los cromos de la sección actual */}
          {album[section].map((sticker, index) => (
            <div key={index} className="sticker">
              {/* Renderiza los datos dependiendo de la sección del cromo */}
              {sticker.section === 'films' && (
                <ul>
                  <li>
                    <p>Title: {sticker.title}</p>
                    <p>Episode: {sticker.episode_id}</p>
                    <p>Director: {sticker.director}</p>
                    <p>Producer: {sticker.producer}</p>
                    <p>Release Date: {sticker.release_date}</p>
                    <p>Category: {sticker.category}</p>
                  </li>
                </ul>
              )}
              {sticker.section === 'people' && (
                <ul>
                  <li>
                    <p>Name: {sticker.name}</p>
                    <p>Height: {sticker.height}</p>
                    <p>Gender: {sticker.gender}</p>
                    <p>Category: {sticker.category}</p>
                  </li>
                </ul>
              )}
              {sticker.section === 'starships' && (
                <ul>
                  <li>
                    <p>Starship Name: {sticker.name}</p>
                    <p>Model: {sticker.model}</p>
                    <p>Manufacturer: {sticker.manufacturer}</p>
                    <p>Passengers: {sticker.passengers}</p>
                    <p>Category: {sticker.category}</p>
                  </li>
                </ul>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Album;
