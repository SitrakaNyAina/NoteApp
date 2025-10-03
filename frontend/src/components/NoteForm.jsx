import axios from 'axios';
import { useState } from 'react';
import '../styles/noteForm.css'

export default function NoteForm({ onNoteAdded }) {
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:3001/notes', { date, content }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setDate('');
    setContent('');
    if (onNoteAdded) onNoteAdded(); // 🔁 Rafraîchir les notes
  };

  return (
    <form onSubmit={handleSubmit} className='note-form'>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <textarea placeholder="valeur" value={content} onChange={e => setContent(e.target.value)} />
      <button type="submit">Ajouter</button>
    </form>
  );
}