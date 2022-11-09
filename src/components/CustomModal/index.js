import styled from "./index.module.scss";
import { createPortal } from "react-dom";

export const CustomModal = ({ onClose, children }) => {
  const ModalDom = (
    <>
      <div className={`${styled.overlay} bg-b`} onClick={onClose} />
      <div className={styled.popup}>{children}</div>
    </>
  );

  const target = document.body;
  return createPortal(ModalDom, target);
};

export default CustomModal;
