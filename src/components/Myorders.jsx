import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive, faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { AppContent } from "../context/Appcontext";
import img from "../assets/box.png";

const Myorders = () => {
  const { freshOrder, setFreshOrder, backendURL } = useContext(AppContent);

  useEffect(() => {
    if (freshOrder.length > 0) {
      localStorage.setItem("freshOrder", JSON.stringify(freshOrder));
    }
  }, [freshOrder]);

  useEffect(() => {
    const newFresh = JSON.parse(localStorage.getItem("freshOrder"));
    if (newFresh) {
      setFreshOrder(newFresh);
    }
  }, [setFreshOrder]);

  const [text, setText] = useState(() => {
    return localStorage.getItem("text") || "Processing";
  });

  setTimeout(() => {
    localStorage.removeItem("freshOrder");
  }, 10000);

  return (
    <div className="myContainer">
      <div className="nope">
        <h1>My Orders</h1>
        {freshOrder.length > 0 ? (
          freshOrder.map((obj, index) => {
            return (
              <div className="myCard" key={index}>
                <img width={50} height={50} src={img} alt="" />
                <p>{obj.productName}</p>
                <p>{obj.price * obj.quantity + 10}</p>
                <p>Items:{obj.quantity}</p>
                <p>
                  <FontAwesomeIcon
                    style={{ marginRight: "10px" }}
                    icon={faCircleDot}
                  />
                  {text}
                </p>
                <button className="tod">Track Order</button>
              </div>
            );
          })
        ) : (
          <div>
            <p>Your Order out for delivery</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Myorders;
