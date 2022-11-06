import { useState } from "react";
import logo from "../../images/shopping-cart.svg";
import CustomPopup from "../CustomPopup";
import ShoppingCard from "../ShoppingCard";
import { useStore } from "../../context/store";

const HaveOrderIcon = () => {
  return <div className="haveOrderIcon br-c" />;
};

const Header = () => {
  const [isPopUp, setIsPopUp] = useState(false);
  const { isHaveOrder } = useStore();

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
      <header className="f-b">
        <h1>Order Food</h1>
        <button className="btn br-15" onClick={togglePopUp}>
          <img className="shoppingLogo" src={logo} alt="shopping" />
          {isHaveOrder && <HaveOrderIcon />}
          <span className="ml-10">購物車</span>
        </button>
      </header>
    </>
  );
};

export default Header;
