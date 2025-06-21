import styled from "@emotion/styled";
import { Flex } from "../../../../../components";
import { useOrderCartList } from "../../../../order/hooks/useOrderCartList";

const CartTitle = () => {
  const { cartListData } = useOrderCartList();

  return (
    <Flex gap="sm" alignItems="flex-start">
      <Title>장바구니</Title>
      <CartCountInfoText>
        {cartListData &&
          cartListData.length !== 0 &&
          `현재 ${cartListData.length}종류의 상품이 담겨있습니다.`}
      </CartCountInfoText>
    </Flex>
  );
};

export default CartTitle;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const CartCountInfoText = styled.p`
  font-size: 14px;
`;
