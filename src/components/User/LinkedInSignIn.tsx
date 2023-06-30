import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LinkedInSignIn: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLinkedInCallback = async () => {
      const params = new URLSearchParams(location.search);
      const authorizationCode = params.get('code');

      if (authorizationCode) {
        try {
          const response = await axios.post('http://localhost:3000/auth/linkedin/callback', { code: authorizationCode });

          const { firstName, lastName, email, profilePicture } = response.data;

          // Hacer algo con los datos del usuario (por ejemplo, guardarlos en el estado global de la aplicación)

          // Redirigir al usuario a la página principal u otra página relevante
          navigate('/');
        } catch (error) {
          // Manejar errores apropiadamente
        }
      } else {
        // Manejar el caso en el que no se haya proporcionado el código de autorización
      }
    };

    handleLinkedInCallback();
  }, [location.search, navigate]);

  return <div>Procesando inicio de sesión con LinkedIn...</div>;
};

export default LinkedInSignIn;
