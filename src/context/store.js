import { useContext, createContext, useState } from "react";

const StoreContext = createContext({});

// custom hook
export const useStore = () => {
  return useContext(StoreContext);
};

const calculateTotalPrice = (data) => {
  if (data.length === 0 || !data) return 0;
  const price = data.reduce((acc, cur) => {
    return cur.quantity * cur.price + acc;
  }, 0);
  return price;
};

const StoreContextProvider = ({ children }) => {
  const [isHaveOrder, setIsHaveOrder] = useState(false);
  const [orderLists, setOrderLists] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleUpdateOrderLists = (data) => {
    setOrderLists(data);
    const price = calculateTotalPrice(data);
    setTotalPrice(price);
  };

  return (
    <StoreContext.Provider
      value={{
        isHaveOrder,
        setIsHaveOrder,
        orderLists,
        totalPrice,
        handleUpdateOrderLists,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const StoreContextConsumer = StoreContext.Consumer;
export default StoreContextProvider;
