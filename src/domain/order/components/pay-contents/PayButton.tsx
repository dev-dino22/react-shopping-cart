import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useCouponContext } from "../../../../pages/order-confirm/context/CouponProvider";
import { useOrderListContext } from "../../context/OrderListProvider";
import { useCartAPIData } from "../../../cart/hooks/useCartAPIData";
import { calculateOrders } from "../../utils/calculateOrders";

function PayButton() {
  const { cartListData } = useCartAPIData();
  const { selectedCartItems, isIsland } = useOrderListContext(cartListData);
  const { selectedCoupons } = useCouponContext();
  const { totalPrice, typeCount, totalCount } = calculateOrders(
    selectedCartItems
  ).getOrderPriceWithCoupon(selectedCoupons, isIsland);

  const navigate = useNavigate();
  const navigateToSuccessPage = () => {
    navigate("/success-confirm", {
      state: { totalPrice, typeCount, totalCount },
    });
  };

  return (
    <Container onClick={navigateToSuccessPage} isDisabled={false}>
      결제하기
    </Container>
  );
}

export default PayButton;

const Container = styled.button<{ isDisabled: boolean }>`
  /* position: sticky;
  bottom: 0; */
  width: 100%;
  padding: 16px;
  background-color: ${({ isDisabled }) => (isDisabled ? "#BDBDBD" : "#333")};
  color: white;
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  border-radius: 0px;
`;
