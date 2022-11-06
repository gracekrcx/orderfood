import { useState } from "react";
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
              className="card mb-15"
              key={name}
              onClick={() => handleProductClick(id)}
            >
              <div className="imgBox">
                <picture>
                  <source
                    className="img cover"
                    srcSet={imageWebp}
                    type="image/webp"
                  />
                  <img
                    className="img cover"
                    src={imagejpg || imagePlaceholder}
                    alt="product"
                  />
                </picture>
              </div>
              <h1 className="mv-2 t-16 ellipsis">{name}</h1>
              <h1 className="mp0 t-16 tg-80">{`${currency}${price}`}</h1>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Product;
