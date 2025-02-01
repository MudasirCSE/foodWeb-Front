import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { AppContent } from "../context/Appcontext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cards = (props) => {
  const [click, setClick] = useState(false);
  const [cardQuantity, setCardQuantity] = useState(1);

  const { backendURL, getAuthState, isLoggedIn, items, cart, setCart } =
    useContext(AppContent);

  function handleQuantity(e) {
    setCardQuantity(Number(e.target.value));
  }

  const navigate = useNavigate();
  function handleClick(id) {
    getAuthState();
    if (isLoggedIn === false) {
      toast.error("You are not authorized, please login");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else if (isLoggedIn === true) {
      console.log("Welcome");
      const item = items.find((obj) => obj._id === id);
      const cartItem = {
        itemName: item.itemName,
        price: item.price,
        imgURL: item.imgURL,
        id: item._id,
        quantity: cardQuantity,
      };
      setCart((prev) => [...prev, cartItem]);
      console.log(cartItem);
    }
  }
  return (
    <div>
      <div className="card">
        <img className="foodImg" src={props.imgurl} alt="" />
        <div className="values">
          <p>{props.name}</p>
          <input
            className="quantity"
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Quantity"
            value={cardQuantity}
            onChange={handleQuantity}
          />
          <span>{props.price} pkr</span>
        </div>
        <button className={`cart`} onClick={() => handleClick(props.id)}>
          Add To Cart
          <FontAwesomeIcon
            icon={faCartShopping}
            style={{ fontSize: "16px", marginLeft: "10px" }}
          />
        </button>
      </div>
    </div>
  );
};

export default Cards;
