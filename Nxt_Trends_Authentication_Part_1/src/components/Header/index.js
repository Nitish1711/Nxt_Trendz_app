// Header/index.js
import Cookies from 'js-cookie'
import './index.css'
import {useNavigate} from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const logout = () => {
    Cookies.remove('jwt_token')
    console.log('Cookies is Checking in log out = ' + Cookies.get('jwt_token'))
    navigate('/login')
  }

  return (
    <div className="nav-bar">
      <img
        className="logo"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        alt="NXT Trendz Logo"
      />
      <div className="nav-bar-r">
        <button className="home-btn">Home</button>
        <button className="product-btn">Products</button>
        <button className="cart-btn">Cart</button>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
