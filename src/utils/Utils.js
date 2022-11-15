export function setLocalStorage(item, value) {
  console.log("// -> set");
  localStorage.setItem(item, JSON.stringify(value));
}

const call = (() => {
  let num = 0;
  return function () {
    num = num + 1;
    console.log("get::", num);
  };
})();

export function getLocalStorage(item) {
  call();
  const data = JSON.parse(localStorage.getItem(item));
  return data;
}

// export function calculateTotalPrice(data) {
//   const price = data.reduce((acc, cur) => {
//     return cur.quantity * cur.price + acc;
//   }, 0);
//   setLocalStorage("totalPrice", price);
// }
