import { useState } from "react";
import styled from "./index.module.scss";
import imagePlaceholder from "../../images/empty.jpg";
import { getLocalStorage } from "../../utils/Utils";
import CustomPopup from "../CustomPopup";
import CreateAndEditOrder from "../CreateAndEditOrder";
import { productList } from "../../utils/common";

function Product() {
  const currency = getLocalStorage("currency");
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

  console.log(window.location.origin);
  const url = window.location.origin;

  return (
    <>
      {isPopUp && (
        <CustomPopup onClose={togglePopUp}>
          <CreateAndEditOrder
            onClose={togglePopUp}
            selectedData={selectedData}
          />
        </CustomPopup>
      )}
      <div className="container">
        {productList.map((item) => {
          const { id, name, price, imageWebp, imagejpg } = item;
          return (
            <div
              className={`${styled.card} mb-15`}
              key={name}
              onClick={() => handleProductClick(id)}
            >
              <div className={styled.imgBox}>
                <picture>
                  <source
                    className={styled.img}
                    srcSet={url + imageWebp}
                    type="image/webp"
                  />
                  <img
                    className={styled.img}
                    src={url + imagejpg || imagePlaceholder}
                    alt="product"
                  />
                </picture>
              </div>
              <h1 className="mv-2 t-16 ellipsis">{name}</h1>
              <h1 className="mp0 t-16 t-g-80">{`${currency}${price}`}</h1>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Product;
