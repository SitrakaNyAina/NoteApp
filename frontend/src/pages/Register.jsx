import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css'


export default function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { name, password });
    alert('Inscription réussie');
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="container" action="/register" method="POST">
      <input type="text"placeholder="Nom" onChange={e => setName(e.target.value)} />
      <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
      <input type="submit" value="S'inscrire" />
      <button type="submit" >Inscription</button>
    </form>
  );
}type="submit