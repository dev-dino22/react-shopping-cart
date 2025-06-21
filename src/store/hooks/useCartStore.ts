import { useDataStore } from "../dataStore";
import {
  deleteCartItem,
  getShoppingCartData,
  patchCartItem,
} from "../../api/cart";
import { Cart } from "../../api/cart";

export const useCartStore = () => {
  const { state, fetchData, setData, read } = useDataStore();

  const fetchCartData = async () => {
    return fetchData<Cart[]>("cart", getShoppingCartData, {
      staleTime: 1 * 1000,
    });
  };

  const updateCartItem = async (cartId: string, quantity: number) => {
    const currentData = state.cache["cart"]?.data as Cart[] | undefined;
    if (!currentData) return;

    const updatedData = currentData.map((item) =>
      item.id === cartId ? { ...item, quantity } : item
    );
    setData("cart", updatedData);

    try {
      await patchCartItem(cartId, quantity);
      await fetchCartData();
    } catch (error) {
      setData("cart", currentData);
      throw error;
    }
  };

  const deleteCartStoreItem = async (cartId: string) => {
    const currentData = state.cache["cart"]?.data as Cart[] | undefined;
    if (!currentData) return;

    const updatedData = currentData.filter((item) => item.id !== cartId);
    setData("cart", updatedData);

    try {
      await deleteCartItem(cartId);
      await fetchCartData();
    } catch (error) {
      setData("cart", currentData);
      throw error;
    }
  };

  const suspenseCartData = () => {
    return read("cart", getShoppingCartData);
  };

  return {
    cartListData: state.cache["cart"]?.data as Cart[] | undefined,
    loading: state.cache["cart"]?.status === "loading",
    error: state.cache["cart"]?.error,
    cartRefetch: fetchCartData,
    updateCartItem,
    deleteCartStoreItem,
    suspenseCartData,
  };
};
