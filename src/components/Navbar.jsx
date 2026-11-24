import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StudentContext } from '../StudentContext';

export default function Navbar() {
  const { favourites, toastMessage } = useContext(StudentContext);
  const location = useLocation();

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">
          <span className="brand-icon">🎓</span>
          <div>
            <h2>CohortSync Portal</h2>
            <span className="brand-sub">FSWD Batch 2026</span>
          </div>
        </div>
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active-link' : ''}`}
          >
            Student Directory
          </Link>
          <Link
            to="/favourites"
            className={`nav-link fav-badge-link ${location.pathname === '/favourites' ? 'active-link' : ''}`}
          >
            Favourite Students
            <span className={`badge ${favourites.length > 0 ? 'badge-active' : ''}`}>
              {favourites.length}
            </span>
          </Link>
        </div>
      </nav>

      {toastMessage && <div className="toast-banner">{toastMessage}</div>}
    </>
  );
}