import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";

// Provider es para que todos los componentes tengan acceso a la informacion
import { Provider } from 'react-redux'
import generateStore from './Redux/store'

const store = generateStore() 

ReactDOM.render(
  <React.StrictMode>
    <Provider store ={store}>
      <App />
    </Provider >  
  </React.StrictMode>,
  document.getElementById("root")
);
 