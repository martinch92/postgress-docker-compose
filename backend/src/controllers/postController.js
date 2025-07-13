const Post = require('../models/Post');

const postController = {
  async getAllPosts(req, res) {
    try {
      const posts = await Post.getAll();
      res.json({ success: true, data: posts });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener posts', error: error.message });
    }
  },

  async getPostById(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.getById(id);
      
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post no encontrado' });
      }

      res.json({ success: true, data: post });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener post', error: error.message });
    }
  },

  async createPost(req, res) {
    try {
      const { title, content, user_id } = req.body;
      
      if (!title || !content || !user_id) {
        return res.status(400).json({ success: false, message: 'Título, contenido y user_id son requeridos' });
      }

      const post = await Post.create(title, content, user_id);
      res.status(201).json({ success: true, data: post, message: 'Post creado exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear post', error: error.message });
    }
  },

  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      
      const post = await Post.update(id, title, content);
      
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post no encontrado' });
      }

      res.json({ success: true, data: post, message: 'Post actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar post', error: error.message });
    }
  },

  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.delete(id);
      
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post no encontrado' });
      }

      res.json({ success: true, message: 'Post eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar post', error: error.message });
    }
  }
};

module.exports = postController;