const initialState = {
  profile: {},
  users: [],
  errors: [],
  loading: false
}
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PROFILE':
      return {
        ...state,
        profile: action.payload,
      }
    case 'FETCH_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    case 'FETCH_USERS_START':
      return {
        ...state,
        loading: true
      }
    case 'ERROR_FETCH_USERS':
      return {
        ...state,
        errors: state.errors.concat(action.payload),
        loading: false
      }
    default:
      return state
  }
}

export default userReducer