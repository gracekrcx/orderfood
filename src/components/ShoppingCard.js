import { useState } from "react";
import closs from "../images/close.svg";
import CreateAndEditOrder from "./CreateAndEditOrder";
import { getLocalStorage } from "../utils/Utils";

const ShoppingCard = ({ onClose }) => {
  const [isShowOrder, setIsShowOrder] = useState(true);

  const edit = () => {
    setIsShowOrder(false);
  };

  const showOrder = () => {
    setIsShowOrder(true);
  };

  const data = getLocalStorage("order");

  return (
    <div>
      {isShowOrder ? (
        <div>
          <img className="w30" src={closs} alt="closs" onClick={onClose} />
          {/* <span onClick={edit}>see detail</span> */}
          <div className="content">
            {data.map((item, index) => {
              return (
                <div className="detail" key={index}>
                  <span className="item single-ellipsis">{item.name}</span>
                  <span className="item">{item.quantity}</span>
                  <span className="item">{item.price}</span>
                  <span className="item">{item.customer}</span>
                  <span className="item single-ellipsis">{item.notes}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <CreateAndEditOrder showOrder={showOrder} isEdit onClose />
        </div>
      )}
    </div>
  );
};

export default ShoppingCard;
