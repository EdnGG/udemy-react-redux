import axios from "axios";

// constantes

// const dataInicial = {
//   array: [],
//   offset: 0,
// };

const dataInicial = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

// Types
const GET_POKEMONS_SUCCESS = "GET_POKEMONS_SUCCESS";
const NEXT_POKEMONS_SUCCESS = "NEXT_POKEMONS_SUCCESS";
const DETAILS_POKEMONS_SUCCESS = "DETAILS_POKEMONS_SUCCESS";
// const PREV_POKEMONS_SUCCESS = "PREV_POKEMONS_SUCCESS"

// reducer, escribir tal cual // state = dataInicial  - acciones
export default function pokeReducer(state = dataInicial, action) {
  switch (action.type) {
    case GET_POKEMONS_SUCCESS:
      // esta sintaxis (...state) es una destructuracion del array
      // return { ...state, array: action.payload };
    return { ...state, ...action.payload };
    case NEXT_POKEMONS_SUCCESS:
      // return { ...state, array: action.payload.array,  offset: action.payload.offset}
      return { ...state, ...action.payload }
    case DETAILS_POKEMONS_SUCCESS:
      // return { ...state, array: action.payload.array,  offset: action.payload.offset}
      return { ...state, singlePokemon: action.payload }
    // case PREV_POKEMONS_SUCCESS:
    //   return { ...state, ...action.payload }
    default :
      return state;
  }
}

// ACTIONS

export const actionPokeDetails = (url = "https://pokeapi.co/api/v2/pokemon/1/") => async (dispatch) => {
  // if (url === undefined) {
  //   url = 'https://pokeapi.co/api/v2/pokemon/1/'
  // }

  if (localStorage.getItem(url)) {
    dispatch({
      type: DETAILS_POKEMONS_SUCCESS,
      payload: JSON.parse(localStorage.getItem(url))
    })
    return
  }


  try {
    const res = await axios.get(url)
    console.log('res.data: ', res.data)
    dispatch({
      type: DETAILS_POKEMONS_SUCCESS,
      payload: {
        name: res.data.name,
        weigth: res.data.weight,
        height: res.data.height,
        picture: res.data.sprites.front_default 

      }
    })
    localStorage.setItem(url, JSON.stringify({
      name: res.data.name,
      weigth: res.data.weight,
      height: res.data.height,
      picture: res.data.sprites.front_default}))
  } catch (error) {
    console.log('Error: ', error)
  }
}


// primera function flecha. vamos a recibir los parametros que enviemos a la function (getPokemonsAction)
//Segunda funcion flecha va a necesitar un (dispatch y un getState)
export const getPokemonsAction = () => async (dispatch) => {
  // console.log("getState()", getState().pokemones.offset);
  // const { offset } =  getState().pokemones

// checking if the content of the API exists on localstorage
  if (localStorage.getItem('offset=0')) {
    console.log('localstorage')
    dispatch({
      type: GET_POKEMONS_SUCCESS,
      payload: JSON.parse(localStorage.getItem('offset=0'))
    })
    return
  }

  try {
    console.log('desde la api')
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=5`
    );
    console.log('Response: ', res.data)
    dispatch({
      type: GET_POKEMONS_SUCCESS,
      payload: res.data,
      // payload: res.data.results,
    });
    localStorage.setItem('offset=0', JSON.stringify(res.data))
  } catch (error) {
    console.log("Error: ", error);
  }
};


export const nextPokemonAction = () => async (dispatch, getState) => {
  // First way to do it
  // const { offset } = getState().pokemones
  // const next = offset + quantity
  const { next } = getState().pokemones

  if (localStorage.getItem(next)) {
    dispatch({
      type: GET_POKEMONS_SUCCESS,
      payload: JSON.parse(localStorage.getItem(next))
    })
    return
  }
  
  try {
    // const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${next}&limit=20`)
    const res = await axios.get(next)
    dispatch({
      type: NEXT_POKEMONS_SUCCESS,
      // payload: res.data.results
      // payload: {
      //   array: res.data.results,
      //   offset: next 
      // }
      payload: res.data
    })
    localStorage.setItem(next , JSON.stringify(res.data))
  } catch (error) {
    console.log('Error getting next pokemons: ', error)
  }
}

export const prevPokemonAction = () => async (dispatch, getState) => {
  
  const { previous } = getState().pokemones
  
  if (localStorage.getItem(previous)) {
    dispatch({
      type: GET_POKEMONS_SUCCESS,
      payload: JSON.parse(localStorage.getItem(previous))
    })
    return
  }

  try {
  const res = await axios.get(previous)
    dispatch({
      type: NEXT_POKEMONS_SUCCESS,
      // payload: res.data.results
      // payload: {
      //   array: res.data.results,
      //   offset: next 
      // }
      payload: res.data
    })
    localStorage.setItem(previous , JSON.stringify(res.data))
  } catch (error) {
    console.log('Error: ', error)
  }
}