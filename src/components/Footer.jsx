import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div>
      <footer className="footerContainer">
        <div className="footHeading">
          <h1>Food Do.</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis
            modi laborum aliquid eveniet explicabo veritatis. Velit saepe optio
            culpa. Earum commodi reiciendis reprehenderit ea soluta sint
            exercitationem vitae, quaerat debitis?
          </p>
          <div>
            <FontAwesomeIcon className="brandIcons" icon={faFacebook} />
            <FontAwesomeIcon className="brandIcons" icon={faInstagram} />
            <FontAwesomeIcon className="brandIcons" icon={faLinkedinIn} />
          </div>
        </div>
        <div className="footerAbout">
          <div className="about">
            <h2>Company</h2>
            <p>Home</p>
            <p>About US</p>
            <p>Delivery</p>
            <p>Privacy Policy</p>
          </div>
          <div className="about">
            <h2>Get In Touch</h2>
            <p>03000000</p>
            <p>johnwick@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
