
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route,Routes, useLocation } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCategory from './components/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './components/Cart'
import AddAddress from './components/AddAddress'
import MyOrder from './components/MyOrder'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './components/seller/AddProduct'
import ProductList from './components/seller/ProductList'
import Order from './components/seller/Order'
import Loading from './components/Loading'
const App = () => {

  const sellerPath = useLocation().pathname.includes("seller");
  const {userLogin, seller} = useAppContext()
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
     {sellerPath ? null : <Navbar/>} 
     {userLogin ? <Login /> : null}
     <Toaster />
      <div className={`${sellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Product' element={<AllProducts />}/>
        <Route path='/Product/:category' element={<ProductCategory />}/>
        <Route path='/Product/:category/:id' element={<ProductDetails />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/add-address' element={<AddAddress />}/>
        <Route path='/my-orders' element={<MyOrder />}/>
        <Route path='/loader' element={<Loading />}/>

        <Route path='/seller' element={seller ? <SellerLayout/> : <SellerLogin/>}>
        <Route index element={seller ? <AddProduct /> : null}></Route>
        <Route path='productList' element={<ProductList/>}></Route>
        <Route path='orders' element={<Order/>}></Route>

        </Route>

      </Routes>
      </div>
      {!sellerPath && <Footer />}
    </div>
  )
}

export default App
