import { useState } from 'react';
import './header.css';

function App() {
  const [Photos, setPhotos] = useState('')
  const [Results, setResults] = useState([])

  const searchResults = async () => {
    const API_KEY = 'zwPnpG6WSraF8ytgAl-FlaggNlaZ8M2gc90LRN9QUnQ';
    const URL = `https://api.unsplash.com/search/photos?per_page=30&client_id=${API_KEY}&query=${Photos}`;

    const response = await fetch(URL);
    const data = await response.json();

    setResults(data.results)
    console.log(data)
  }
  const add = (e) => {
    if (e.charCode == 13) {
      searchResults();
    }
  }
  const open = url => window.open(url);

  return (
    <div className='body'>
      <header>
        <span className='header__logo'>Phoarch</span>
        <div className='header__search'>
          <input onKeyPress={(e) => add(e)} type="text" placeholder="Buscar imagenes" onChange={e => setPhotos(e.target.value)} className="header__search__input" />
          <button onClick={() => searchResults()} className="header__search__btn">Buscar</button>
        </div>
      </header>

      <div className='container'>
        <div className='center'>
          {
            Results.map((element, indice) => {
              return (
                <article key={indice} onClick={() => open(element.links.html)}>
                  <img src={element.urls.regular} />
                </article>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
