import React from "react";
import Navbar from "./Navbar";
import Gallery from "./Gallery";
import Food from "./Food";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div>
        <Gallery />
      </div>
      <div>
        <Food />;
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
