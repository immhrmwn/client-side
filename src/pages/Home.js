import sprout from '../sprout.svg'
import logo from '../logo1.svg'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchingUsers } from '../store/actions/userAction'
import UsersList from '../components/UsersList'
import { useHistory } from 'react-router-dom'

function Home() {
  const { users, loading } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!localStorage.access_token) {
      history.push('/login')
    }
    dispatch(fetchingUsers())
    // eslint-disable-next-line
  }, [localStorage.access_token])

  const gotoLogin = () => {
    localStorage.clear()
    history.push(`/login`)
  }

  if (loading) return <p style={{textAlign: "center", margin: 100}}>loading...</p>
  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="logo" style={{marginRight: '10px'}}/>
        <img src={sprout} alt="logo"/>
      </div>
      <div className="content">
        <h1>Great, {localStorage.name}! Here’s your registered name</h1>
        <div className="subcontent">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => {
                return <UsersList key={user._id} user={user}/>
              })
            }
          </tbody>
        </table>
        </div>
        <div>
          <button onClick={gotoLogin} className="button">Sign Out</button>
        </div>
      </div>
    </div>
  );
}

export default Home;