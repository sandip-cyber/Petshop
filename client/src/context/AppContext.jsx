import { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setUser] = useState(false);
    const [seller, setSeller] = useState(false);
    const [userLogin, setUserLogin] = useState(false);
    const [product, setproduct] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});


    //Fetch Seller Status
    const fetchSeller = async () =>{
    try {
    const {data} = await axios.get('/api/seller/is-auth')
    if (data.success) {
        setSeller(true)
    }else{
        setSeller(false)
    }
} catch {
        setSeller(false)
}
    }

    //Fetch User Auth Status, User Data and Cart Items

    const fetchUser = async ()=>{
        try {
            const {data} = await axios.get('/api/user/is-auth');
            if (data.success) {
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }
        } catch{
            setUser(false)
        }
    }


    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Add to Cart");
    };

    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart Updated");
    };

       

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }

        
        toast.success("Remove From Cart");
        setCartItems(cartData);
    };
    // get cart item count
    
    const getCartCount = () => {
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        }
        return totalCount;
    }
    // get cart totalCount amount

    const getCartAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItems){
            let itemInfo = product.find((product)=> product._id === item);
            if(cartItems[item] > 0){
                totalAmount += itemInfo.offerPrice * cartItems[item]
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }
        // FETCH ALL PRODUCTS

    const fetchProduct = async () => {
        try {
            const {data} = await axios.get('/api/product/list');
            if (data.success) {
                setproduct(data.product)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
        
        fetchUser();
        fetchSeller();
        fetchProduct();
    }, []);

    // Update Database Cart Items

    useEffect(()=>{
        const updateCart = async()=>{
           try {
             const {data} =await axios.post('/api/cart/update',{cartItems});
            if (!data.success) {
                toast.error(data.message)
            }
           } catch (error) {
            toast.error(error.message)
           }
        }

        if (user) {
            updateCart()
        }
    },[cartItems])

    const value = { navigate, user, setUser, seller, setSeller, userLogin, setUserLogin, product, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartCount, getCartAmount, axios, fetchProduct, setCartItems};

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);