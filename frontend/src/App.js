import React, { useState } from 'react';
import UserList from './components/UserList';
import PostList from './components/PostList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Full Stack App</h1>
        <p>React + Node.js + PostgreSQL + Docker</p>
        
        <nav className="nav-tabs">
          <button 
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            👥 Usuarios
          </button>
          <button 
            className={activeTab === 'posts' ? 'active' : ''}
            onClick={() => setActiveTab('posts')}
          >
            📝 Posts
          </button>
        </nav>
      </header>

      <main className="App-main">
        {activeTab === 'users' && <UserList />}
        {activeTab === 'posts' && <PostList />}
      </main>

      <footer className="App-footer">
        <p>Desarrollado con ❤️ por Martín usando Docker Compose</p>
      </footer>
    </div>
  );
}

export default App;