const pool = require('../config/database');

class Post {
  static async getAll() {
    const result = await pool.query(`
      SELECT p.*, u.name as author_name 
      FROM posts p 
      JOIN users u ON p.user_id = u.id 
      ORDER BY p.created_at DESC
    `);
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(`
      SELECT p.*, u.name as author_name 
      FROM posts p 
      JOIN users u ON p.user_id = u.id 
      WHERE p.id = $1
    `, [id]);
    return result.rows[0];
  }

  static async create(title, content, userId) {
    const result = await pool.query(
      'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, userId]
    );
    return result.rows[0];
  }

  static async update(id, title, content) {
    const result = await pool.query(
      'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Post;