"use client";
// App.js
import React, { useState, useEffect } from "react";

const Theme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Effect to set theme based on state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.style.setProperty("--background-color", "#333");
      document.documentElement.style.setProperty("--text-color", "#fff");
    } else {
      document.documentElement.style.setProperty("--background-color", "#fff");
      document.documentElement.style.setProperty("--text-color", "#000");
    }
  }, [isDarkMode]);

  return (
    <div
      className="app fixed top-0 right-0"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      <h1>Theme Toggle Example</h1>
      <button onClick={toggleTheme} className="   ">
        {isDarkMode ? "🌙" : "☀️"}
      </button>
    </div>
  );
};

export default Theme;
