import { useState } from "react";
import styled from "./index.module.scss";
import goBack from "../../images/goBack.svg";
import CustomButton from "../CustomButton";
import { useStore } from "../../context/Store";
import { currency } from "../../utils/Common";
import CloseIcon from "../CloseIcon";
import { setLocalStorage, getLocalStorage } from "../../utils/Utils";

// showOrder : edit 時返回購物車

const QuantitySelect = ({ quantity, handleQuantity, isEdit }) => {
  const number = Array.from({ length: 20 }, (_, i) => i + 1);
  return (
    <select
      className={`${styled.select} t-16 cursor`}
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

const CustomerAndNotes = ({
  customer,
  notes,
  handleInputChange,
  isCustomerTouched,
}) => {
  return (
    <>
      <div className={styled.customerContainer}>
        <label htmlFor="customer" className="db">
          訂購人姓名(必填)
        </label>
        <input
          className={styled.customer}
          type="text"
          name="customer"
          autoComplete="off"
          value={customer}
          onChange={handleInputChange}
        />
        {isCustomerTouched && customer.length <= 0 && (
          <span className="t-red-100 t-12 db">此欄位必填</span>
        )}
      </div>
      <div className="mv-5">
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
    </>
  );
};
const DeleteConfirm = ({ handleDeleteOrder, handleCancelDelete }) => {
  return (
    <div className={styled.deleteAlert}>
      <span className={`${styled.deleteText} bg-white t-red-100`}>
        確定刪除?
      </span>
      <div className={styled.deleteButtonGroup}>
        <button
          className={`btn bg-gray t-black-100 ${styled.confirmButton}`}
          onClick={handleDeleteOrder}
        >
          確定
        </button>
        <button
          className={`btn bg-black ${styled.cancelButton}`}
          onClick={handleCancelDelete}
        >
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
  const { handleUpdateOrderLists } = useStore();
  // selectedData
  // 新增：name, price
  // 修改：name, price, quantity, customer, notes, orderId
  const { name, price, quantity = 1, customer = "", notes = "" } = selectedData;
  const [singleOrder, setSingleOrder] = useState({
    name,
    price,
    quantity,
    notes,
    customer,
  });
  const [isShowDeleteAlert, setIsShowDeleteAlert] = useState(false);
  const [isCustomerTouched, setIsCustomerTouched] = useState(false);

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
    if (e.target.name === "customer") {
      setIsCustomerTouched(true);
    }
    setSingleOrder((preData) => {
      return { ...preData, [e.target.name]: e.target.value };
    });
  };

  const getOrderLists = () => {
    return getLocalStorage("orderLists") || [];
  };

  const updateOrderData = (data) => {
    /*
    1. 更新 localStorage 
    2. 更新 isHaveOrder
    3. 更新 total price
    */
    handleUpdateOrderLists(data);
    setLocalStorage("orderLists", data);
  };

  const handleAddOrder = () => {
    const orderId = Date.now();
    const orderLists = getOrderLists();
    const newOrder = { ...singleOrder, orderId };
    const newData = [...orderLists, newOrder];
    updateOrderData(newData);
    onClose();
  };

  const handleEditOrder = () => {
    const orderId = selectedData.orderId;
    // const index = orderLists.findIndex((item) => {
    //   return item.orderId === orderId;
    // });
    const orderLists = getOrderLists();
    const updateData = orderLists.map((item) => {
      if (item.orderId === orderId) {
        return { ...singleOrder, orderId };
      }
      return item;
    });
    updateOrderData(updateData);
    showOrder(updateData);
  };

  const handleDeleteOrder = () => {
    const orderId = selectedData.orderId;
    const orderLists = getOrderLists();
    const updateData = orderLists.filter((item) => {
      return item.orderId !== orderId;
    });
    updateOrderData(updateData);
    showOrder(updateData);
  };

  const handleCancelDelete = () => {
    setIsShowDeleteAlert(false);
  };

  return (
    <div>
      {isEdit ? (
        <div className={styled.editContainer}>
          {isShowDeleteAlert && (
            <DeleteConfirm
              handleDeleteOrder={handleDeleteOrder}
              handleCancelDelete={handleCancelDelete}
            />
          )}
          <img
            className="w-30 cursor"
            src={goBack}
            alt="goBack"
            onClick={() => showOrder(null)}
          />
          <div>
            <h1 className="single-ellipsis">{name}</h1>
            <QuantitySelect
              quantity={singleOrder.quantity}
              handleQuantity={handleQuantity}
              isEdit={isEdit}
            />
            <CustomerAndNotes
              customer={singleOrder.customer}
              notes={singleOrder.notes}
              handleInputChange={handleInputChange}
              isCustomerTouched={isCustomerTouched}
            />
            <CustomButton
              handleClick={handleEditOrder}
              disabled={singleOrder.customer.length <= 0}
            >
              修改
            </CustomButton>
          </div>
        </div>
      ) : (
        <div>
          <CloseIcon onClose={onClose} />
          <h1 className="single-ellipsis">{name}</h1>
          <QuantitySelect
            quantity={singleOrder.quantity}
            handleQuantity={handleQuantity}
          />
          <CustomerAndNotes
            customer={singleOrder.customer}
            notes={singleOrder.notes}
            handleInputChange={handleInputChange}
            isCustomerTouched={isCustomerTouched}
          />
          <CustomButton
            handleClick={handleAddOrder}
            disabled={singleOrder.customer.length <= 0}
          >
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
