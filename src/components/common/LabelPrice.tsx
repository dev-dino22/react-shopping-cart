import styled from "@emotion/styled";
import Flex from "./Flex";
import { formatKRWString } from "../../utils/formatKRWString";

interface LabelPriceProps {
  label: string;
  price: number;
  ariaLabel?: string;
}

const LabelPrice = ({ label, price, ariaLabel }: LabelPriceProps) => {
  return (
    <TotalSection>
      <TotalLabel>{label}</TotalLabel>
      <TotalAmount aria-label={ariaLabel}>{formatKRWString(price)}</TotalAmount>
    </TotalSection>
  );
};

export default LabelPrice;

const TotalSection = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
`;

const TotalLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

const TotalAmount = styled.span`
  font-size: 24px;
  font-weight: 700;
`;
