import "./Login.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import { StoreContext } from "../../context/StoreContext";
import { login } from "../../service/authService";


const Login = () => {
  const { setToken, loadCartData } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    // Password validation
    if (!data.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await login(data);
      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        await loadCartData(response.data.token);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(response.message || "Unable to login. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to login. Please check your credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResetHandler = () => {
    setData({ email: "", password: "" });
    setErrors({ email: "", password: "" });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue your food journey</p>
          </div>

          <form onSubmit={onSubmitHandler} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={onChangeHandler}
                className={`form-input ${errors.email ? "error" : ""}`}
                placeholder="Enter your email"
                autoComplete="username"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={onChangeHandler}
                className={`form-input ${errors.password ? "error" : ""}`}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="/forgot-password" className="text-primary">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>

            <button
              type="button"
              onClick={onResetHandler}
              className="reset-btn"
              disabled={isSubmitting}
            >
              Reset Form
            </button>

            <div className="register-link">
              Don't have an account? <Link to="/register">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;