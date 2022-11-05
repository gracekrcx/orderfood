const CustomPopup = ({ onClose, children }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="popup"
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
