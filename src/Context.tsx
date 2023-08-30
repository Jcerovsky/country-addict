import React, { createContext, useState } from "react";

interface ContextProps {
  errMsg: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}

const Context = createContext<ContextProps | null>(null);

export function ContextProvider() {
  const [errMsg, setErrMsg] = useState<string>("");

  return <Context.Provider value={{ errMsg, setErrMsg }}></Context.Provider>;
}
