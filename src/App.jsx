import './App.css';
import Menu from './components/Menu/Menu'
import GetStickers from './components/Sticker/GetSticker';

function App() {
  return (
    <div>
      {/* Renderizar el componente Menu */}
      <Menu />
      {/* Renderizar el componente GetStickers */}
      <div id='ObtainSticker'>
        <GetStickers />
      </div>
    </div>
  );
}

export default App;
