import React, { useState } from "react";
import "./HomePage.scss";
import HeroImage from "../assets/Artist-pana.svg";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverurl } from "..//url";

Modal.setAppElement("#root");

const HomePage = () => {
  const [open, setOpen] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">GroundHog</div>

        {/*------------------ login section----------------- */}
        <button className="login-button" onClick={openModal}>
          Login
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Login Modal"
          className="login-modal"
          overlayClassName="login-modal-overlay"
        >
          <h2>Login to Your Account</h2>
          <button onClick={closeModal} className="close-modal">
            X
          </button>
          <Login />
        </Modal>
      </header>
      <main className="main-content">
        <div className="image-section">
          {/* Placeholder for the image */}
          <img src={HeroImage} alt="Descriptive Alt Text" />
          <p className="tagline">
            Create Together, Anywhere – Unleash Your Collaborative Imagination.
          </p>
        </div>
        <Register />
      </main>
      <footer className="footer">
        &copy; {new Date().getFullYear()} GroundHog. All rights reserved.
      </footer>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // Username validation
    if (!formData.username) {
      formIsValid = false;
      errors.username = "Username is required";
    }

    // Email validation
    if (!formData.email) {
      formIsValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      formIsValid = false;
      errors.password = "Password is required";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
       "/api/v1/register",
        formData
      );
      console.log(response.data);
      // Redirect to login or dashboard as needed
      console.log(response);
      navigate("/mainpage");
    } catch (error) {
      setError(error.response.data.message);
      console.error("Registration error:", error.response.data);
      // Handle errors (e.g., show error message)
    }
  };

  return (
    <div className="form-section">
      <form className="join-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <div className="error">{errors.username}</div>}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}
        {error && <div className="error">{error}</div>}
        <button type="submit" className="join-button">
          Join
        </button>
      </form>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("/api/v1/login", formData);
      console.log(response);
      // Set token and redirect to dashboard
      navigate("/mainpage");
    } catch (error) {
      console.error("Login error:", error.response.data);
      setError("Invalid credentials");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" className="submit-login">
        Login
      </button>
    </form>
  );
};

export default HomePage;
