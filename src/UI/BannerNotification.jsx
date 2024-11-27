import { createContext } from "react";

export const BannerContext = createContext();

function Banner({ children }) {
  return <BannerContext.Provider value={{}}>{children}</BannerContext.Provider>;
}
