
import './App.css'
import Signup from './components/Signup'
import {Routes,Route} from "react-router-dom"
import Home from './components/home'
import Login from './components/Login'
function App() {


  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path = '/login' element={<Login/>}/>
    </Routes>
  )
}

export default App
