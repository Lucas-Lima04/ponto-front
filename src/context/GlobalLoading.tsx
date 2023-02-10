import React, { createContext, ReactElement, ReactNode, useContext, useState } from "react";
import Loading from "../components/loading";

interface GlobalLoadingProps {
  isGlobalLoading: boolean;
  setIsGlobalLoading: (l: boolean) => void;
}

interface GlobalLoadingProviderProps {
  children: ReactNode | ReactElement;
}
export const GlobalLoadingContext = createContext<GlobalLoadingProps>({} as GlobalLoadingProps);

const GlobalLoadingProvider = ({children} : GlobalLoadingProviderProps) => {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  return (
    <GlobalLoadingContext.Provider value={{ isGlobalLoading, setIsGlobalLoading }}>
      {children}
      {isGlobalLoading ? <Loading /> : <></>}
    </GlobalLoadingContext.Provider>
  );
};

export default GlobalLoadingProvider;

export const useLoading = () => useContext(GlobalLoadingContext);
