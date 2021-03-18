import sprout from '../sprout.svg'
import logo from '../logo1.svg'
import { useHistory, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { register } from '../store/actions/userAction'

function Register() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    phone_number: '',
    name: '',
    password_confirmation: '',
  })

  useEffect(() => {
    if (localStorage.access_token) {
      history.push('/')
    }
    // eslint-disable-next-line
  }, [localStorage.access_token])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newUser.password !== newUser.password_confirmation) {
      console.log('password is invalid, please check again')
    } else {
      const { email, password, phone_number, name} = newUser
      dispatch(register({
        name, phone_number, email, password
      }, history))
      setNewUser({
        email: '',
        password: '',
        phone_number: '',
        name: '',
        password_confirmation: '',
      })
    }
  }

  const handleChange = (event) => {
    let { name, value } = event.target
    const payload = { ...newUser, [name]: value }
    setNewUser(payload)
  }

  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="logo" style={{marginRight: '10px'}}/>
        <img src={sprout} alt="logo"/>
      </div>
      <div className="content">
        <div style={{textAlign: "center", color: '#4D4F5B'}}>
          <h1>Sign Up</h1>
          <p>Welcome to Sprout Digital Labs</p>
        </div>
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <input type="text" className="form-control" placeholder="Name" required
                name="name"
                value={newUser.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <input type="text" className="form-control" placeholder="Phone Number" required
                name="phone_number"
                value={newUser.phone_number}
                onChange={handleChange}
              />
            </div>
            <div>
              <input type="email" className="form-control" placeholder="Email" required
                name="email"
                value={newUser.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input type="password" className="form-control" placeholder="Password" required
                name="password"
                value={newUser.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <input type="password" className="form-control" placeholder="Password Confirmation" required
                name="password_confirmation"
                value={newUser.password_confirmation}
                onChange={handleChange}
              />
            </div>
            <p style={{textAlign: "right", color: '#F69621', fontSize: 12}}>Forgot Password ?</p>
            <div style={{marginTop: 20}}>
              <button type="submit" className="button">Sign Up</button>
            </div>
          </form>
        </div>
        <p style={{fontSize: 12}}>Already have an account ? <Link to="/login" style={{color: '#F69621', textDecoration: 'none'}}>Log In</Link></p>
      </div>
    </div>
  );
}

export default Register;