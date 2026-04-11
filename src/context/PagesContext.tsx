import { createContext, useContext, useState } from "react";

const PagesContext = createContext(null);

const PagesProvider = ({ children }) => {
  const [movieTable, setMovieTable] = useState<string>("table");

  return (
    <PagesContext.Provider value={{ movieTable, setMovieTable }}>
      {children}
    </PagesContext.Provider>
  );
};
export const connectionPagesContex = () => {
  const ctx = useContext(PagesContext);
  if (!ctx) throw Error("Context must be inside provider");
  return ctx;
};
export default PagesProvider;
