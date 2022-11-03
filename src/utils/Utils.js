export function setLocalStorage(item, value) {
  console.log("Set");
  localStorage.setItem(item, JSON.stringify(value));
}

export function getLocalStorage(item) {
  console.log("Get");
  const data = localStorage.getItem(item);
  console.log(data);
}
