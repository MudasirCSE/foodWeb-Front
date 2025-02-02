import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FastFood, SpecialDishes, Deserts } from "../assets/Foodslist";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const [items, setItem] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);
  const [freshOrder, setFreshOrder] = useState([]);
  const [allorders, setAllorders] = useState([]);

  // Sending Data of foods to store in foodItems DB:

  const sendData = async (req, res) => {
    try {
      const response = await axios.post(backendURL + "/sendList", {
        deserts: Deserts,
      });
      console.log(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Simply Authenticating The User:

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendURL + "/is-auth");
      // console.log(data);
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      }else{
        setIsLoggedIn(false)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  // Simply getting data of that particular user who has loged In:

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendURL + "/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
      console.log(data);
      const values = data.userData;
      // console.log(val)
      const { username, email } = values;
      setUser(() => {
        return [username, email];
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  function removeCartState() {
    localStorage.removeItem("cart")
  }
  const value = {
    backendURL,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    sendData,
    getAuthState,
    items,
    setItem,
    cart,
    setCart,
    user,
    setUser,
    freshOrder,
    setFreshOrder,
    allorders,
    setAllorders,
    removeCartState
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
