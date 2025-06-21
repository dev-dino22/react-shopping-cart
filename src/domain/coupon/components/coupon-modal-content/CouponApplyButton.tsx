import { useCallback } from "react";
import { Coupon } from "../../../../api/coupon";
import Button from "../../../../components/common/inputs/Button";
import { useToastContext } from "../../../../context/ToastProvider";
import { useCouponContext } from "../../../../pages/order-confirm/context/CouponProvider";
import { useOrderCartList } from "../../../order/hooks/useOrderCartList";
import { calculateOrders } from "../../../order/utils/calculateOrders";
import { usePayInfoContext } from "../../../order/components/pay-contents/context/PayInfoProvider";

function CouponApplyButton({
  onClose,
}: {
  onClose: () => void;
  couponsResource: Promise<Coupon[]>;
}) {
  const { selectedCartData } = useOrderCartList();
  const { selectedCoupons } = useCouponContext();
  const { payInfo, setDiscount } = usePayInfoContext();
  const { finalDiscount } = calculateOrders(
    selectedCartData
  ).getOrderPriceWithCoupon(selectedCoupons, payInfo.isIsland);

  const { showToast } = useToastContext();

  const handleCouponApply = useCallback(() => {
    setDiscount(finalDiscount);
    showToast("쿠폰이 적용되었습니다.", "info");
    onClose();
  }, [onClose, finalDiscount, showToast]);

  return (
    <Button
      backgroundColor="#333333"
      color="white"
      onClick={() => handleCouponApply()}
      disabled={false}
    >
      총 {finalDiscount.toLocaleString()}원 쿠폰 적용하기
    </Button>
  );
}

export default CouponApplyButton;
