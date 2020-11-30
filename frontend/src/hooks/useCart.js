import { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import cartApi from "../api/cart";
import { useAuth } from "./useAuth";

const cartContext = createContext();

export function ProvideCart({ children }) {
  const cart = useProvideCart();
  return <cartContext.Provider value={cart}>{children}</cartContext.Provider>;
}

export const useCart = () => useContext(cartContext);

/**
 * If user is signed-in then sync with Cart with backend
 * If user is not signed-in the store the cart at localstorage
 *  and as soon as the user signed-in merge the cart
 */

function useProvideCart() {
  const [isLoading, setIsLoading] = useState(false);
  //const [cartItems, setCartItems] = useState([]);
  const [cartItems, setCartItems] = useLocalStorage("__cart", []);
  const [cart, setCart] = useState(null);
  const [subTotal, setSubTotal] = useState(0);
  //const [localCart, setLocalCart] = useLocalStorage("__cart", []);

  const auth = useAuth();

  useEffect(() => {
    if (auth.token) {
      // Check local cart is not-empty
      if (cartItems.length > 0) {
        // merge with cloud cart
        cartApi
          .updateCart(cartItems, auth.token)
          .then((resp) => {
            setCartItems(resp.data.items);
          })
          .catch((e) => {
            setCartItems([]);
          });
      } else {
        cartApi
          .getCart(auth.token)
          .then((resp) => {
            setCart(resp.data);
            setCartItems(resp.data.items);
          })
          .catch((e) => {
            setCart(null);
            setCartItems([]);
            //alert(`Error: ${e.message}`);
          });
      }
    }
  }, [auth.token]);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.product.offerPrice * item.quantity;
    });
    setSubTotal(total);
  }, [cartItems]);

  const addToCartLocal = (product, qty = 1) => {
    const tempCartItems = cartItems || [];

    let itemIndex = tempCartItems.findIndex(
      (item) => item.product._id === product._id
    );

    if (itemIndex > -1) {
      //product exists in the cart, update the quantity
      tempCartItems[itemIndex].quantity += qty;

      if (qty === 0 || tempCartItems[itemIndex].quantity < 1) {
        tempCartItems.splice(itemIndex, 1);
      }
    } else {
      //product does not exists in cart, add new item
      tempCartItems.push({ product, quantity: qty });
    }
    setCartItems([...tempCartItems]);
  };

  const addToCartServer = ({ _id: id }, qty = 1) => {
    setIsLoading(true);
    return cartApi
      .addToCart(id, qty, auth.token)
      .then((resp) => {
        setIsLoading(false);
        setCartItems(resp.data.items);
      })
      .catch((e) => {
        setIsLoading(false);
        alert(`Error: ${e.message}`);
      });
  };

  const addToCart = async (product, qty = 1) => {
    if (auth.user) {
      await addToCartServer(product, qty);
    } else {
      addToCartLocal(product, qty);
    }
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  return {
    isLoading,
    subTotal,
    cartItems,
    emptyCart,
    addToCart,
  };
}
