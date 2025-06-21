import styled from "@emotion/styled";
import { Flex } from "../../../components/common";
import CouponModalButton from "../../../domain/order/components/pay-contents/CouponModalButton";
import DeliveryInfo from "../../../domain/order/components/pay-contents/DeliveryInfo";
import PayButton from "../../../domain/order/components/pay-contents/PayButton";
import { PayInfoProvider } from "../../../domain/order/components/pay-contents/context/PayInfoProvider";

function PayContents() {
  return (
    <PayInfoProvider>
      <Container justifyContent="flex-start">
        <CouponModalButton />
        <DeliveryInfo />
      </Container>
      <PayButton />
    </PayInfoProvider>
  );
}

export default PayContents;

const Container = styled(Flex)`
  padding: 0 24px;
`;
