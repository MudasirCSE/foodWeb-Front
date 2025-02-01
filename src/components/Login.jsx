import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AppContent } from "../context/Appcontext";
import { toast } from "react-toastify";

const Login = () => {
  const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContent);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const delay = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };
  const onSubmit = async (formData) => {
    await delay();

    axios.defaults.withCredentials = true;
    // Ensure the 'email', and 'password' are coming from formData or your state

    const { email, password } = formData;
    try {
      const { data } = await axios.post(backendURL + "/login", {
        email,
        password,
      });
      const message = data.message;
      if (message === "Login successful") {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/");
          setIsLoggedIn(true);
          getUserData();
        }, 3000);
      } else if (message === "Email does not found") {
        toast.error(message);
        setTimeout(() => {
          navigate("/signup");
        }, 3000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="loginContainer">
        <div className="loginContent">
          <h1>Login Form</h1>
          <form onSubmit={handleSubmit(onSubmit)} action="/login" method="post">
            {/* register your input into the hook by invoking the "register" function */}
            <input
              type="email"
              placeholder="Enter Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="message">{errors.email.message}</span>
            )}

            {/* include validation with required or other standard HTML validation rules */}
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
                maxLength: {
                  value: 8,
                  message: "Password cannot exceed 8 characters",
                },
              })}
            />
            {/* errors will return when field validation fails  */}
            {errors.password && (
              <span className="message">{errors.password.message}</span>
            )}
            <input type="submit" value="submit" disabled={isSubmitting} />
          </form>
          <p>
            Don't have an account ?
            <Link to="/signup" className="signupbtn">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
