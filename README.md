# Order Food

### 資料結構 (Data structure)
> product
``` 
{
  id: 1,
  name: "咔啦雞腿堡 XL",
  price: 100,
  imageWebp: "/images/kfc/webp/01.webp",
  imageJpg: "/images/kfc/jpg/01.jpeg",
}
```

> order list
```
{
  orderId: 1667726017747,
  name: "咔啦雞腿堡 XL",
  price: 100,
  quantity: 1
  customer: "Hisaishi",
  notes: "紅茶去冰",
}
```



哪個好測試

/_ A _/

```js
const calculate = () =>{
  const price = data.reduce((acc, cur) => {
    return cur.quantity \* cur.price + acc;
  }, 0);
  return price
}

const handleCalculateTotalPrice = (data) => {
  const price = calculate(data);
  setTotalPrice(price);
};

```


/_ B _/

```js
function calculateTotalPrice(data) {
  const price = data.reduce((acc, cur) => {
    return cur.quantity \* cur.price + acc;
  }, 0);

  setTotalPrice(price);
}
```
