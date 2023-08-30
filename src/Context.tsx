import React, { createContext, useState } from "react";

interface ContextProps {
  errMsg: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const Context = createContext<ContextProps | null>(null);

export function ContextProvider() {
  const [errMsg, setErrMsg] = useState<string>("");
  const [theme, setTheme] = useState<string>("light");

  return (
    <Context.Provider
      value={{ errMsg, setErrMsg, theme, setTheme }}
    ></Context.Provider>
  );
}
