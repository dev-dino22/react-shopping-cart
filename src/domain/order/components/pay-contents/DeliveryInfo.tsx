import styled from "@emotion/styled";
import { Flex } from "../../../../components/common";
import CheckboxLabel from "../../../../components/common/inputs/CheckboxLabel";
import { useCouponContext } from "../../../../pages/order-confirm/context/CouponProvider";
import { useOrderCartList } from "../../hooks/useOrderCartList";
import { calculateOrders } from "../../utils/calculateOrders";
import OrderLabelPridce from "../order-contents/OrderLabelPrice";
import { usePayInfoContext } from "./context/PayInfoProvider";

function DeliveryInfo() {
  const { selectedCartData } = useOrderCartList();
  const { selectedCoupons } = useCouponContext();
  const { payInfo, handleIsIslandToggle } = usePayInfoContext();

  const { totalCartPrice, shippingFee, totalPrice, finalDiscount } =
    calculateOrders(selectedCartData).getOrderPriceWithCoupon(
      selectedCoupons,
      payInfo.isIsland
    );

  return (
    <Container alignItems="flex-start" gap="xs">
      <Title>배송 정보</Title>
      <CheckboxLabel
        isChecked={payInfo.isIsland}
        onToggle={handleIsIslandToggle}
      >
        제주도 및 도서 산간 지역
      </CheckboxLabel>
      <OrderLabelPridce
        totalCartPrice={totalCartPrice}
        shippingFee={shippingFee}
        totalPrice={totalPrice}
        couponDiscount={-finalDiscount}
      />
    </Container>
  );
}

export default DeliveryInfo;

const Container = styled(Flex)`
  padding: 20px 0;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: black;
`;
