import React from "react";
import Pokemons from "./components/pokemons"

// Provider es para que todos los componentes tengan acceso a la informacion
import { Provider } from 'react-redux'
import generateStore from './Redux/store'

function App() {

  const store = generateStore()

  return (
    <Provider store ={store}>
      <div className="container mt-3">
      <Pokemons />
      </div>
    </Provider>
  );
}

export default App;
