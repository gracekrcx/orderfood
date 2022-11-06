import { useEffect } from "react";
import "./scss/App.scss";
import Products from "./components/Products";
import Header from "./components/Header";
import { setLocalStorage } from "./utils/Utils";
import StoreContextProvider from "./context/store";

function App() {
  useEffect(() => {
    const currency = "$";
    setLocalStorage("currency", currency);
  }, []);

  return (
    <StoreContextProvider>
      <div className="app">
        <Header />
        <Products />
      </div>
    </StoreContextProvider>
  );
}

export default App;
