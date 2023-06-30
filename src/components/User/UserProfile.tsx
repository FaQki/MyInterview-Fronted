import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as UserService from '../User/UserService';
import { User } from '../User/User';
import defaultProfilePicture from "../assets/perfil.png";

export const UserProfile = () => {
    
  const params:any = useParams<{ id: string }>();

  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: "",
    videos: []
  });
  const [loadingUser, setLoadingUser] = useState(true);
  const userId = params.id;

  const history = useNavigate();

  const loadUser = async () => {
    try {
      const res = await UserService.getOneUser(userId);
      if (res.data) {
        setUser(res.data);
        setLoadingUser(false);
      } else {
        console.error('Invalid response format');
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await UserService.updateUser(userId, user);
      console.log('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleVideosButtonClick = () => {
    history(`/videos/${userId}`);
  };

  if (loadingUser) {
    return (
      <div className="spinner-overlay">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="image-container">
            <img
              src={user?.profilePicture || defaultProfilePicture}
              className="card-img-top"
              alt="User"
              onLoad={() => {
                setLoadingUser(false);
              }}
            />
          </div>
        </div>
        <div className="col-md-8">
          <h2>Profile</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={user?.firstName || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={user?.lastName || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={user?.email || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
          <button type="button" className="btn btn-primary mt-3" onClick={handleVideosButtonClick}>
            <Link to={`/videos/${userId}`} className="text-white text-decoration-none">Agregar Videos</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
