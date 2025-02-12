import React from "react";
import Header from "./components/Header.tsx";
import Shop from "./components/Shop.tsx";
import { DUMMY_PRODUCTS } from "./dummy-products.ts";
import CartContextProvider from "./store/shopping-cart-context.tsx";
import Product from "./components/Product.tsx";

function App() {
  return (
    // state is the value we are providing to the vale on the contect
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
