import { useState, useEffect, useRef } from "react";
import styled from "./index.module.scss";
import CreateAndEditOrder from "../CreateAndEditOrder";
import CustomButton from "../CustomButton";
import { useStore } from "../../context/Store";
import { currency } from "../../utils/Common";
import CloseIcon from "../CloseIcon";
import { getLocalStorage, setLocalStorage } from "../../utils/Utils";

const ShoppingCard = ({ onClose }) => {
  const { setIsHaveOrder, totalPrice } = useStore();
  const [isShowOrder, setIsShowOrder] = useState(true);
  const [success, setSuccess] = useState(false);
  const [editData, setEditData] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const timerRef = useRef(null);

  const [orderLists, setOrderLists] = useState([]);
  useEffect(() => {
    const data = getLocalStorage("orderLists") || [];
    setOrderLists(data);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      // 倒數結束，打 API 新增訂單
      console.log("---> 打 api 送訂單");
      onClose();
      clearTimeout(timerRef.current);
      setLocalStorage("orderLists", []);
      setIsHaveOrder(false);
    }

    if (!countdown) return;
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
  }, [countdown, onClose, setIsHaveOrder]);

  const edit = (orderId) => {
    const result = orderLists.find((item) => item.orderId === orderId);
    setEditData(result);
    setIsShowOrder(false);
  };

  const showOrder = (data) => {
    if (data) {
      setOrderLists(data);
    }
    setIsShowOrder(true);
  };

  const handleFinishOrder = () => {
    // user 送出訂單，送 api 前倒數
    setSuccess(true);
    setCountdown(5);
  };

  const handleUnsendFinishOrder = () => {
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
            className={`btn bg-black ${styled.unsendFinishOrder}`}
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
            {orderLists.map((item) => {
              return (
                <div
                  className={`${styled.orderDetail} mb-10`}
                  key={item.orderId}
                >
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
            送出訂單 總價 {`${currency}${totalPrice}`}
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
