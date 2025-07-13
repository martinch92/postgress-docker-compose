import React, { useState, useEffect } from 'react';
import { postService, userService } from '../services/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '', user_id: '' });
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postService.getAll();
      setPosts(response.data.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await userService.getAll();
      setUsers(response.data.data);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await postService.create(newPost);
      setNewPost({ title: '', content: '', user_id: '' });
      fetchPosts();
    } catch (err) {
      setError('Error al crear post');
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      await postService.update(editingPost.id, {
        title: editingPost.title,
        content: editingPost.content
      });
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      setError('Error al actualizar post');
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este post?')) {
      try {
        await postService.delete(id);
        fetchPosts();
      } catch (err) {
        setError('Error al eliminar post');
      }
    }
  };

  if (loading) return <div className="loading">Cargando posts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="post-list">
      <h2>📝 Gestión de Posts</h2>
      
      {/* Formulario para crear post */}
      <form onSubmit={handleCreatePost} className="post-form">
        <h3>Crear Nuevo Post</h3>
        <input
          type="text"
          placeholder="Título"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Contenido"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          required
          rows="4"
        />
        <select
          value={newPost.user_id}
          onChange={(e) => setNewPost({ ...newPost, user_id: e.target.value })}
          required
        >
          <option value="">Seleccionar autor</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit">Crear Post</button>
      </form>

      {/* Formulario para editar post */}
      {editingPost && (
        <form onSubmit={handleUpdatePost} className="post-form edit-form">
          <h3>Editar Post</h3>
          <input
            type="text"
            placeholder="Título"
            value={editingPost.title}
            onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Contenido"
            value={editingPost.content}
            onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
            required
            rows="4"
          />
          <button type="submit">Actualizar</button>
          <button type="button" onClick={() => setEditingPost(null)}>Cancelar</button>
        </form>
      )}

      {/* Lista de posts */}
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h4>{post.title}</h4>
            <p className="content">{post.content}</p>
            <p className="author">Por: {post.author_name}</p>
            <p className="date">Creado: {new Date(post.created_at).toLocaleDateString()}</p>
            <div className="post-actions">
              <button onClick={() => setEditingPost(post)}>Editar</button>
              <button onClick={() => handleDeletePost(post.id)} className="delete-btn">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;