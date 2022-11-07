import { useState } from "react";
import styled from "./index.module.scss";
import goBack from "../../images/goBack.svg";
import CustomButton from "../CustomButton";
import {
  getLocalStorage,
  setLocalStorage,
  calculateTotalPrice,
} from "../../utils/Utils";
import { useStore } from "../../context/store";

// showOrder : edit 時返回購物車
// Q : 如果 showOrder 沒有傳 default 傳 NULL 對嗎?

const QuantitySelect = ({ quantity, handleQuantity, isEdit }) => {
  const number = Array.from({ length: 20 }, (_, i) => i + 1);
  return (
    <select
      className={`${styled.select} t-20`}
      value={quantity}
      onChange={handleQuantity}
    >
      {isEdit && <option value="delete">移除</option>}
      {number.map((i) => (
        <option value={i} key={i}>
          {i}
        </option>
      ))}
    </select>
  );
};

const Customer = ({ customer, handleInputChange }) => {
  return (
    <div className="mv-10">
      <label htmlFor="customer" className="db">
        訂購人姓名
      </label>
      <input
        type="text"
        name="customer"
        autoComplete="off"
        value={customer}
        onChange={handleInputChange}
      />
    </div>
  );
};

const Notes = ({ notes, handleInputChange }) => {
  return (
    <div className="mv-10">
      <label htmlFor="notes" className="db">
        商品備註
      </label>
      <textarea
        name="notes"
        rows="3"
        className={styled.notesArea}
        defaultValue={notes}
        onChange={handleInputChange}
      />
    </div>
  );
};

const DeleteConfirm = ({ handleDeleteOrder, handleCancleDelete }) => {
  return (
    <div className={styled.deleteAlert}>
      <span className={styled.deleteText}>確定刪除</span>
      <div className={styled.deleteButtonGroup}>
        <button className={styled.deleteButton} onClick={handleDeleteOrder}>
          確定
        </button>
        <button className={styled.deleteButton} onClick={handleCancleDelete}>
          取消
        </button>
      </div>
    </div>
  );
};

const CreateAndEditOrder = ({
  selectedData = null,
  isEdit = false,
  showOrder = null,
  onClose = null,
}) => {
  const { setIsHaveOrder } = useStore();
  const currency = getLocalStorage("currency");
  const oldData = getLocalStorage("order") || [];
  // selectedData
  // 新增：name, price
  // 修改：name, price, quantity, customer, notes, orderId
  const { name, price, quantity = 1, customer = "", notes = "" } = selectedData;
  const [singleOrder, setSingleOrder] = useState({
    name: name,
    price: price,
    quantity: quantity,
    notes: notes,
    customer: customer,
  });
  const [isShowDeleteAlert, setIsShowDeleteAlert] = useState(false);

  const handleQuantity = (e) => {
    if (e.target.value === "delete") {
      setIsShowDeleteAlert(true);
    } else {
      setSingleOrder((preData) => {
        return { ...preData, quantity: parseInt(e.target.value, 10) };
      });
    }
  };

  const handleInputChange = (e) => {
    setSingleOrder((preData) => {
      return { ...preData, [e.target.name]: e.target.value };
    });
  };

  const updateOrderData = (data) => {
    data.length > 0 ? setIsHaveOrder(true) : setIsHaveOrder(false);
    setLocalStorage("order", data);
    calculateTotalPrice(data);
  };

  const handleAddOrder = () => {
    const orderId = Date.now();
    const newOrder = { ...singleOrder, orderId };
    const newData = [...oldData, newOrder];
    updateOrderData(newData);
    onClose();
  };

  const handleEditOrder = () => {
    const orderId = selectedData.orderId;
    // const index = oldData.findIndex((item) => {
    //   return item.orderId === orderId;
    // });
    const updateData = oldData.map((item) => {
      if (item.orderId === orderId) {
        return { ...singleOrder, orderId };
      }
      return item;
    });
    updateOrderData(updateData);
    showOrder();
  };

  const handleDeleteOrder = () => {
    const orderId = selectedData.orderId;
    const updateData = oldData.filter((item) => {
      return item.orderId !== orderId;
    });
    updateOrderData(updateData);
    showOrder();
  };

  const handleCancleDelete = () => {
    setIsShowDeleteAlert(false);
  };

  return (
    <div>
      {isEdit ? (
        <div className={styled.editContainer}>
          {isShowDeleteAlert && (
            <DeleteConfirm
              handleDeleteOrder={handleDeleteOrder}
              handleCancleDelete={handleCancleDelete}
            />
          )}
          <img
            className="w-30 cursor"
            src={goBack}
            alt="goBack"
            onClick={showOrder}
          />
          <div>
            <h1 className="single-ellipsis">{name}</h1>
            <QuantitySelect
              quantity={singleOrder.quantity}
              handleQuantity={handleQuantity}
              isEdit={isEdit}
            />
            <Customer
              customer={singleOrder.customer}
              handleInputChange={handleInputChange}
            />
            <Notes
              notes={singleOrder.notes}
              handleInputChange={handleInputChange}
            />
            <CustomButton handleClick={handleEditOrder}>修改</CustomButton>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="single-ellipsis">{name}</h1>
          <QuantitySelect
            quantity={singleOrder.quantity}
            handleQuantity={handleQuantity}
          />
          <Customer
            customer={singleOrder.customer}
            handleInputChange={handleInputChange}
          />
          <Notes
            notes={singleOrder.notes}
            handleInputChange={handleInputChange}
          />
          <CustomButton handleClick={handleAddOrder}>
            {`新增${singleOrder.quantity}項商品至訂單 • ${currency}${
              price * singleOrder.quantity
            }`}
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default CreateAndEditOrder;
