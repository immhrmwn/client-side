import axios from'axios'

export const fetchingUsersStart = () => {
  return { type: 'FETCH_USERS_START' }
}

export const fetchingUsersSuccess = (data) => {
  return { type: 'FETCH_USERS' , payload: data}
}

export const fetchingUsers = () => {
  const access_token = localStorage.access_token
  return dispatch => {
    dispatch(fetchingUsersStart())
    axios({
      method: 'GET',
      url: 'https://test-server-side.herokuapp.com/users',
      headers: {access_token}
    })
      .then(({data}) => {
        dispatch(fetchingUsersSuccess(data))
      })
      .catch(err => console.log(err))
  }
}

export const register = (payload, history) => {
  return dispatch => {
    axios({
      method: 'POST',
      url: 'https://test-server-side.herokuapp.com/register',
      data: payload
    })
      .then(({data}) => {
        history.push('/login')
      })
      .catch(err => console.log(err))
  }
}

export const login = (payload, history) => {
  return dispatch => {
    axios({
      method: 'POST',
      url: 'https://test-server-side.herokuapp.com/login',
      data: payload
    })
      .then(({data}) => {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('name', data.payload.name)
        dispatch(fetchingUsers())
        dispatch({
          type: 'FETCH_PROFILE',
          payload: data.payload
        })
        history.push('/')
      })
      .catch(err => console.log(err))
  }
}

export const removeUser = (id) => {
  const access_token = localStorage.access_token
  return dispatch => {
    axios({
      method: 'DELETE',
      url: `https://test-server-side.herokuapp.com/users/${id}`,
      headers: { access_token }
    })
      .then(({data}) => {
        console.log('success remove user')
        dispatch(fetchingUsers(data))
      })
      .catch(err => console.log(err))
  }
}
