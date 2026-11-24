import { createContext, useState } from 'react';

export const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students] = useState([
    {
      id: 1,
      name: "Sindhuja Kumaravel",
      rollNo: "FSWD2601",
      department: "Electrical & Full Stack",
      cgpa: "9.6",
      attendance: "98%",
      skills: ["React", "Tailwind", "Project Management"],
      email: "sindhuja.k@fswdportal.edu"
    },
    {
      id: 2,
      name: "Karthik Subramanian",
      rollNo: "FSWD2602",
      department: "Computer Science",
      cgpa: "9.1",
      attendance: "94%",
      skills: ["JavaScript", "Node.js", "SQL"],
      email: "karthik.s@fswdportal.edu"
    },
    {
      id: 3,
      name: "Meenakshi Sundaram",
      rollNo: "FSWD2603",
      department: "Information Technology",
      cgpa: "9.4",
      attendance: "96%",
      skills: ["UI/UX", "React", "CSS Grid"],
      email: "meenakshi.s@fswdportal.edu"
    },
    {
      id: 4,
      name: "Aravindhan Rajasekaran",
      rollNo: "FSWD2604",
      department: "Artificial Intelligence",
      cgpa: "8.9",
      attendance: "91%",
      skills: ["Python", "React", "APIs"],
      email: "aravindhan.r@fswdportal.edu"
    },
    {
      id: 5,
      name: "Divya Bharathi",
      rollNo: "FSWD2605",
      department: "Computer Science",
      cgpa: "9.3",
      attendance: "95%",
      skills: ["TypeScript", "Vite", "Git"],
      email: "divya.b@fswdportal.edu"
    },
    {
      id: 6,
      name: "Prashanth Narayanan",
      rollNo: "FSWD2606",
      department: "Information Technology",
      cgpa: "8.7",
      attendance: "89%",
      skills: ["HTML5", "JavaScript", "REST"],
      email: "prashanth.n@fswdportal.edu"
    }
  ]);

  const [favourites, setFavourites] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const addToFavourites = (student) => {
    if (!favourites.some(fav => fav.id === student.id)) {
      setFavourites([...favourites, student]);
      showToast(`⭐ Added ${student.name} to Favourites!`);
    }
  };

  const removeFromFavourites = (id) => {
    const target = favourites.find(s => s.id === id);
    setFavourites(favourites.filter(student => student.id !== id));
    if (target) showToast(`Removed ${target.name} from Favourites.`);
  };

  const clearFavourites = () => {
    setFavourites([]);
    showToast("Cleared all favourite students.");
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        favourites,
        addToFavourites,
        removeFromFavourites,
        clearFavourites,
        toastMessage
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}