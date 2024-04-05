// App.js
import {Routes, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default App
