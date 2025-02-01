import React, { useState, useEffect} from "react";
import images from "../images";

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gallery">
      <img className="galleryImage" src={images[currentIndex]} alt="" />
    </div>
  );
};

export default Gallery;
