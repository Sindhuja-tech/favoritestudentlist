import { useContext, useState } from 'react';
import { StudentContext } from '../StudentContext';

export default function StudentListPage() {
  const { students, favourites, addToFavourites } = useContext(StudentContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="header-section">
        <h2>Student Directory</h2>
        <input 
          type="text" 
          placeholder="🔍 Search by name or roll number..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredStudents.length === 0 ? (
        <p className="empty-message">No students found matching your search.</p>
      ) : (
        <div className="student-grid">
          {filteredStudents.map(student => {
            const isFav = favourites.some(fav => fav.id === student.id);
            return (
              <div key={student.id} className="student-card">
                <div className="card-avatar">{student.name.charAt(0)}</div>
                <h3>{student.name}</h3>
                <p className="roll">Roll: {student.rollNo}</p>
                <p className="dept">{student.department}</p>
                <span className="cgpa-badge">CGPA: {student.cgpa}</span>
                <button 
                  onClick={() => addToFavourites(student)} 
                  className={`btn-fav ${isFav ? 'added' : ''}`}
                  disabled={isFav}
                >
                  {isFav ? '⭐ Added to Favourites' : '☆ Add to Favourite'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}