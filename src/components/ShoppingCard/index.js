import { useState } from "react";
import styled from "./index.module.scss";
import closs from "../../images/close.svg";
import CreateAndEditOrder from "../CreateAndEditOrder";
import CustomButton from "../CustomButton";
import { getLocalStorage, setLocalStorage } from "../../utils/Utils";
import { useStore } from "../../context/store";

const CloseIcon = ({ onClose }) => {
  return (
    <img className="w-30 cursor" src={closs} alt="closs" onClick={onClose} />
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
    setLocalStorage("totalPrice", 0);
    setIsHaveOrder(false);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (success) {
    return (
      <div className={styled.message}>
        <CloseIcon onClose={onClose} />
        <div className={`${styled.successContent} f-w-c`}>
          <span className={styled.successText}>訂單已送出</span>
          <span className={styled.successText}>2 秒後關閉</span>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={styled.message}>
        <CloseIcon onClose={onClose} />
        <div className={`${styled.emptyContent} f-c`}>
          <span>目前無資料</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styled.message}>
      {isShowOrder ? (
        <div className={styled.orderContainer}>
          <CloseIcon onClose={onClose} />
          <div className={styled.content}>
            {data.map((item, index) => {
              return (
                <div className={`${styled.orderDetail} mb-10`} key={index}>
                  <button
                    className={styled.edit}
                    onClick={() => edit(item.orderId)}
                  >
                    編輯
                  </button>
                  <div className={styled.orderDescription}>
                    <div className="f-s w-100">
                      {item.customer && (
                        <span
                          className={`${styled.customer} single-ellipsis ph-5`}
                        >
                          {`${item.customer} /`}
                        </span>
                      )}
                      <span className={`${styled.name} single-ellipsis ph-5`}>
                        {item.name}
                      </span>
                    </div>
                    <div className="f-s w-100">
                      <span className="ph-5">{`${item.quantity}份`}</span>
                      <span className="ph-5">{`${currency}${
                        item.price * item.quantity
                      }`}</span>
                      <span className={`${styled.notes} single-ellipsis ph-5`}>
                        {item.notes}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <CustomButton handleClick={handleFinisheOrder}>
            送出定單 總價 {`${currency}${totalPrice}`}
          </CustomButton>
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
