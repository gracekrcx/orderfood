import { useState, useEffect, useRef } from "react";
import styled from "./index.module.scss";
import close from "../../images/close.svg";
import CreateAndEditOrder from "../CreateAndEditOrder";
import CustomButton from "../CustomButton";
import { useStore } from "../../context/store";
import { currency } from "../../utils/common";

const CloseIcon = ({ onClose }) => {
  return (
    <img className="w-30 cursor" src={close} alt="close" onClick={onClose} />
  );
};

const ShoppingCard = ({ onClose }) => {
  const { setIsHaveOrder, orderLists, totalPrice, handleUpdateOrderLists } =
    useStore();

  const [isShowOrder, setIsShowOrder] = useState(true);
  const [success, setSuccess] = useState(false);
  const [editData, setEditData] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    console.log("--> 倒數", countdown);

    if (countdown === 0) {
      // 倒數結束，打 API 新增訂單
      console.log("---> 打 api 送訂單");
      onClose();
      clearTimeout(timerRef.current);
      handleUpdateOrderLists([]);
      setIsHaveOrder(false);
    }

    if (!countdown) return;
    console.log("--> 開始 倒數 ---->");
    const id = setTimeout(
      () =>
        setCountdown((pre) => {
          return pre - 1;
        }),
      1000
    );
    timerRef.current = id;

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [countdown, onClose, setIsHaveOrder, handleUpdateOrderLists]);

  const edit = (orderId) => {
    const result = orderLists.find((item) => item.orderId === orderId);
    setEditData(result);
    setIsShowOrder(false);
  };

  const showOrder = () => {
    setIsShowOrder(true);
  };

  const handleFinishOrder = () => {
    // user 送出訂單，送 api 前倒數
    setSuccess(true);
    setCountdown(5);
  };

  const handleUnsendFinishOrder = () => {
    console.log("unsend");
    setSuccess(false);
    setCountdown(null);
    clearTimeout(timerRef.current);
  };

  if (success) {
    return (
      <div className={styled.message}>
        <CloseIcon onClose={onClose} />
        <div className={`${styled.successContent} f-w-c`}>
          <span className={`${styled.successText} w-100 ta-c`}>訂單已送出</span>
          <span className={`${styled.counter} w-100 ta-c mb-15`}>
            {`${countdown > 0 ? countdown : ""}...秒後關閉`}
          </span>
          <button
            className={styled.unsendFinishOrder}
            onClick={handleUnsendFinishOrder}
          >
            取消送出訂單
          </button>
        </div>
      </div>
    );
  }

  if (!orderLists || orderLists.length === 0) {
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
            {orderLists.map((item, index) => {
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
          <CustomButton handleClick={handleFinishOrder}>
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
