const CustomButton = ({ children, handleClick }) => {
  return (
    <button className={`btn bg-black`} onClick={handleClick}>
      {children}
    </button>
  );
};

export default CustomButton;
