import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faXmark,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { AppContent } from "../context/Appcontext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const { userData, backendURL, setUserData, setIsLoggedIn, sendData ,cart,removeCartState } =
    useContext(AppContent);

  const [click, setClick] = useState(true);
  const [cross, setCross] = useState(false);

  const navigate = useNavigate();
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendURL + "/logout");
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  function handleBar() {
    setClick(false);
    setCross(true);
  }
  function handleCrossBar() {
    setCross(false);
    setClick(true);
  }

  function Click() {
    sendData();
  }

  return (
    <div>
      <header>
        <div className="logo">
          <h1>Food Do</h1>
        </div>
        <nav className={click ? "hide" : "navShow"}>
          <div className={`divBar`}>
            <ul>
              <li>
                <Link to="/" style={{ padding: "10px 30px" }}>
                  Home
                </Link>
              </li>
              {userData ? (
                <>
                  <li>
                    <Link to="/cart" style={{ padding: "10px 24px" }}>
                      Cart
                      <FontAwesomeIcon
                        style={{ marginLeft: "10px" }}
                        icon={faCartShopping}
                      />
                      {cart.length > 0 ? (
                        <FontAwesomeIcon icon={faCircle} style={{marginLeft: "1px"}} />
                        ): null
                    }
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={logout}
                      style={{ padding: "10px 25px" }}
                    >
                      Log Out
                    </Link>
                  </li>
                  <li>
                    <Link to="/Allorders" style={{ padding: "10px 17px" }} onClick={removeCartState}>
                      All Orders
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" style={{padding: "10px 35px"}}>Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <FontAwesomeIcon
          className={`${click ? "show" : "hide"} menuBar`}
          onClick={handleBar}
          style={{ fontSize: "20px", marginRight: "30px" }}
          icon={faBars}
        />
        <FontAwesomeIcon
          className={`${cross ? "show" : "hide"} cross`}
          onClick={handleCrossBar}
          icon={faXmark}
        />
      </header>
    </div>
  );
};

export default Navbar;
