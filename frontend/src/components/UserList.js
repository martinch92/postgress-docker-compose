import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      setUsers(response.data.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await userService.create(newUser);
      setNewUser({ name: '', email: '' });
      fetchUsers();
    } catch (err) {
      setError('Error al crear usuario');
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await userService.update(editingUser.id, editingUser);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      setError('Error al actualizar usuario');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await userService.delete(id);
        fetchUsers();
      } catch (err) {
        setError('Error al eliminar usuario');
      }
    }
  };

  if (loading) return <div className="loading">Cargando usuarios...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-list">
      <h2>👥 Gestión de Usuarios</h2>
      
      {/* Formulario para crear usuario */}
      <form onSubmit={handleCreateUser} className="user-form">
        <h3>Crear Nuevo Usuario</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <button type="submit">Crear Usuario</button>
      </form>

      {/* Formulario para editar usuario */}
      {editingUser && (
        <form onSubmit={handleUpdateUser} className="user-form edit-form">
          <h3>Editar Usuario</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={editingUser.name}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            required
          />
          <button type="submit">Actualizar</button>
          <button type="button" onClick={() => setEditingUser(null)}>Cancelar</button>
        </form>
      )}

      {/* Lista de usuarios */}
      <div className="users-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h4>{user.name}</h4>
            <p>{user.email}</p>
            <p className="date">Creado: {new Date(user.created_at).toLocaleDateString()}</p>
            <div className="user-actions">
              <button onClick={() => setEditingUser(user)}>Editar</button>
              <button onClick={() => handleDeleteUser(user.id)} className="delete-btn">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;