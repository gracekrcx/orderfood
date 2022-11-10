import { useState } from "react";
import styled from "./index.module.scss";
import imagePlaceholder from "../../images/empty.jpg";
import CustomModal from "../CustomModal";
import CreateAndEditOrder from "../CreateAndEditOrder";
import { currency, productList } from "../../utils/Common";

const IMAGEURL = window.location.origin;
function Product() {
  const [isPopUp, setIsPopUp] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const togglePopUp = () => {
    setIsPopUp(!isPopUp);
  };

  const handleProductClick = (id) => {
    const data = productList.find((item) => item.id === id);
    setSelectedData(data);
    setIsPopUp(!isPopUp);
  };

  return (
    <>
      {isPopUp && (
        <CustomModal onClose={togglePopUp}>
          <CreateAndEditOrder
            onClose={togglePopUp}
            selectedData={selectedData}
          />
        </CustomModal>
      )}
      <div className="container">
        {productList.map((item) => {
          const { id, name, price, imageWebp, imageJpg } = item;
          return (
            <div
              className={`${styled.card} mb-15 bg-white`}
              key={id}
              onClick={() => handleProductClick(id)}
            >
              <div className={styled.imgBox}>
                <picture>
                  <source
                    className={styled.img}
                    srcSet={IMAGEURL + "/" + imageWebp}
                    type="image/webp"
                  />
                  <img
                    className={styled.img}
                    src={IMAGEURL + "/" + imageJpg || imagePlaceholder}
                    alt="product"
                  />
                </picture>
              </div>
              <h1 className="mv-2 t-16 ellipsis">{name}</h1>
              <h2 className="mp0 t-16 t-gray-80">{`${currency}${price}`}</h2>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Product;
