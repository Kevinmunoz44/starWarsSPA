import React from 'react';
import './ObtainSticker.css';

function ObtainStickers({ availablePacks, locked, obtainedStickers, openPack, addToAlbum, discardSticker }) {
  return (
    <div className="obtain-stickers">
      <h2>Obtain Stickers</h2>
      <p>Available packs: {availablePacks}</p>
      {/* Botón para abrir un paquete de láminas */}
      <button onClick={openPack} disabled={locked || availablePacks === 0}>
        Open Pack
      </button>
      {/* Mensaje si está bloqueado */}
      {locked && <p>Remaining locked for 1 minute</p>}
      <div className="obtained-stickers">
        {/* Renderizar las láminas obtenidas */}
        {obtainedStickers.map((sticker, index) => (
          <div key={index} className="sticker">
            <p>Section: {sticker.section}</p>
            <p>Category: {sticker.category}</p>
            <p>Sticker Number: {sticker.id}</p>
            <p>Name: {sticker.name}</p>
            {/* Botón para agregar la lámina al álbum */}
            <button onClick={() => addToAlbum(sticker)}>Add to Album</button>
            {/* Botón para descartar la lámina */}
            <button onClick={() => discardSticker(sticker)}>Discard</button> {/* Usar la función discardSticker */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ObtainStickers;
