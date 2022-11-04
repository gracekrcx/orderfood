import { useState, useEffect } from "react";
import goBack from "../images/goBack.svg";
import { getLocalStorage, setLocalStorage } from "../utils/Utils";

// showOrder : edit 時返回購物車
// Q : 如果 showOrder 沒有傳 default 傳 NULL 對嗎?

const CreateAndEditOrder = ({
  selectedData = null,
  isEdit = false,
  showOrder = null,
  onClose = null,
}) => {
  const currency = "$";

  const { name, price } = selectedData;
  const [singleOrder, setSingleOrder] = useState({
    name: name,
    price: price,
    quantity: 1,
    notes: "",
    customer: "",
  });

  useEffect(() => {
    const preData = [
      {
        name: "雞排",
        price: 80,
        quantity: 1,
        notes: "加辣",
        customer: "Morrison",
      },
    ];

    setLocalStorage("order", preData);
  }, []);

  const handleAddOrder = () => {
    const oldData = getLocalStorage("order");
    const newData = [...oldData, singleOrder];
    setLocalStorage("order", newData);
    onClose();
  };

  const handleQuantity = (e) => {
    setSingleOrder((preData) => {
      return { ...preData, quantity: parseInt(e.target.value, 10) };
    });
  };

  const handleInputChange = (e) => {
    setSingleOrder((preData) => {
      return { ...preData, [e.target.name]: e.target.value };
    });
  };

  return (
    <div>
      {isEdit ? (
        <>
          <img
            className="w30 ml8"
            src={goBack}
            alt="goBack"
            onClick={showOrder}
          />
          <span>修改修改修改修改修改</span>
        </>
      ) : (
        <div>
          <h1 className="single-ellipsis">{name}</h1>
          <select className="select t20" onChange={handleQuantity}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="55">55</option>
          </select>
          <div className="mv10">
            <label htmlFor="customer" className="db">
              訂購人姓名
            </label>
            <input
              type="text"
              name="customer"
              autoComplete="off"
              onChange={handleInputChange}
            />
          </div>
          <div className="mv10">
            <label htmlFor="notes" className="db">
              商品備註
            </label>
            <textarea
              name="notes"
              rows="3"
              className="wp90"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button className="btn" onClick={handleAddOrder}>
              {`新增${singleOrder.quantity}項商品至訂單 • ${currency}${
                price * singleOrder.quantity
              }`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAndEditOrder;
