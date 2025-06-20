import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useCouponContext } from "../../../../pages/order-confirm/context/CouponProvider";
import { useOrderCartList } from "../../hooks/useOrderCartList";
import { calculateOrders } from "../../utils/calculateOrders";

function PayButton() {
  const { selectedCartData } = useOrderCartList();
  const { selectedCoupons } = useCouponContext();
  const { totalPrice, typeCount, totalCount } =
    calculateOrders(selectedCartData).getOrderPriceWithCoupon(selectedCoupons);
  // isIsland 넣어야됨

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
  width: 100%;
  padding: 16px;
  background-color: ${({ isDisabled }) => (isDisabled ? "#BDBDBD" : "#333")};
  color: white;
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  border-radius: 0px;
`;
