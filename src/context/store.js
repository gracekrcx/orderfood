import { useContext, createContext, useState } from "react";

const StoreContext = createContext({});

// custom hook
export const useStore = () => {
  return useContext(StoreContext);
};

const StoreContextProvider = ({ children }) => {
  const [isHaveOrder, setIsHaveOrder] = useState(false);

  return (
    <StoreContext.Provider
      value={{
        isHaveOrder,
        setIsHaveOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const StoreContextConsumer = StoreContext.Consumer;
export default StoreContextProvider;
