import { useState, useEffect } from "react";
import styled from "./index.module.scss";
import logo from "../../images/shopping-cart.svg";
import CustomModal from "../CustomModal";
import ShoppingCard from "../ShoppingCard";
import { useStore } from "../../context/Store";
import { getLocalStorage } from "../../utils/Utils";
import { Helmet } from 'react-helmet';

const HaveOrderIcon = () => {
  return <div className={`${styled.haveOrderIcon} br-c bg-red`} />;
};

const Header = () => {
  const [isPopUp, setIsPopUp] = useState(false);
  const { isHaveOrder, setIsHaveOrder } = useStore();

  useEffect(() => {
    const data = getLocalStorage("orderLists") || [];
    data.length > 0 && setIsHaveOrder(true);
  }, [setIsHaveOrder]);

  const togglePopUp = () => {
    setIsPopUp(!isPopUp);
  };

  return (
    <>
      {isPopUp && (
        <CustomModal onClose={togglePopUp}>
          <ShoppingCard onClose={togglePopUp} />
        </CustomModal>
      )}
      <header className="f-b">
        <Helmet>
          <title>這是加上的 meta helmet</title>
          <meta
            property='og:image'
            content='https://media.etmall.com.tw/web/Image/Common/600x315-E.jpg'
          />
          <meta name='description' content='用 helmet 產出' />
        </Helmet>
        <h1>Order Food</h1>
        <button
          className={`${styled.btn} br-15 f-c cursor bg-black t-white-100`}
          onClick={togglePopUp}
        >
          <img className={styled.shoppingLogo} src={logo} alt="shopping" />
          {isHaveOrder && <HaveOrderIcon />}
          <span className="ml-10">購物車</span>
        </button>
      </header>
    </>
  );
};

export default Header;
