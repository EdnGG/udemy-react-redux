import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserAction } from '../Redux/userDucks'

import { withRouter } from 'react-router-dom'

const Login = (props) => {
  const dispatch = useDispatch()

  const loading = useSelector(store => store.user.loading)
  const active = useSelector(store => store.user.active)
  // console.log(loading)

  //This hook  is gonna listening everytime is something was changed
  React.useEffect(() => {
    if (active) {
      props.history.push('/')
    }
    
  },[props.history ,active])

  return (
    <div className="mt-5 text-center">
      <h3>Sign in with Google</h3>
      <hr />
      <button
        className="btn btn-dark"
        onClick={() => dispatch(loginUserAction())}
        disabled={loading}
      >Access</button>
    </div>
  )
}

export default withRouter(Login)
