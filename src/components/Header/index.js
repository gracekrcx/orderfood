import { useState } from "react";
import logo from "../../images/shopping-cart.svg";
import CustomPopup from "../CustomPopup";
import ShoppingCard from "../ShoppingCard";

const Header = () => {
  const [isPopUp, setIsPopUp] = useState(false);

  const togglePopUp = () => {
    setIsPopUp(!isPopUp);
  };

  return (
    <>
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
    </>
  );
};

export default Header;