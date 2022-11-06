import { useState } from "react";
import closs from "../../images/close.svg";
import CreateAndEditOrder from "../CreateAndEditOrder";
import { getLocalStorage, setLocalStorage } from "../../utils/Utils";
import { useStore } from "../../context/store";

const CloseIcon = ({ onClose }) => {
  return (
    <img className="w30 cursor" src={closs} alt="closs" onClick={onClose} />
  );
};

const ShoppingCard = ({ onClose }) => {
  const { setIsHaveOrder } = useStore();
  const currency = getLocalStorage("currency");
  const totalPrice = getLocalStorage("totalPrice");
  const data = getLocalStorage("order");
  const [isShowOrder, setIsShowOrder] = useState(true);
  const [success, setSuccess] = useState(false);
  const [editData, setEditData] = useState(null);

  const edit = (orderId) => {
    const result = data.find((item) => item.orderId === orderId);
    setEditData(result);
    setIsShowOrder(false);
  };

  const showOrder = () => {
    setIsShowOrder(true);
  };

  const handleFinisheOrder = () => {
    setSuccess(true);
    setLocalStorage("order", []);
    setIsHaveOrder(false);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (success) {
    return (
      <div>
        <CloseIcon onClose={onClose} />
        <div className="successContent">
          <span className="successText">訂單已送出</span>
          <span className="successText">2 秒後關閉</span>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div>
        <CloseIcon onClose={onClose} />
        <div className="empty fc">
          <span>目前無資料</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {isShowOrder ? (
        <div>
          <CloseIcon onClose={onClose} />
          <div className="content">
            {data.map((item, index) => {
              return (
                <div className="orderDetail" key={index}>
                  <button className="edit" onClick={() => edit(item.orderId)}>
                    編輯
                  </button>
                  <div className="orderDescription">
                    <div className="fs w100">
                      {item.customer && (
                        <span className="customer single-ellipsis p5">
                          {`${item.customer} /`}
                        </span>
                      )}
                      <span className="name single-ellipsis p5">
                        {item.name}
                      </span>
                    </div>
                    <div className="fs w100">
                      <span className="p5">{`${item.quantity}份`}</span>
                      <span className="p5">{`${currency}${
                        item.price * item.quantity
                      }`}</span>
                      <span className="notes single-ellipsis p5">
                        {item.notes}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="addProduct" onClick={handleFinisheOrder}>
            送出定單 總價 {`${currency}${totalPrice}`}
          </button>
        </div>
      ) : (
        <div>
          <CreateAndEditOrder
            showOrder={showOrder}
            isEdit
            onClose
            selectedData={editData}
          />
        </div>
      )}
    </div>
  );
};

export default ShoppingCard;
