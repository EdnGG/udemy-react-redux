import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {actionPokeDetails} from '../Redux/pockemonDucks'

const Details = () => {

  const dispatch = useDispatch()

  React.useEffect(() => {
    const fetchData = () => {
      dispatch(actionPokeDetails())
    }
    fetchData()
  }, [dispatch])

  const pokemon = useSelector(store => store.pokemones.singlePokemon)
  console.log(pokemon)

  return pokemon ? (
    <div className="card mt-5 text-center">
      <div className="card-body">
        <img src={pokemon.picture} className="img-fluid" alt="" />
        <div className="card-title text-uppercase">{pokemon.name}</div>
        <p className="card-text">Weigth: {pokemon.weigth}  |  Height: {pokemon.height}</p>
      </div>
      
    </div>
  ) : null
}

export default Details
