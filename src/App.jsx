import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((response) => response.json())
      .then((data) => setPokemonData(data));
  }, []);

  return (
    <div>
  {pokemonData && pokemonData.results.map((pokemon, index) => {
    return <div style={{ width:'400px', height:'330px', border: '2px solid #000000' ,margin : '30px 10px'}}><div key={index}>{pokemon.name}</div>
    <img style={{height:'300px', width: '300px'}} alt="pokemon" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}/></div>

  })
  }
    </div>
  )
}

export default App
