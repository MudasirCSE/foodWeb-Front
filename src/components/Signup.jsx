import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/Appcontext";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = () => {
  const { backendURL, setIsLoggedIn } = useContext(AppContent);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
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

    const { username, email, password } = formData;

    try {
      const { data } = await axios.post(backendURL + "/signup", {
        username,
        email,
        password,
      });
      const message = data.message;

      if (message === "Form submitted successfully!") {
        toast.success(data.message);
        setIsLoggedIn(true);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        toast.error(message);
        navigate("/signup");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="loginContainer">
        <div className="loginContent">
          <h1>Sign Up Form</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="/signup"
            method="post"
          >
            {/* register your input into the hook by invoking the "register" function */}
            <input
              type="text"
              placeholder="Enter Username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <span className="message">{errors.username.message}</span>
            )}

            {/* register your input into the hook by invoking the "register" function */}
            <input
              type="email"
              placeholder="Enter email"
              {...register("email", { required: "email is required" })}
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
        </div>
      </div>
    </div>
  );
};
export default Signup;
