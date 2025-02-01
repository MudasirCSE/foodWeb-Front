import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcPaypal } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import cod from "../assets/cod.png";
import stripe from "../assets/stripe.png";
import { useContext, useRef } from "react";
import { AppContent } from "../context/Appcontext";
import { toast } from "react-toastify";
import axios, { all } from "axios";
import { useNavigate, Link } from "react-router-dom";

const Checkout = () => {
  const {
    cart,
    setCart,
    user,
    setUser,
    backendURL,
    freshOrder,
    setFreshOrder,
    allorders,
    setAllorders,
  } = useContext(AppContent);

  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  // Create refs for each checkbox
  const codRef = useRef(null);

  const handleCheckBox = (selectRef) => {
    // Uncheck all other checkboxes if they are not the selected one
    if (codRef.current && selectRef !== codRef) codRef.current.checked = false;
  };

  function handleClicked() {
    setChecked((preValues) => !preValues);
    codRef.current.checked != checked;
  }

  // Form submit handler
  const onSubmit = async (data) => {
    if (codRef.current && codRef.current.checked) {
      const allinone = {
        cart,
        data,
        user,
      };
      const placeOrder = async () => {
        try {
          const formData = await axios.post(backendURL + "/myorders", allinone);
          const response = formData.data;
          const newOrder = response.newlyOrder.order; // New Fresh Order
          console.log(response);
          const ordStatus = response.newlyOrder.status;
          const [{ price, productName, quantity, _id }] = newOrder;

          localStorage.removeItem("freshOrder");

          const orderFresh = {
            price: price,
            productName: productName,
            quantity: quantity,
            _id: _id,
            status: ordStatus,
          };
          setFreshOrder([orderFresh]);

          toast.success("Order Placed");
          setTimeout(() => {
            navigate("/myorders");
          }, 2000);
        } catch (error) {
          toast.error(error.message);
        }
      };
      placeOrder();
    } else {
      toast.error("Please select payement method");
    }
  };

  return (
    <div>
      <div className="checkoutContainer">
        <div className="delInfo">
          <h1>Delivery Information</h1>
          <form
            action="/myorders"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="multiLine">
              <input
                type="text"
                name="fname"
                id=""
                placeholder="First Name"
                // required
                {...register("fname", { required: "First name is required" })}
              />
              <input
                type="text"
                name="lname"
                id=""
                placeholder="Last Name"
                // required
                {...register("lname", { required: "Last name is required" })}
              />
            </div>
            <input
              className="oneLine"
              type="email"
              name="email"
              id=""
              placeholder="Email Address"
              // required
              {...register("email", { required: "Email is required" })}
            />
            <input
              className="oneLine"
              type="text"
              name="street"
              id=""
              placeholder="Street"
              // required
              {...register("street", { required: "Street is required" })}
            />
            <div className="multiLine">
              <input
                type="text"
                name="city"
                id=""
                placeholder="City"
                // required
                {...register("city", { required: "City is required" })}
              />
              <input
                type="text"
                name="state"
                id=""
                placeholder="State"
                // required
                {...register("state", { required: "State is required" })}
              />
            </div>
            <div className="multiLine">
              <input
                type="text"
                name="zipcode"
                id=""
                placeholder="Zip Code"
                // required
                {...register("zipcode", { required: "Zip Code is required" })}
              />
              <input
                type="text"
                name="country"
                id=""
                placeholder="Country"
                // required
                {...register("country", { required: "Country is required" })}
              />
            </div>
            <input
              className="oneLine"
              type="text"
              name="phone"
              id=""
              placeholder="Phone"
              // required
              {...register("phone", { required: "Phone number is required" })}
            />
            <input type="submit" value="Place Order" />
          </form>
        </div>
        {cart.length > 0 ? (
          <div className="payment">
            <h1>Cart Total</h1>

            {/* Subtotal */}
            <div className="paymentLine">
              <p>Subtotal</p>
              <p>
                {`${cart.reduce(
                  (acc, obj) => acc + obj.quantity * obj.price,
                  0
                )}`}{" "}
                pkr
              </p>
            </div>

            <div className="newline"></div>

            {/* Delivery Fee */}
            <div className="paymentLine">
              <p>Delivery Fee</p>
              <p>10 pkr</p>
            </div>

            <div className="newline"></div>

            {/* Total (Subtotal + Delivery Fee) */}
            <div className="paymentLine">
              <p>Total</p>
              <p>
                {`${
                  cart.reduce((acc, obj) => acc + obj.quantity * obj.price, 0) +
                  10
                }`}{" "}
                pkr
              </p>
            </div>

            <div className="newline"></div>

            {/* Payment Methods */}
            <div className="payWay">
              <h2>Payment Method</h2>
              <div className="waypay">
                <button onClick={handleClicked}>
                  <input
                    ref={codRef}
                    type="checkbox"
                    name="cod"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                  <p>Cash on delivery (COD)</p>
                  <img src={cod} width={40} height={40} alt="COD" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
