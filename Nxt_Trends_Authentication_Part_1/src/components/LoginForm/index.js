// LoginForm/index.js
import './index.css'
import {useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    console.log(data)

    const onSubmitSuccess = jwtToken => {
      console.log(jwtToken)
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      navigate('/')
    }

    const onSubmitFailure = errorMsg => {
      setShowSubmitError(true)
      setErrorMsg(errorMsg)
    }

    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  return (
    <div className="main-page">
      <img
        className="main-page-logo"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        alt="NXT Trendz Logo"
      />
      <form className="login-card" onSubmit={onSubmitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="NXT Trendz Logo"
        />
        <label htmlFor="Username" className="user">
          USERNAME
        </label>
        <input
          type="text"
          value={username}
          name="Username"
          placeholder="Username"
          onChange={onChangeUsername}
          className="username"
        />
        <label htmlFor="Password" className="pass">
          PASSWORD
        </label>
        <input
          name="Password"
          value={password}
          type="password"
          placeholder="Password"
          className="password"
          onChange={onChangePassword}
        />
        <button type="submit">Login</button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default LoginForm
