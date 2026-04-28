
import './App.css'
import Signup from './components/Signup'
import {Routes,Route} from "react-router-dom"
import Home from './components/home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/guards/ProtectedRoute'
function App() {


  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path = '/login' element={<Login/>}/>
    </Routes>
  )
}

export default App
