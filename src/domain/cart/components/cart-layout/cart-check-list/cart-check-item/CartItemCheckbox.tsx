import CheckBox from "../../../../../../components/common/inputs/CheckBox";
import { useOrderCartList } from "../../../../../order/hooks/useOrderCartList";

function CartItemCheckbox({ cartId }: { cartId: string }) {
  const { selectedCartData, handleAddCartId, handleDeleteCartId } =
    useOrderCartList();

  const isChecked = selectedCartData.some((item) => item.id === cartId);

  const handleToggleSelection = () => {
    if (isChecked) {
      handleDeleteCartId(cartId);
    } else {
      handleAddCartId(cartId);
    }
  };

  return (
    <CheckBox
      isChecked={isChecked}
      onToggle={() => handleToggleSelection()}
      role={"cart-item-checkbox"}
      aria-checked={isChecked}
    />
  );
}

export default CartItemCheckbox;
