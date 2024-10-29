// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { Navigate, useLocation } from "react-router-dom";


// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);

//   return (
//     <UserContext.Provider value={{ userData, setUserData }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);

import React, { createContext, useState, useContext, useEffect } from 'react';

// Créer un contexte utilisateur
const UserContext = createContext();

// Provider qui englobe l'application
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // Initialiser à partir de localStorage si disponible
    const storedUser = localStorage.getItem('userData');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Utiliser useEffect pour surveiller les changements de userData
  useEffect(() => {
    if (userData) {
      // Enregistrer les données utilisateur dans localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      // Si pas d'utilisateur, effacer le stockage
      localStorage.removeItem('userData');
    }
  }, [userData]);

  // Fonction pour se déconnecter
  const logout = () => {
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte utilisateur
export const useUser = () => useContext(UserContext);

