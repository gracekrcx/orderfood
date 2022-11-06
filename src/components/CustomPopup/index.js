import styled from "./index.module.scss";

const CustomPopup = ({ onClose, children }) => {
  return (
    <div className={styled.overlay} onClick={onClose}>
      <div
        className={styled.popup}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomPopup;
