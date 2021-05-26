import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// Para hacer promesas con redux
import thunk from "redux-thunk";

import pokeReducer from "./pockemonDucks";
import userReducer, {readActiveUserAction} from "./userDucks"

// El nombre de la key del objeto es importante porque es como vamos a poder pintar la info en nuestros componentes
const rootReducer = combineReducers({
  pokemones: pokeReducer,
  user: userReducer
});

// Utilizando la extenxion de google chrome instalada en el navegador

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//
export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
    // composeEnhancers(composeWithDevTools(applyMiddleware(thunk)))
  );
  readActiveUserAction()(store.dispatch)
  return store;
}

/*
 stuff in order to install correctly redux react
 npm i redux react-redux redux-devtools redux-thunk axios
*/
