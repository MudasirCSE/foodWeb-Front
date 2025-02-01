import React, { useContext, useState, useEffect, } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AppContent } from "../context/Appcontext";
import {Link} from "react-router-dom"

const Cart = () => {
  const { setCart, cart } = useContext(AppContent);

  function removeItem(id) {
    const remove = cart.filter((obj) => obj.id !== id);
    setCart(remove);
    localStorage.removeItem("cart",remove)
  }

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, [setCart]);

  function updatedQuantity(id, newQuantity) {
    const newCart = cart.map((obj) => {
      if (obj.id === id) {
        return { ...obj, quantity: newQuantity };
      }
      return obj;
    });
    setCart(newCart);
    console.log(newCart);
  }

  return (
    <>
      <div className="cartContainer">
        {/* Cart DATA */}
        <div className="cartData">
          <div className="cartHeading">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          {/* Card */}
          {cart.length > 0 ? (
            cart.map((obj, index) => {
              // Each item needs to be returned explicitly inside map
              return (
                <div className="cartDiv" key={obj.id} id={obj.id}>
                  <div className="lines"></div>
                  <div className="cartCard">
                    <img width={50} height={50} src={obj.imgURL} alt="" />
                    <p>{obj.itemName}</p>
                    <p>{obj.price}</p>
                    <input
                      type="text"
                      name="quantity"
                      id="quantity"
                      style={{
                        width: "30px",
                        height: "20px",
                        textAlign: "center",
                      }}
                      value={obj.quantity}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (newValue === "" || /^[0-9]+$/.test(newValue)) {
                          updatedQuantity(
                            obj.id,
                            newValue === "" ? 0 : parseInt(newValue)
                          );
                        }
                      }}
                    />
                    <p>{obj.price * obj.quantity}</p>
                    <button
                      onClick={() => {
                        removeItem(obj.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Cart is empty</p>
          )}
        </div>

        {/* Total order Section */}
        {/* Total order Section */}
        {cart.length > 0 ? (
          <div className="totalOrder">
            <h3>Cart Totals</h3>
            <div className="total">
              <p>Subtotal</p>
              <p>{`${cart.reduce(
                (acc, obj) => acc + obj.quantity * obj.price,
                0
              )}`} pkr</p>
              {/* Calculate subtotal */}
            </div>
            <div className="totalline"></div>
            <div className="total">
              <p>Delivery Fee</p>
              <p>10 pkr</p> {/* You can set this dynamically if needed */}
            </div>
            <div className="totalline"></div>
            <div className="total">
              <p>Total</p>
              <p>{`${
                cart.reduce((acc, obj) => acc + obj.quantity * obj.price, 0) +
                10
              }`} pkr</p>{" "}
              {/* Subtotal + Delivery Fee */}
            </div>
            <div className="totalline"></div>
            <div className="checkOut">
             <Link to="/checkout">
             <button className="checkout">Check Out</button>
             </Link> 
            </div>
          </div>
        ) : (
          <div>
            <p></p>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
