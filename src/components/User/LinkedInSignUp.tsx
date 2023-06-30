import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const LinkedInSignUp: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLinkedInRedirect = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      
      try {
        const api = 'http://localhost:3000/';

        const response = await axios.post(`${api}auth/linkedin`, { code });

        const { token } = response.data;
        // Guardar el token en el almacenamiento local o en el estado de la aplicación, según tus necesidades
        // ...
        console.log(token);
        toast.success('Registro exitoso');
        navigate('/');
      } catch (error) {
        console.error("Llega hasta aca la poronga"+error);
        toast.error('Error en el registro');
        navigate('/');
      }
    };

    handleLinkedInRedirect();
  }, [navigate]);

  return <div>Registrando con LinkedIn...</div>;
};

export default LinkedInSignUp;
