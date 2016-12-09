
import axios from 'axios'
/* -----------------    ACTIONS     ------------------ */
const SET_CURRENT_USER = 'SET_CURRENT_USER'
/* ------------   ACTION CREATORS     ------------------ */
const setCurrentUser = user => ({type: SET_CURRENT_USER, user})





/* ------------       REDUCER     ------------------ */
export default function reducer (user = null, action){
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user;
    default:
      return user;

  }
}
/* ------------       DISPATCHERS     ------------------ */
export const loginUser = credentials => dispatch => {
    axios.post(`/login`, credentials)
         .then(res => dispatch(setCurrentUser(res.data)))
         .catch(err => console.error(`Logging in user: ${user} unsuccesful`, err))
}

export const signUpUser = function(credentials) {
	return function(dispatch) {
		axios.post(`/api/users`, credentials)
			.then(res => dispatch(setCurrentUser(res.data)))
			.catch(err => console.error(`Signing up user: ${user} unsuccesful`, err))
	}
}