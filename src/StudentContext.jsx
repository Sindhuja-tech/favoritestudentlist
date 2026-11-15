import { createContext, useState } from 'react';

export const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students] = useState([
    { id: 1, name: "Aarav Sharma", rollNo: "FSWD001", department: "Computer Science", cgpa: "9.2" },
    { id: 2, name: "Priya Patel", rollNo: "FSWD002", department: "Information Technology", cgpa: "8.9" },
    { id: 3, name: "Rahul Verma", rollNo: "FSWD003", department: "Electronics", cgpa: "8.5" },
    { id: 4, name: "Ananya Iyer", rollNo: "FSWD004", department: "Artificial Intelligence", cgpa: "9.5" },
    { id: 5, name: "Vikram Singh", rollNo: "FSWD005", department: "Electrical Engineering", cgpa: "8.8" },
  ]);

  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (student) => {
    if (!favourites.some(fav => fav.id === student.id)) {
      setFavourites([...favourites, student]);
    }
  };

  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter(student => student.id !== id));
  };

  return (
    <StudentContext.Provider value={{ students, favourites, addToFavourites, removeFromFavourites }}>
      {children}
    </StudentContext.Provider>
  );
}