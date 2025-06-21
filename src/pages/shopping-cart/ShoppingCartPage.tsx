import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import CartLayout from "../../domain/cart/components/cart-layout/CartLayout";
import { useOrderCartList } from "../../domain/order/hooks/useOrderCartList";

const ShoppingCartPage = () => {
  const { selectedCartIds } = useOrderCartList();
  const isDisabled = selectedCartIds.length === 0;
  const navigate = useNavigate();
  const handleCheckout = () => {
    if (!isDisabled) {
      navigate("/order-confirm");
    }
  };

  return (
    <>
      <Header left="SHOP" />
      <CartLayout />
      <CheckoutButton
        disabled={isDisabled}
        onClick={handleCheckout}
        role="order-button"
      >
        주문 확인
      </CheckoutButton>
    </>
  );
};

export default ShoppingCartPage;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #333333;
  color: white;
  cursor: pointer;
  border-radius: 0px;
  &:disabled {
    background-color: #bdbdbd;
    cursor: not-allowed;
  }
`;
