import React, { createContext, ReactNode, useEffect, useState } from "react";

export interface AllCountriesProps {
  capital: string[];
  flags: {
    png: string;
  };
  name: {
    common: string;
    nativeName: {
      [key: string]: { official: string };
    };
  };
  population: number;
  region: string;
  cca3: string;
}

interface ContextProps {
  errMsg: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  filteredCountries: AllCountriesProps[];
  setFilteredCountries: React.Dispatch<
    React.SetStateAction<AllCountriesProps[]>
  >;
  allCountries: AllCountriesProps[];
  setAllCountries: React.Dispatch<React.SetStateAction<AllCountriesProps[]>>;
}

export const Context = createContext<ContextProps | null>(null);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [errMsg, setErrMsg] = useState<string>("");
  const [theme, setTheme] = useState<string>("light");
  const [filteredCountries, setFilteredCountries] = useState<
    AllCountriesProps[]
  >([]);
  const [allCountries, setAllCountries] = useState<AllCountriesProps[]>([]);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Context.Provider
      value={{
        errMsg,
        setErrMsg,
        setTheme,
        filteredCountries,
        setFilteredCountries,
        allCountries,
        setAllCountries,
      }}
    >
      {children}
    </Context.Provider>
  );
}
