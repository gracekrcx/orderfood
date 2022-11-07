import styled from "./index.module.scss";

const CustomButton = ({ children, handleClick }) => {
  return (
    <button
      className={`${styled.addProduct} f-c cursor t-16 bg-b t-w-100`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
