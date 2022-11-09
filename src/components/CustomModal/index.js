import styled from "./index.module.scss";
import { createPortal } from "react-dom";

export const CustomModal = ({ onClose, children }) => {
  const ModalDom = (
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

  const target = document.body;
  return createPortal(ModalDom, target);
};

export default CustomModal;
