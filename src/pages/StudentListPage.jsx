import { useContext, useState } from 'react';
import { StudentContext } from '../StudentContext';

export default function StudentListPage() {
  const { students, favourites, addToFavourites } = useContext(StudentContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = ['All', ...new Set(students.map(s => s.department))];

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDept = selectedDept === 'All' || student.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="page-container">
      <div className="hero-banner">
        <div>
          <h1>Student Directory</h1>
          <p>Browse peers, filter by department or tech stack, and bookmark top collaborators.</p>
        </div>
        <div className="stats-pill">
          <span>Total Students: <strong>{students.length}</strong></span>
          <span>Shortlisted: <strong>{favourites.length}</strong></span>
        </div>
      </div>

      <div className="controls-bar">
        <input
          type="text"
          placeholder="🔍 Search by name, roll no, or skill (e.g. React, SQL)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="dept-filters">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`filter-pill ${selectedDept === dept ? 'active-pill' : ''}`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="empty-state">
          <p className="empty-message">No students match your current search or filter.</p>
          <button
            className="btn-reset"
            onClick={() => { setSearchTerm(''); setSelectedDept('All'); }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="student-grid">
          {filteredStudents.map(student => {
            const isFav = favourites.some(fav => fav.id === student.id);
            return (
              <div key={student.id} className={`student-card ${isFav ? 'card-highlighted' : ''}`}>
                <div className="card-top">
                  <div className="card-avatar">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="roll-tag">{student.rollNo}</span>
                </div>

                <h3>{student.name}</h3>
                <p className="dept">{student.department}</p>

                <div className="metrics-row">
                  <span className="metric-box">CGPA: <strong>{student.cgpa}</strong></span>
                  <span className="metric-box">Attendance: <strong>{student.attendance}</strong></span>
                </div>

                <div className="skills-list">
                  {student.skills.map((skill, index) => (
                    <span key={index} className="skill-chip">{skill}</span>
                  ))}
                </div>

                <button
                  onClick={() => addToFavourites(student)}
                  className={`btn-fav ${isFav ? 'added' : ''}`}
                  disabled={isFav}
                >
                  {isFav ? '✓ Added to Favourites' : '+ Add to Favourite'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}