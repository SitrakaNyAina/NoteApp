import { useEffect, useState } from 'react';
import axios from 'axios';
import NoteForm from '../components/NoteForm';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:3001/notes', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Ajouter une note</h2>
      <NoteForm onNoteAdded={fetchNotes} />
      <h3>📚 Notes précédentes</h3>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <strong>{note.date}</strong> : {note.content}
          </li>
        ))}
      </ul>
    </div>
  );
}