import { useContext } from 'react';
import { StudentContext } from '../StudentContext';

export default function FavouriteStudentsPage() {
  const { favourites, removeFromFavourites } = useContext(StudentContext);

  return (
    <div className="page-container">
      <h2>My Favourite Students ({favourites.length})</h2>
      {favourites.length === 0 ? (
        <div className="empty-state">
          <p className="empty-message">“No favourite students added yet”</p>
          <span className="empty-sub">Explore the directory and star your favorite peers!</span>
        </div>
      ) : (
        <div className="student-grid">
          {favourites.map(student => (
            <div key={student.id} className="student-card fav-card">
              <div className="card-avatar fav-avatar">{student.name.charAt(0)}</div>
              <h3>{student.name}</h3>
              <p className="roll">Roll: {student.rollNo}</p>
              <p className="dept">{student.department}</p>
              <button 
                onClick={() => removeFromFavourites(student.id)} 
                className="btn-remove"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}