import CheckBox from "../../../../../../components/common/inputs/CheckBox";
import { useOrderListContext } from "../../../../../order/context/OrderListProvider";
import { useCartAPIData } from "../../../../hooks/useCartAPIData";

function CartItemCheckbox({ cartId }: { cartId: string }) {
  const { cartListData } = useCartAPIData();
  const { selectedCartItems, setSelectedCartItems } =
    useOrderListContext(cartListData);

  const isChecked = selectedCartItems.some((item) => item.id === cartId);

  const handleToggleSelection = (cartId: string) => {
    setSelectedCartItems((prev) => {
      const cart = cartListData?.find((item) => item.id === cartId);
      if (!cart) return prev;

      if (isChecked) {
        return prev.filter((item) => item.id !== cartId);
      } else {
        return [...prev, cart];
      }
    });
  };

  return (
    <CheckBox
      isChecked={isChecked}
      onToggle={() => handleToggleSelection(cartId)}
      role={"cart-item-checkbox"}
      aria-checked={isChecked}
    />
  );
}

export default CartItemCheckbox;
