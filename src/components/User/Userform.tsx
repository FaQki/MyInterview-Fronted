import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "./User";
import * as UserService from "./UserService";
import { toast } from "react-toastify";
import axios from 'axios'

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const UserForm = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const [user, setUser] = useState<User>({
    username: "",
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
    const { username, email, password, roles } = res.data;
    setUser({ ...user, username, email, password, roles });
  };

  useEffect(() => {
    if (params.id) getUser(params.id);
  }, [params.id]);

  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Nombre y apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={handleInputChange}
            value={user.username}
            placeholder="Ingrese nombre y apellido"
            autoFocus
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
      </form>
    </div>
  );
};

export default UserForm;
