import "./scss/App.scss";
import Products from "./components/Products";
import Header from "./components/Header";
import StoreContextProvider from "./context/store";

function App() {
  return (
    <StoreContextProvider>
      <div className="app">
        <Header />
        <Products />
      </div>
    </StoreContextProvider>
  );
}

export default App;
