import { useState } from "react";
import imagePlaceholder from "../../images/empty.jpg";
import { getLocalStorage } from "../../utils/Utils";
import CustomPopup from "../CustomPopup";
import CreateAndEditOrder from "../CreateAndEditOrder";

const list = [
  {
    id: 1,
    name: "咔啦雞腿堡XL套餐咔啦雞腿堡XL套餐咔啦雞腿堡XL套餐咔啦雞腿堡XL套餐咔啦雞腿堡XL套餐咔啦雞腿堡XL套餐咔啦雞腿堡XL套餐咔啦雞腿堡XL套餐",
    price: 193,
    imageWebp: "/images/kfc/webp/01.webp",
    imagejpg: "/images/kfc/jpg/01.jpeg",
  },
  {
    id: 2,
    name: "咔啦雞腿堡XL",
    price: 120,
    imageWebp: null,
    imagejpg: null,
  },
];

function Product() {
  const currency = "$";
  const [isPopUp, setIsPopUp] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const togglePopUp = () => {
    setIsPopUp(!isPopUp);
  };

  const handleProductClick = (id) => {
    console.log("------> 商品 id", id);
    const data = list.find((item) => item.id === id);
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
        {list.map((item) => {
          const { id, name, price, imageWebp, imagejpg } = item;
          return (
            <div
              className="card"
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
              <h1 className="mv2 t16 ellipsis">{name}</h1>
              <h1 className="mp0 t16 tg8">{`${currency}${price}`}</h1>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Product;
