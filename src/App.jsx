import React, { useEffect, useState} from "react";
import Pokemons from "./components/pokemons"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import { BrowserRouter as Router, Switch, Route, Redirect } from 
  'react-router-dom'
import { auth } from './firebase'

function App() {

   const [firebaseUser, setFirebaseUser] = useState(false)
  
  useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
        console.log(user)
        if (user) {
          setFirebaseUser(user)
        } else {
          setFirebaseUser(null)
        }
      })
    }
    fetchUser()
  }, [])
  
  const PrivateRoute = ({component, path, ...rest}) => {
    if (localStorage.getItem('user')) {
      const userStorage = JSON.parse(localStorage.getItem('user'))
      if (userStorage.uid === firebaseUser.uid) {
        return <Route component={component} path={path} {...rest}/>
      } else {
        return <Redirect to="/login" {...rest}/>
      }
    } else {
      return <Redirect to="/login" {...rest}/>
    }
  }

  return (
    <Router>
      <div className="container mt-3">
        <Navbar />
        <Switch>
          <PrivateRoute component={Pokemons} path='/' exact />
          <Route component={Login} path='/login'/>
            {/* 1ra forma <Pokemons /> */}
          {/* </Route> */}
        </Switch>
      </div>
    </Router>

  );
}



export default App;
