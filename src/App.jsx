import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer, toast } from "react-toastify";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Myorders from "./components/Myorders";
import Footer from "./components/Footer";
import Allorders from "./components/Allorders";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Home />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar />
          <Signup />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <Navbar />
          <Cart />
          <Footer />
        </>
      ),
    },
    {
      path: "/checkout",
      element: (
        <>
          <Navbar />
          <Checkout />
          <Footer />
        </>
      ),
    },
    {
      path: "/myorders",
      element: (
        <>
          <Navbar />
          <Myorders />
          <Footer />
        </>
      ),
    },
    {
      path: "/Allorders",
      element: (
        <>
          <Navbar />
          <Allorders />
          <Footer />
        </>
      ),
    },
  ]);

  return (
    <div>
      <ToastContainer
        // position="top-center" // Adjust the position to your needs
        autoClose={2000} // Auto close after 3 seconds
        // hideProgressBar={true} // Hide progress bar
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
