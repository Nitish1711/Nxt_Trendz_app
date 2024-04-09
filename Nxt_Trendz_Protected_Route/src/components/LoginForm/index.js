import {Component} from 'react'
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  navigate = Navigate()
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    navigate('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      Navigate('/')
    }

    return (
      <div className='login-form-container'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'
          className='login-website-logo-mobile-img'
          alt='website logo'
        />
        <img
          src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png'
          className='login-img'
          alt='website login'
        />
        <form className='form-container' onSubmit={this.submitForm}>
          <img
            src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'
            className='login-website-logo-desktop-img'
            alt='website logo'
          />
          <div className='input-container'>
            <label className='input-label' htmlFor='username'>
              USERNAME
            </label>
            <input
              type='text'
              id='username'
              className='username-input-field'
              value={username}
              onChange={this.onChangeUsername}
              placeholder='Username'
            />
          </div>
          <div className='input-container'>
            <label className='input-label' htmlFor='password'>
              PASSWORD
            </label>
            <input
              type='password'
              id='password'
              className='password-input-field'
              value={password}
              onChange={this.onChangePassword}
              placeholder='Password'
            />
          </div>
          <button type='submit' className='login-button'>
            Login
          </button>
          {showSubmitError && <p className='error-message'>*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginRoute
