import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setcartItems] = useState({})
    const url = "https://food-del-d10x.onrender.com/";
    const [token, settoken] = useState("")
    const [food_list, setfood_list] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setcartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if(token){
          await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    }

    const removeFromCart = async (itemId) => {
        setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(token){
          await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }
    }

    const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const item in cartItems) {
          if (cartItems[item] > 0) {
              let itemInfo = food_list.find((product) => product._id === item);
              if (itemInfo) {
                  totalAmount += itemInfo.price * cartItems[item];
              } else {
                  console.warn(`Product with id ${item} not found in food_list`);
              }
          }
      }
      return totalAmount;
  };
  
//   useEffect(() => {
//     console.log("Food list:", food_list);
//     console.log("Cart items:", cartItems);
// }, [food_list, cartItems]);


    const fetch_food_list = async () => {
        try {
          const response = await axios.get(`${url}/api/deal/list`);
          setfood_list(response.data.data);
        } catch (error) {
          console.error('Error fetching food list:', error);
        }
      };

      const loadCartData = async (token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setcartItems(response.data.cartData);
      }
    
      useEffect(() => {
        const load_data = async () => {
          if (localStorage.getItem("token")) {
            settoken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
          }
          await fetch_food_list();
        };
        load_data();
      }, [url, settoken]);

    const contextValue = {
        food_list,
        cartItems,
        setcartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        settoken,
    }



    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;
