import './App.css';
import Menu from './components/Menu/Menu'
import GetStickers from './components/Sticker/GetSticker';


function App() {

  return (
    <div>
      <Menu />

      <div id='ObtainSticker'>
       <GetStickers />
      </div>
    </div>
  );
}

export default App;
