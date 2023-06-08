import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <img
              src="/mylogo.png"
              alt="Logo"
              style={{ width: "90px", height: "auto" }}
              className="me-2"
            />
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li className="nav-item">
              <Link className="nav-link px-2 text-white" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-2 text-white" to="/videos">
                Mis videos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-2 text-white" to="/new-video">
                Crear nuevo video
              </Link>
            </li>
          </ul>

          <div className="text-end">
            <button
              className="btn btn-outline-light me-2"
              onClick={toggleDarkMode}
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>
            <button className="btn btn-primary">Registrase</button>
          </div>
        </div>
      </div>
    </header>
  );
};
