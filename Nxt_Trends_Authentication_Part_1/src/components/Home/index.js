// Home/index.js
import React, {useEffect} from 'react'
import Header from '../Header'
import './index.css'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token')

    if (!jwtToken) {
      console.log('JWT Token Not Present')
      navigate('/login')
    } else {
      console.log(jwtToken)
    }
  }, [navigate])

  return (
    <div className="container">
      <Header />
      <div className="main-container">
        <div className="left-side">
          <h1 className="heading">Clothes That Get You Noticed</h1>
          <p className="paragraph">
            A paragraph (from Ancient Greek παράγραφος (parágraphos) 'to write
            beside') is a self-contained unit of discourse in writing dealing
            with a particular point or idea. Though not required by the
            orthographic conventions of any language with a writing system,
            paragraphs are a conventional means of organizing extended segments
            of prose.
          </p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
        <div className="right-side">
          <img
            className="clothes"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
            alt="Clothes That Get You Noticed"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
