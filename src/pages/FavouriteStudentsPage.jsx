import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StudentContext } from '../StudentContext';

export default function FavouriteStudentsPage() {
  const { favourites, removeFromFavourites, clearFavourites } = useContext(StudentContext);

  const avgCgpa = favourites.length > 0
    ? (favourites.reduce((sum, s) => sum + parseFloat(s.cgpa), 0) / favourites.length).toFixed(2)
    : "0.00";

  return (
    <div className="page-container">
      <div className="hero-banner fav-banner">
        <div>
          <h1>Favourite Students</h1>
          <p>Your curated shortlist of peers for project teams and peer reviews.</p>
        </div>

        {favourites.length > 0 && (
          <div className="fav-actions-header">
            <div className="stats-pill">
              <span>Selected: <strong>{favourites.length}</strong></span>
              <span>Avg CGPA: <strong>{avgCgpa}</strong></span>
            </div>
            <button onClick={clearFavourites} className="btn-clear-all">
              Clear All
            </button>
          </div>
        )}
      </div>

      {favourites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📂</div>
          <p className="empty-message">No favourite students added yet</p>
          <span className="empty-sub">Head back to the Student Directory to shortlist students.</span>
          <Link to="/" className="btn-back-directory">
            ← Browse Student Directory
          </Link>
        </div>
      ) : (
        <div className="student-grid">
          {favourites.map(student => (
            <div key={student.id} className="student-card fav-card">
              <div className="card-top">
                <div className="card-avatar fav-avatar">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="roll-tag">{student.rollNo}</span>
              </div>

              <h3>{student.name}</h3>
              <p className="dept">{student.department}</p>
              <p className="email-text">{student.email}</p>

              <div className="metrics-row">
                <span className="metric-box">CGPA: <strong>{student.cgpa}</strong></span>
                <span className="metric-box">Attendance: <strong>{student.attendance}</strong></span>
              </div>

              <button
                onClick={() => removeFromFavourites(student.id)}
                className="btn-remove"
              >
                Remove from Favourites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}