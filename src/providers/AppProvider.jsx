import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
    const [message, setMessage] = useState({});
    const [active, setActive] = useState('');
  

  return (
    <AppContext.Provider
      value={{
        message,
        setMessage,
        active, 
        setActive
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}