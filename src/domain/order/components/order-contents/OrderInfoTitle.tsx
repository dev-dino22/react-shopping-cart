import styled from "@emotion/styled";
import { Flex } from "../../../../components";
import { useCouponContext } from "../../../../pages/order-confirm/context/CouponProvider";
import { useOrderCartList } from "../../hooks/useOrderCartList";
import { calculateOrders } from "../../utils/calculateOrders";

function OrderInfoTitle() {
  const { selectedCartData } = useOrderCartList();
  const { selectedCoupons } = useCouponContext();
  const { typeCount, totalCount } =
    calculateOrders(selectedCartData).getOrderPriceWithCoupon(selectedCoupons);

  return (
    <Flex justifyContent="flex-start" alignItems="flex-start" gap="xs">
      <InfoTitle>주문 확인</InfoTitle>
      <Description
        aria-label={`총 ${typeCount}종류의 상품 ${totalCount}개를 주문합니다.`}
      >
        총 {typeCount}종류의 상품 {totalCount}개를 주문합니다.
      </Description>
      <Description>최종 결제 금액을 확인해 확인해 주세요.</Description>
    </Flex>
  );
}

export default OrderInfoTitle;

const InfoTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 12px;
`;
