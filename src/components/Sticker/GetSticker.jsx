import React, { useState, useEffect } from 'react';
import './GetSticker.css';
import Album from '../Album/Album';
import ObtainStickers from './ObtainSticker';

function GetStickers() {
  const [availablePacks, setAvailablePacks] = useState(4);
  const [obtainedStickers, setObtainedStickers] = useState([]);
  const [locked, setLocked] = useState(false);
  const [album, setAlbum] = useState({ films: [], people: [], starships: [] });

  const openPack = async () => {
    if (!locked && availablePacks > 0) {
      const stickersGenerated = await generateStickers();
      setObtainedStickers(stickersGenerated);
      setLocked(true);
      setTimeout(() => {
        setLocked(false);
      }, 60000);
      setAvailablePacks(availablePacks - 1);
    }
  };

  const discardSticker = (sticker) => {
    setObtainedStickers((prevStickers) => prevStickers.filter((item) => item.id !== sticker.id));
  };

  const generateStickers = async () => {
    const configurations = [
      ['films', 'people', 'people', 'people', 'starships'],
      ['people', 'people', 'people', 'starships', 'starships']
    ];

    const randomConfigIndex = Math.floor(Math.random() * configurations.length);
    const selectedConfig = configurations[randomConfigIndex];

    const stickersGenerated = await Promise.all(selectedConfig.map(async (resourceType) => {
      const sticker = await fetchRandomSticker(resourceType);
      return sticker;
    }));

    return stickersGenerated;
  };

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

  const addToAlbum = (sticker) => {
    setAlbum((prevAlbum) => ({
      ...prevAlbum,
      [sticker.section]: [...(prevAlbum[sticker.section] || []), sticker],
    }));

    setObtainedStickers((prevStickers) => prevStickers.filter((item) => item.id !== sticker.id));

    localStorage.setItem('album', JSON.stringify({
      ...album,
      [sticker.section]: [...(album[sticker.section] || []), sticker],
    }));
  };

  useEffect(() => {
    const storedAlbum = localStorage.getItem('album');
    if (storedAlbum) {
      setAlbum(JSON.parse(storedAlbum));
    }
  }, []);

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
