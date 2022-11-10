import close from "../../images/close.svg";

const CloseIcon = ({ onClose }) => {
  return (
    <img className="w-30 cursor" src={close} alt="close" onClick={onClose} />
  );
};

export default CloseIcon;
