import styled from "@emotion/styled";
import { Suspense } from "react";
import { Flex, Loading } from "../../../../components";
import CartCheckList from "./cart-check-list/CartCheckList";
import CartTitle from "./cart-check-list/CartTitle";
import LabelPriceContainer from "./LabelPriceContainer";
import ErrorBoundary from "../../../error-boundary/ErrorBoundary";

const CartLayout = () => {
  return (
    <Container>
      <CartTitle />
      <ErrorBoundary>
        <Suspense
          fallback={
            <LoadingContainer>
              <Loading />
            </LoadingContainer>
          }
        >
          <CartCheckList />
          <LabelPriceContainer />
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
};

export default CartLayout;

const Container = styled(Flex)`
  padding: 36px 24px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
