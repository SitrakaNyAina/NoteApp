import axios from 'axios';
import { useState } from 'react';
import '../styles/noteForm.css'

export default function NoteForm({ onNoteCreated }) {
  const [content, setContent] = useState('');
  const [takenAt, setTakenAt] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/notes`, {
        content,
        takenAt
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContent('');
      setTakenAt('');
      onNoteCreated?.(); // pour rafraîchir la liste si besoin
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create note');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h3>Create a new note</h3>
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <label>Date taken:</label>
      <input
        type="datetime-local"
        value={takenAt}
        onChange={e => setTakenAt(e.target.value)}
        required
      />
      <button type="submit">Save Note</button>
    </form>
  );
}