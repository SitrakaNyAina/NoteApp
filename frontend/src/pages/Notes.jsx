import { useEffect, useState } from 'react';
import axios from 'axios';
import NoteForm from '../components/NoteForm';
import '../styles/note.css'

export default function Notes() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/notes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNotes(res.data);
  };
  function formatDate(dateString) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
    return new Date(dateString).toLocaleString('en-US', options);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Ajouter une note</h2>
      <NoteForm onNoteAdded={fetchNotes} />
      <h3>Notes précédentes</h3>
      <ul>
        {notes.map(note => (
          <div key={note.id} className="note">
          <p>{note.content}</p>
          <small>Taken on: {formatDate(note.takenAt)}</small>
          </div>
        ))}
      </ul>
    </div>
  );
}