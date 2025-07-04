import styled from "@emotion/styled";
import Flex from "../../../components/common/Flex";
import LabelPrice from "../../../components/common/LabelPrice";
import { useOrderListContext } from "../context/OrderListProvider";
import { formatKRWString } from "../../../utils/formatKRWString";
import { useAPIDataContext } from "../../../context/APIDataProvider";
import { getShoppingCartData } from "../../../api/cart";
import { useOrderCalculation } from "../../../hooks/order/useOrderCalculation";
import { FREE_SHIPPING_STANDARD } from "../../../hooks/order/OrderConstants";

const LabelPriceContainer = () => {
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });
  const { selectionMap } = useOrderListContext(cartListData);
  const { shippingFee, totalPrice, totalCartPrice } = useOrderCalculation(
    cartListData,
    selectionMap
  );

  return (
    <Container>
      <InfoBox>
        <InfoIcon src="./assets/icons/Info.svg" alt="info 아이콘" />
        <InfoMessage>
          총 주문 금액이 {formatKRWString(FREE_SHIPPING_STANDARD)} 이상일 경우
          무료 배송됩니다.
        </InfoMessage>
      </InfoBox>
      <PriceWrapper>
        <LabelPrice label="주문 금액" price={totalCartPrice} />
        <LabelPrice
          ariaLabel="shipping-fee"
          label="배송비"
          price={shippingFee}
        />
      </PriceWrapper>

      <LabelPrice label="총 결제 금액" price={totalPrice} />
    </Container>
  );
};

export default LabelPriceContainer;

const InfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 4px;
`;
const InfoMessage = styled.p`
  font-size: 12px;
  font-weight: 500;
`;

const InfoIcon = styled.img`
  width: 14px;
  height: 14px;
`;
const Container = styled(Flex)`
  flex-direction: column;
  gap: 20px;
  height: 180px;
`;

const PriceWrapper = styled(Flex)`
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  padding: 16px 0;
  gap: 16px;
`;
