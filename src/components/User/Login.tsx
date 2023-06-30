import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import linkedinIcon from '../assets/signin-button.png';


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
      <br></br>
      <br/>
      <div>
      <p className="pb-2 border-bottom text-center fs-1">
          <strong></strong>
        </p>
      </div>
      <label htmlFor="exampleInputPassword1" className="form-label" style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}}>
  O Ingresa con LinkedIn
</label>
<div>
  <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}}>
  <Link to={'/auth/linkedin'}>
  <button
    
    type="button"
    style={{
      background: `url(${linkedinIcon}) no-repeat center`,
      backgroundSize: 'cover',
      width: '198px',
      height: '36px',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      transition: 'transform 0.3s',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'scale(1.1)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
    }}
  ></button>
  </Link>
</div>
</div>


    </form>
  );
};

export default Login;
