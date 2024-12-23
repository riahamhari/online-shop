import React, { createContext, useState } from "react";
import { ReactNode } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.ts";

// Define the type for a cart item
type CartItem = {
  id: string; // Assuming 'id' is a string, adjust if it's a number
  name: string;
  price: number;
  quantity: number;
};

// Define the context type
type CartContextType = {
  items: CartItem[];
  addItemToCart: (id: string) => void;
  updateItemQuantity: (productId: string, amount: number) => void;
};

export const CartContext = createContext<CartContextType>({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

type CartContextProviderProps = {
  children: ReactNode; // Explicitly type children as ReactNode
};

export default function CartContextProvider({children}:CartContextProviderProps) {
  const [shoppingCart, setShoppingCart] = useState<{ items: CartItem[] }>({
    items: [],
  });

  function handleAddItemToCart(id: string) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        if (product) {
          updatedItems.push({
            id: id,
            name: product.title,
            price: product.price,
            quantity: 1,
          });
        }
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId: string, amount: number) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      if (updatedItemIndex !== -1) {
        const updatedItem = {
          ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += amount;

        if (updatedItem.quantity <= 0) {
          updatedItems.splice(updatedItemIndex, 1);
        } else {
          updatedItems[updatedItemIndex] = updatedItem;
        }
      }

      return {
        items: updatedItems,
      };
    });
  }

  const ctxValue: CartContextType = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>
      {children}
    </CartContext.Provider>
  );
}
