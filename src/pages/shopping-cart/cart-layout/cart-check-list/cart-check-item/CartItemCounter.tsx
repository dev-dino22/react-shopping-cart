import { useContext } from "react";
import {
  Cart,
  getShoppingCartData,
  patchCartItem,
} from "../../../../../api/cart";
import Counter from "../../../../../components/common/Counter";
import { useAPIDataContext } from "../../../../../context/APIDataProvider";
import { ToastContext } from "../../../../../context/ToastProvider";

interface CartItemCounterProps {
  cart: Cart;
}

function CartItemCounter({ cart }: CartItemCounterProps) {
  const { data: cartListData, refetch: cartRefetch } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });

  const { showToast } = useContext(ToastContext);

  const handlePlusQuantity = async (cartId: string) => {
    try {
      if (!cartListData) return;
      const cart = cartListData.find((cart) => cart.id === cartId);
      if (!cart) throw new Error("장바구니에 해당 아이템이 없습니다.");
      await patchCartItem(cartId, cart.quantity + 1);
      await cartRefetch();
    } catch (e) {
      showToast("장바구니에 추가하는 데 실패했습니다.");
    }
  };

  const handleMinusQuantity = async (cartId: string) => {
    try {
      if (!cartListData || cartListData.length >= 50) return;
      const cart = cartListData.find((cart) => cart.id === cartId);
      if (!cart) throw new Error("장바구니에 해당 아이템이 없습니다.");
      await patchCartItem(cartId, cart.quantity - 1);
      await cartRefetch();
    } catch (e) {
      showToast("장바구니에서 뺴는 데 실패했습니다.");
    }
  };
  return (
    <Counter
      canBeZero={false}
      count={cart.quantity}
      maxCount={cart.product.quantity}
      onPlusClick={() => handlePlusQuantity(cart.id)}
      onMinusClick={() => handleMinusQuantity(cart.id)}
      autoFocus={true}
    />
  );
}

export default CartItemCounter;
