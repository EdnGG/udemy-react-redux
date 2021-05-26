import {auth, firebase} from '../firebase'

// Data
const initialData = {
  loading: false,
  active: false
}


//Types
const LOADING = 'LOADING'
const ERROR_USER = 'ERROR_USER'
const SUCCESS_USER = 'SUCCESS_USER'
const SIGNOUT_SECCION = 'SIGNOUT_SECCION'

//Reducer
export default function userReducer(state = initialData, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }
    case ERROR_USER:
      return {...initialData}
    case SUCCESS_USER:
      return { ...state, loading: false, user: action.payload, active: true }
    case SIGNOUT_SECCION:
      return {...initialData}
    default:
      return { ...state }
  }
}

//Actions
export const loginUserAction = () => async(dispatch, getState) => {
  dispatch({
    type: LOADING,

  })
  
  try {
    const provider = new firebase.auth.GoogleAuthProvider()

    const res = await auth.signInWithPopup(provider)
    console.log('res:', res)
    dispatch({
      type: SUCCESS_USER,
      payload: {
        uid: res.user.uid,
        email: res.user.email
      }
    })
    localStorage.setItem('user', JSON.stringify({
      uid: res.user.uid,
      email: res.user.email
    }))
    
  } catch (error) {
    console.log('Error trying to log in user: ', error)
    dispatch({
      type: ERROR_USER,
  })
  }
}

export const readActiveUserAction = () => (dispatch) => {
  if (localStorage.getItem('user')) {
    dispatch({
      type: SUCCESS_USER,
      payload: JSON.parse(localStorage.getItem('user'))
    })
  }
}

export const signOutAction = () => (dispatch) => {
  auth.signOut()
  localStorage.removeItem('user')
  dispatch({
    type: SIGNOUT_SECCION
  })
}