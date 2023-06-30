import React, { useState, useEffect } from 'react';
import * as UserService from '../User/UserService';
import { User } from '../User/User';

function List() {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadUsers = async () => {
    try {
      const res = await UserService.getUsers();
      if (Array.isArray(res.data)) {
        setUsers(res.data);
        setLoadingUsers(false);
      } else {
        console.error('Invalid response format');
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex flex-row justify-content-between p-3 text-bg-dark">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o apellido"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="btn btn-primary">Buscar</button>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {loadingUsers ? (
          <div className="spinner-overlay">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user._id} className="card m-2" style={{ width: '18rem' }}>
              <div className="image-container">
                <img
                  src="/perfil.png"
                  className="card-img-top"
                  alt="User"
                  onLoad={() => {
                    setLoadingUsers(false);
                  }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                <p className="card-text">{user.email}</p>
                <a href="#" className="btn btn-primary">
                  Ingresar a su perfil
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default List;
