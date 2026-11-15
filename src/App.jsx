import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StudentProvider } from './StudentContext';
import Navbar from './components/Navbar';
import StudentListPage from './pages/StudentListPage';
import FavouriteStudentsPage from './pages/FavouriteStudentsPage';
import './App.css';

function App() {
  return (
    <StudentProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="content">
            <Routes>
              <Route path="/" element={<StudentListPage />} />
              <Route path="/favourites" element={<FavouriteStudentsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </StudentProvider>
  );
}

export default App;