import { useEffect } from "react";
import "./scss/App.scss";
import Products from "./components/Products";
import Header from "./components/Header";
import { setLocalStorage } from "./utils/Utils";

function App() {
  useEffect(() => {
    const preData = [
      {
        name: "雞排",
        price: 80,
        quantity: 1,
        notes: "加辣",
        customer: "Morrison",
      },
    ];

    setLocalStorage("order", preData);
  }, []);

  return (
    <div className="app">
      <Header />
      <Products />
    </div>
  );
}

export default App;
