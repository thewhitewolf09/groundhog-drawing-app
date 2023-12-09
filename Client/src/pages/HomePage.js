import React, { useState } from "react";
import "./HomePage.scss";
import HeroImage from "../assets/Artist-pana.svg";
import Modal from "react-modal";
import { Link } from "react-router-dom";

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
          <form className="login-form">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <Link to="/mainpage">
              <button type="submit" className="submit-login">
                Login
              </button>
            </Link>
          </form>
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
        <div className="form-section">
          <form className="join-form">
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit" className="join-button">
              Join
            </button>
          </form>
        </div>
      </main>
      <footer className="footer">
        &copy; {new Date().getFullYear()} GroundHog. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
