import { useState } from "react";
import "./scss/App.scss";
import Product from "./components/Product";
import logo from "../src/images/shopping-cart.svg";
import { setLocalStorage } from "../src/utils/Utils";
import CustomPopup from "./components/CustomPopup";
import ShoppingCard from "./components/ShoppingCard";

function App() {
  const [isPopUp, setIsPopUp] = useState(false);

  const togglePopUp = () => {
    // setLocalStorage("exam", { a: 1, b: 2, c: 3 });
    setIsPopUp(!isPopUp);
  };

  return (
    <div className="app">
      {isPopUp && (
        <CustomPopup onClose={togglePopUp}>
          <ShoppingCard onClose={togglePopUp} />
        </CustomPopup>
      )}
      <header className="fb">
        <h1>Order Food</h1>
        <button className="btn" onClick={togglePopUp}>
          <img className="shoppingLogo" src={logo} alt="shopping" />
          <span className="ml10">購物車</span>
        </button>
      </header>
      <div className="container">
        <Product />
      </div>
    </div>
  );
}

export default App;
