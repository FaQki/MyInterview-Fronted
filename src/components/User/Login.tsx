import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const Login = () => {
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: InputChange) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const api = 'http://localhost:3000';
  
      const response = await axios.post(`${api}/signin`, credentials);
  
      const data = response.data;
      toast.success("Inicio de sesión exitoso"); 
      console.log(data);
      navigate("/"); 
    } catch (error) {
      console.error(error);
      toast.error("Error al iniciar sesión, correo o contraseña incorrecta"); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Correo electrónico
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          name="email"
          aria-describedby="emailHelp"
          placeholder="Ingrese su correo electrónico"
          value={credentials.email}
          onChange={handleInputChange}
          required
          autoFocus
        />
        <div id="emailHelp" className="form-text">
          Nunca compartiremos su correo electrónico con nadie más.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          name="password"
          placeholder="Ingrese su contraseña"
          value={credentials.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Recordarme
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Iniciar sesión
      </button>
    </form>
  );
};

export default Login;
