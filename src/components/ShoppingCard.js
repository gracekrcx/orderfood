import { useState } from "react";
import closs from "../images/close.svg";
import goBack from "../images/goBack.svg";

const ShoppingCard = ({ onClose }) => {
  const [isShowOrder, setIsShowOrder] = useState(true);

  const edit = () => {
    setIsShowOrder(false);
  };

  const showOrder = () => {
    setIsShowOrder(true);
  };

  return (
    <div>
      {isShowOrder ? (
        <div>
          <img className="w30" src={closs} alt="closs" onClick={onClose} />
          <div>
            <span onClick={edit}>see detail</span>
          </div>
        </div>
      ) : (
        <div>
          <img
            className="w30 ml8"
            src={goBack}
            alt="goBack"
            onClick={showOrder}
          />
        </div>
      )}
    </div>
  );
};

export default ShoppingCard;
