import React, { createContext, ReactNode, useEffect, useState } from "react";

export interface AllCountriesProps {
  capital: string | string[];
  flags: {
    png: string;
  };
  name: {
    common: string;
  };
  population: number;
  region: string;
}

interface ContextProps {
  errMsg: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const Context = createContext<ContextProps | null>(null);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [errMsg, setErrMsg] = useState<string>("");
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Context.Provider value={{ errMsg, setErrMsg, setTheme }}>
      {children}
    </Context.Provider>
  );
}
