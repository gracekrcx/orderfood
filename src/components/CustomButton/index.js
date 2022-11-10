const CustomButton = ({ children, handleClick, disabled = false }) => {
  return (
    <button disabled={disabled} className="btn bg-black" onClick={handleClick}>
      {children}
    </button>
  );
};

export default CustomButton;
