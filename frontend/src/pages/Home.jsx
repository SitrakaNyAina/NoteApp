import { Link } from "react-router-dom";
import '../styles/home.css'


export default function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenue sur NotesApp 📝</h1>
      <p>Créez un compte, connectez-vous et commencez à prendre des notes.</p>
      <div className="home-buttons">
        <Link to="/register"><button>S'inscrire</button></Link>
        <Link to="/login"><button>Se connecter</button></Link>
      </div>
    </div>
  );
}