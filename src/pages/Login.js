import logo from '../logo1.svg'
import sprout from '../sprout.svg'
import { useHistory, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { login } from '../store/actions/userAction'
import { useDispatch } from 'react-redux'

function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (localStorage.access_token) {
      history.push('/')
    }
    // eslint-disable-next-line
  }, [localStorage.access_token])

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(login(user, history))
    setUser({
      email: '',
      password: '',
    })
  }

  const handleChange = (event) => {
    let { name, value } = event.target
    const payload = { ...user, [name]: value }
    setUser(payload)
  }

  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="logo" style={{marginRight: '10px'}}/>
        <img src={sprout} alt="logo"/>
      </div>
      <div className="content">
        <div style={{textAlign: "center", color: '#4D4F5B'}}>
          <h1>Sign In</h1>
          <p>Welcome Back to Sprout Digital Labs</p>
        </div>
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <input type="email" className="form-control" placeholder="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input type="password" className="form-control" placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <p style={{textAlign: "right", color: '#F69621', fontSize: 12}}>Forgot Password ?</p>
            <div style={{marginTop: 80}}>
              <button type="submit" className="button">Sign In</button>
            </div>
          </form>
        </div>
        <p style={{fontSize: 12}}>New to Sprout ? <Link to="/register" style={{color: '#F69621', textDecoration: 'none'}}>Create account</Link></p>
      </div>
    </div>
  );
}

export default Login;