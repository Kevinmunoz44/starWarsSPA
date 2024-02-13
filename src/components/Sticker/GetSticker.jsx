import React, { useState, useEffect } from 'react';
import './GetSticker.css';
import Album from '../Album/Album';
import ObtainStickers from './ObtainSticker';

function GetStickers() {
  // Estados para almacenar información sobre los paquetes disponibles, las láminas obtenidas, si está bloqueado y el álbum
  const [availablePacks, setAvailablePacks] = useState(4);
  const [obtainedStickers, setObtainedStickers] = useState([]);
  const [locked, setLocked] = useState(false);
  const [album, setAlbum] = useState({ films: [], people: [], starships: [] });

  // Función para abrir un paquete de láminas
  const openPack = async () => {
    if (!locked && availablePacks > 0) {
      const stickersGenerated = await generateStickers();
      setObtainedStickers(stickersGenerated);
      // Bloquear temporalmente la apertura de paquetes por 1 minuto
      setLocked(true);
      setTimeout(() => {
        setLocked(false);
      }, 60000);
      // Decrementar el número de paquetes disponibles
      setAvailablePacks(availablePacks - 1);
    }
  };

  // Función para eliminar una lámina de las obtenidas
  const discardSticker = (sticker) => {
    setObtainedStickers((prevStickers) => prevStickers.filter((item) => item.id !== sticker.id));
  };

  // Función para generar láminas aleatorias
  const generateStickers = async () => {
    const configurations = [
      ['films', 'people', 'people', 'people', 'starships'],
      ['people', 'people', 'people', 'starships', 'starships']
    ];

    // Seleccionar una configuración aleatoria
    const randomConfigIndex = Math.floor(Math.random() * configurations.length);
    const selectedConfig = configurations[randomConfigIndex];

    // Generar láminas según la configuración seleccionada
    const stickersGenerated = await Promise.all(selectedConfig.map(async (resourceType) => {
      const sticker = await fetchRandomSticker(resourceType);
      return sticker;
    }));

    return stickersGenerated;
  };

  // Función para obtener una lámina aleatoria de un recurso
  const fetchRandomSticker = async (resourceType) => {
    const response = await fetch(`https://swapi.dev/api/${resourceType}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomSticker = data.results[randomIndex];
  
    let stickerData = {
      section: resourceType,
      id: randomSticker.url.split('/').filter(Boolean).pop(),
      category: 'Regular',
      name: randomSticker.name || randomSticker.title || 'Unknown'
    };
  
    // Agregar datos específicos según el tipo de recurso
    if (resourceType === 'starships') {
      stickerData.model = randomSticker.model || 'Unknown';
      stickerData.manufacturer = randomSticker.manufacturer || 'Unknown';
      stickerData.passengers = randomSticker.passengers || 'Unknown';
    } else if (resourceType === 'films') {
      stickerData.title = randomSticker.title || 'Unknown';
      stickerData.episode_id = randomSticker.episode_id || 'Unknown';
      stickerData.director = randomSticker.director || 'Unknown';
      stickerData.producer = randomSticker.producer || 'Unknown';
      stickerData.release_date = randomSticker.release_date || 'Unknown';
    } else if (resourceType === 'people') {
      stickerData.height = randomSticker.height || 'Unknown';
      stickerData.gender = randomSticker.gender || 'Unknown';
    }
  
    return stickerData;
  };

  // Función para agregar una lámina al álbum
  const addToAlbum = (sticker) => {
    setAlbum((prevAlbum) => ({
      ...prevAlbum,
      [sticker.section]: [...(prevAlbum[sticker.section] || []), sticker],
    }));

    // Eliminar la lámina de las obtenidas
    setObtainedStickers((prevStickers) => prevStickers.filter((item) => item.id !== sticker.id));

    // Guardar el álbum actualizado en el almacenamiento local
    localStorage.setItem('album', JSON.stringify({
      ...album,
      [sticker.section]: [...(album[sticker.section] || []), sticker],
    }));
  };

  // Efecto para cargar el álbum desde el almacenamiento local al inicio
  useEffect(() => {
    const storedAlbum = localStorage.getItem('album');
    if (storedAlbum) {
      setAlbum(JSON.parse(storedAlbum));
    }
  }, []);

  // Renderiza los componentes ObtainStickers y Album con los datos actuales
  return (
    <div className="container">
      <div className="card">
        <ObtainStickers
          availablePacks={availablePacks}
          locked={locked}
          obtainedStickers={obtainedStickers}
          openPack={openPack}
          addToAlbum={addToAlbum}
          discardSticker={discardSticker}
        />
      </div>
      <div className="card" id='my-album'>
        <Album album={album} />
      </div>
    </div>
  );
}

export default GetStickers;
