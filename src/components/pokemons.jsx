import React from 'react'
import { useDispatch, useSelector} from 'react-redux'

import { getPokemonsAction, nextPokemonAction, prevPokemonAction, actionPokeDetails } from '../Redux/pockemonDucks'

import Details from './Details'

// useDispatch => consumir nuestra accion
// useSelector => leer el array, (state principal)

const Pokemons = () => {

  const dispatch = useDispatch()
  const next = useSelector(store => store.pokemones.next)
  const previous = useSelector( store => store.pokemones.previous)
  const pokemones = useSelector(store => store.pokemones.results)
  // console.log('Pokemones: ', pokemones)

  React.useEffect(() => {
    const fetchData = () => {
      dispatch(getPokemonsAction())
    }
    fetchData()
  }, [dispatch])

  return (
    <div className="row">
      <div className="col-md-6">


      
      <h3>Pokemon list</h3>
        <br />
        
        <div className="d-flex justify-content-between">
          {
            pokemones.length === 0 &&
            <button className="btn btn-dark" onClick={() => dispatch(getPokemonsAction())}>Get Pockemons</button>
          }
          {
            next && 
            <button className="btn btn-dark" onClick={() => dispatch(nextPokemonAction())}>Next Pockemons</button>
          }
          {
            previous &&
            <button className="btn btn-dark" onClick={() => dispatch(prevPokemonAction())}>Prev Pockemons</button>
          }
        </div>
          <ul className="list-group">
            {
              pokemones.map(pokemon => (
                <li className="list-group-item text-uppercase" key={pokemon.name}>
                  {pokemon.name}
                  <button
                    className="btn btn-dark btn-sm float-right"
                    onClick={ ()=> dispatch(actionPokeDetails(pokemon.url))}
                  > Details </button>
                </li>
              ))
            }
          </ul>
      </div>
      <div className="col-md-6">
        <h3>Pockemon details</h3>
        <Details />

      </div>
    </div>
  )
}

export default Pokemons
