import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { signOutAction } from '../Redux/userDucks'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'



const Navbar = (props) => {

  const dispatch = useDispatch()

  const signOut = () => {
    dispatch(signOutAction())
    props.history.push('/login')
  }

  const active = useSelector(store => store.user.active)

  return (
    <div className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">App Pokemon</Link>
      <div className="d-flex">
        {
          active ? (
            <>
            <NavLink className="btn btn-dark mr-2" to="/" exact>Start </NavLink>
            <button
              className="btn btn-dark mr-2"
              onClick={()=> signOut()}
              >Log Out
            </button>
            </>
          ) : (
            <NavLink className="btn btn-dark mr-2" to="/login">Login </NavLink>
          )
        }
        
      </div>
    </div>
  )
}

export default withRouter(Navbar)
