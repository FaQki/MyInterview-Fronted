import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User } from "./User";
import * as UserService from "./UserService";
import { toast } from "react-toastify";
import axios from 'axios'
import linkedinIcon from '../assets/signin-button.png';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const UserForm = () => {

  const handleLinkedInLogin = () => {
    window.location.href = 'http://localhost:3000/auth/signin/linkedin'; // Redirige a la ruta de inicio de sesión en tu API
  };

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleConfirmPasswordChange = (e: InputChange) => {
    setConfirmPassword(e.target.value);
  };


  const handleInputChange = (e: InputChange) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (user.password !== confirmPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      }
  
      if (user.password.length < 6) {
        toast.error("La contraseña debe tener al menos 6 caracteres");
        return;
      }
    
      try {
        const api = 'http://localhost:3000';
    
        const response = await axios.post(`${api}/signup`, user);
    
        const data = response.data;
        toast.success("Registro exitoso"); 
        console.log(data);
        navigate("/"); 
      } catch (error) {
        console.error(error);
        toast.error("Error en el registro"); 
      }
    };

  const getUser = async (id: string) => {
    const res = await UserService.getOneUser(id);
    const { firstName, lastName, email, password, roles } = res.data;
    setUser({ ...user, firstName, lastName, email, password, roles });
  };

  useEffect(() => {
    if (params.id) getUser(params.id);
  }, [params.id]);

  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            onChange={handleInputChange}
            value={user.firstName}
            placeholder="Ingrese su nombre"
            autoFocus
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            onChange={handleInputChange}
            value={user.lastName}
            placeholder="Ingrese su apellido"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Direccion de correo electronico
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Ingrese su correo electronico"
            required
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
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={handleInputChange}
            value={user.password}
            placeholder="Ingrese su contraseña"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Repetir contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Repita su contraseña"
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
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
        <br></br>
        <br/>
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
  <button
    onClick={handleLinkedInLogin}
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
</div>
</div>

      </form>
    </div>
  );
};

export default UserForm;
