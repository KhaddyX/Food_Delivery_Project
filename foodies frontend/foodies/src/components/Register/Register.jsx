import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../service/authService";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "" };

    // Name validation
    if (!data.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (data.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      valid = false;
    }

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
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      const response = await registerUser(data);
      if (response.status === 201) {
        toast.success("Registration completed. Please login.");
        navigate("/login");
      } else {
        toast.error(response.message || "Unable to register. Please try again");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to register. Please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResetHandler = () => {
    setData({ name: "", email: "", password: "" });
    setErrors({ name: "", email: "", password: "" });
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h2>Create Account</h2>
            <p>Join us today and start your food journey</p>
          </div>

          <form onSubmit={onSubmitHandler} className="register-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                className={`form-input ${errors.name ? "error" : ""}`}
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

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
                placeholder="Create a password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
              <div className="password-hint">
                Password must be at least 6 characters
              </div>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Create Account"}
            </button>

            <button
              type="button"
              onClick={onResetHandler}
              className="reset-btn"
              disabled={isSubmitting}
            >
              Reset Form
            </button>

            <div className="login-link">
              Already have an account? <Link to="/login">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;