import "./scss/App.scss";
import Product from "./components/Product";
import logo from "../src/images/shopping-cart.svg";

function App() {
  return (
    <div className="app">
      <header className="fb">
        <h1>Order Food</h1>
        <button className="btn">
          <img className="shoppingLogo" src={logo} alt="shopping" />
          <span className="ml10">購物車</span>
        </button>
      </header>
      <div className="container">
        <Product />
      </div>
    </div>
  );
}

export default App;
