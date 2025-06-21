import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import BackArrowButton from "../../components/assets/BackArrowButton";
import OrderContents from "./components/OrderContents";
import PayContents from "./components/PayContents";
import { CouponProvider } from "./context/CouponProvider";

const OrderConfirmPage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <CouponProvider>
      <Header left={<BackArrowButton onClick={handleBackClick} />} />
      <OrderContents />
      <PayContents />
    </CouponProvider>
  );
};

export default OrderConfirmPage;
