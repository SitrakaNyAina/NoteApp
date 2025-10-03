import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css'

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { name, password });
    localStorage.setItem('token', res.data.token);
    navigate('/notes');
  };

  return (
    <form onSubmit={handleSubmit} className="container" action="/login" method="POST">
      <h2>Connexion</h2>
      <label for="username">Nom d'utilisateur</label>
      <input type='text' placeholder="Nom" onChange={e => setName(e.target.value)} required/>
      <label for="password">Mot de passe</label>
      <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} required/>
      <input type="submit" value="Se connecter"></input>
    </form>
  );
}