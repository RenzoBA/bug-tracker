"use client";

import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [categorySelected, setCategorySelected] = useState(null);

  return (
    <ThemeContext.Provider value={{ categorySelected, setCategorySelected }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
