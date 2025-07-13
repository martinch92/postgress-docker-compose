const User = require('../models/User');

const userController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.getAll();
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: error.message });
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.getById(id);
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }

      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener usuario', error: error.message });
    }
  },

  async createUser(req, res) {
    try {
      const { name, email } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Nombre y email son requeridos' });
      }

      const user = await User.create(name, email);
      res.status(201).json({ success: true, data: user, message: 'Usuario creado exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear usuario', error: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      
      const user = await User.update(id, name, email);
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }

      res.json({ success: true, data: user, message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar usuario', error: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.delete(id);
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }

      res.json({ success: true, message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar usuario', error: error.message });
    }
  }
};

module.exports = userController;