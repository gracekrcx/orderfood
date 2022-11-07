import { useState } from "react";
import styled from "./index.module.scss";
import logo from "../../images/shopping-cart.svg";
import CustomPopup from "../CustomPopup";
import ShoppingCard from "../ShoppingCard";
import { useStore } from "../../context/store";

const HaveOrderIcon = () => {
  return <div className={`${styled.haveOrderIcon} br-c`} />;
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
        <button className={`${styled.btn} br-15 f-c`} onClick={togglePopUp}>
          <img className={styled.shoppingLogo} src={logo} alt="shopping" />
          {isHaveOrder && <HaveOrderIcon />}
          <span className="ml-10">購物車</span>
        </button>
      </header>
    </>
  );
};

export default Header;
