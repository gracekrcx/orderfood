import imagePlaceholder from "../images/empty.jpg";
import { getLocalStorage } from "../utils/Utils";

function Product() {
  const list = [
    {
      name: "咔啦雞腿堡XL套餐咔啦雞腿堡XL套餐咔啦雞腿堡XL套餐咔啦雞腿堡XL套餐咔啦雞腿堡XL套餐咔啦雞腿堡XL套餐咔啦雞腿堡XL套餐咔啦雞腿堡XL套餐",
      price: 199,
      imageWebp: "/images/kfc/webp/01.webp",
      imagejpg: "/images/kfc/jpg/01.jpeg",
    },
    {
      name: "咔啦雞腿堡XL",
      price: 120,
      imageWebp: null,
      imagejpg: null,
    },
  ];

  const currency = "$";

  return (
    <>
      {list.map((item) => {
        const { name, price, imageWebp, imagejpg } = item;
        return (
          <div className="card" key={name}>
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
    </>
  );
}

export default Product;
