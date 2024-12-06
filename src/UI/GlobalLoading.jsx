import { createContext, useState } from "react";

const LoadingContext = createContext();

function GlobalLoading({ children }) {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const startGlobalLoading = () => setIsGlobalLoading(true);
  const stopGlobalLoading = () => setIsGlobalLoading(false);

  return (
    <LoadingContext.Provider
      value={{ isGlobalLoading, startGlobalLoading, stopGlobalLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export default GlobalLoading;
