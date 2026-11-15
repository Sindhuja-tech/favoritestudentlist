import { useContext } from 'react';
import { Link  } from 'react-router-dom';
import { StudentContext } from '../StudentContext';

export default function Navbar() {
  const { favourites } = useContext(StudentContext);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>🎓 StudentHub Portal</h2>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Directory</Link>
        <Link to="/favourites" className="nav-link fav-badge-link">
          Favourites 
          {favourites.length > 0 && <span className="badge">{favourites.length}</span>}
        </Link>
      </div>
    </nav>
  );
}