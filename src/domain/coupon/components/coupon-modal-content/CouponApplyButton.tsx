import { useCallback } from "react";
import { Coupon } from "../../../../api/coupon";
import Button from "../../../../components/common/inputs/Button";
import { useToastContext } from "../../../../context/ToastProvider";
import { useCouponContext } from "../../../../pages/order-confirm/context/CouponProvider";
import { useOrderListContext } from "../../../order/context/OrderListProvider";
import { useCartAPIData } from "../../../cart/hooks/useCartAPIData";
import { calculateOrders } from "../../../order/utils/calculateOrders";

function CouponApplyButton({
  onClose,
}: {
  onClose: () => void;
  couponsResource: Promise<Coupon[]>;
}) {
  const { cartListData } = useCartAPIData();
  const { selectedCartItems, isIsland, handleDiscountSetting } =
    useOrderListContext(cartListData);
  const { selectedCoupons } = useCouponContext();
  const { finalDiscount } = calculateOrders(
    selectedCartItems
  ).getOrderPriceWithCoupon(selectedCoupons, isIsland);

  const { showToast } = useToastContext();

  const handleCouponApply = useCallback(() => {
    handleDiscountSetting(finalDiscount);
    showToast("쿠폰이 적용되었습니다.", "info");
    onClose();
  }, [onClose, handleDiscountSetting, finalDiscount, showToast]);

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
