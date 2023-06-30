import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LinkedInSignIn = () => {
  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const authorizationCode = params.get('code');

    if (authorizationCode) {
      axios.post('http://localhost:3000/auth/linkedin/callback', { code: authorizationCode })
        .then(response => {
          const { firstName, lastName, email, profilePicture } = response.data;

          // Hacer algo con los datos del usuario (por ejemplo, guardarlos en el estado global de la aplicación)

          // Redirigir al usuario a la página principal u otra página relevante
          history('/');
        })
        .catch(error => {
          // Manejar errores apropiadamente
        });
    } else {
      // Manejar el caso en el que no se haya proporcionado el código de autorización
    }
  }, [location.search, history]);

  return (
    <div>
      {/* Renderizar un mensaje o un spinner mientras se procesa el inicio de sesión */}
    </div>
  );
};

export default LinkedInSignIn;
