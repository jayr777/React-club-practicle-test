import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProductList from "./components/Product-List/ProductList";
import DetailsPage from "./components/Product-List/DetailsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/:id/details" element={<DetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
