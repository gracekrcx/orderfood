import "./scss/App.scss";
import Products from "./components/Products";
import Header from "./components/Header";
import StoreContextProvider from "./context/Store";
import PageContainer from "./components/PageContainer";

function App() {
  return (
    <StoreContextProvider>
      <PageContainer>
        <Header />
        <Products />
      </PageContainer>
    </StoreContextProvider>
  );
}

export default App;
