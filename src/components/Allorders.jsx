import React, { useContext, useState, useEffect } from "react";
import { AppContent } from "../context/Appcontext";
import axios from "axios";

const Allorders = () => {
  const { allorders, setAllorders, user, backendURL } = useContext(AppContent);
  const [all, setAll] = useState([]);

  useEffect(() => {
    const allOrders = async () => {
      try {
        const response = await axios.post(backendURL + "/takeEmail", user);
        const data = response.data;
        console.log(response.data);
        setAll(response.data.historyData); // Set the fetched data
      } catch (error) {
        console.log(error.message);
      }
    };

    allOrders();
  }, [user, backendURL]);

  return (
    <div>
      <div className="allOrders">
        <h1>Order History</h1>

        {all.map((orderData, index) => (
          <div key={index} className="order">
            <h3>Order {index + 1}</h3>
            <p>Date: {orderData.date}</p>

            {orderData.order && orderData.order.length > 0 ? (
              orderData.order.map((obj, idx) => (
                <div key={idx} className="allCards">
                  <img
                    src={obj.image}
                    alt={obj.productName}
                  />
                  <div className="order-details">
                    <p>{obj.productName}</p>
                    <p>Quantity: {obj.quantity}</p>
                    <p>Price: {obj.price} Pkr</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in this order</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allorders;
