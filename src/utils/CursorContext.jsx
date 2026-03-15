"use client";

import React, { createContext, useContext, useState } from "react";

const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState("default");

  // Keep your handy shortcuts in case you are using them elsewhere!
  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  const buttonEnter = () => setCursorVariant("button");
  const buttonLeave = () => setCursorVariant("default");

  return (
    <CursorContext.Provider
      value={{
        cursorVariant,
        setCursorVariant, // 👇 ADDED THIS: Now components can trigger ANY custom state!
        textEnter,
        textLeave,
        buttonEnter,
        buttonLeave,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
