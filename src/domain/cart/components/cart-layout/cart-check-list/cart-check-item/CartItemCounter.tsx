import { Cart } from "../../../../../../api/cart";
import Counter from "../../../../../../components/inputs/Counter";
import { useToastContext } from "../../../../../../context/ToastProvider";
import { useOrderCartList } from "../../../../../order/hooks/useOrderCartList";

interface CartItemCounterProps {
  cart: Cart;
}

function CartItemCounter({ cart }: CartItemCounterProps) {
  const { updateCartItem } = useOrderCartList();

  const { showToast } = useToastContext();

  const handlePlusQuantity = async (cartId: string) => {
    try {
      await updateCartItem(cartId, cart.quantity + 1);
    } catch (e) {
      showToast("장바구니에 추가하는 데 실패했습니다.", "error");
    }
  };

  const handleMinusQuantity = async (cartId: string) => {
    try {
      await updateCartItem(cartId, cart.quantity - 1);
    } catch (e) {
      showToast("장바구니에서 뺴는 데 실패했습니다.", "error");
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
