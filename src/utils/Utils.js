export function setLocalStorage(item, value) {
  console.log("Set");
  localStorage.setItem(item, JSON.stringify(value));
}

export function getLocalStorage(item) {
  const data = JSON.parse(localStorage.getItem(item));
  return data;
}
