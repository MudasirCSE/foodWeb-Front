import React, { useContext, useEffect, useState } from "react";
import Cards from "./Cards";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContent } from "../context/Appcontext";

const Food = () => {
  const { backendURL,items, setItem } = useContext(AppContent);
  const [categories, setCategories] = useState([]);
  // const [items, setItem] = useState([]);
  /// Food Categories:
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(backendURL + "/categoryName");
        // console.log("Fetched Categories:", response);
        setCategories(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getFoods = async () => {
      const response = await axios.get(backendURL + "/itemDetails");
      // console.log(response.data);
      setItem(response.data);
    };
    getFoods();
  }, []);

  return (
    <div className="foodContainer">
      {/* Render categories */}
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <div key={index} id={index}>
            <h2>{category.categoryName}</h2>
            <div className="line"></div>
            <div className="cardContainer">
              {/* Filter items by category */}
              {items.filter((item) => item.category === category._id).length >
              0 ? (
                items
                  .filter((item) => item.category === category._id)
                  .map((obj, index) => (
                    <Cards
                      key={obj._id}
                      id={obj._id}
                      imgurl={obj.imgURL}
                      name={obj.itemName}
                      price={obj.price}
                    />
                  ))
              ) : (
                <p>No dishes available for this category</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>Loading categories...</p>
      )}
    </div>
  );
};

export default Food;
