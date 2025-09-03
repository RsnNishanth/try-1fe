
import Login from './components/Login'
import SignUp from './components/SignUp'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom"
import NavBar from './components/NavBar'
import Products from './components/Products'
import Watch from './components/Watch'
import Shoe from './components/Shoe'
import Books from './components/Books'
import Health from './components/Health'
import Grocery from './components/Grocery'
import Home from './components/Home'
import Cart from './components/Cart'
function App() {


  return (
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/watch' element={<Watch/>}/>
        <Route path='/shoe' element={<Shoe />}/>
        <Route path='/health' element={<Health/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/grocery' element={<Grocery/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>

    </Router>
     
    </>
  )
}

export default App
