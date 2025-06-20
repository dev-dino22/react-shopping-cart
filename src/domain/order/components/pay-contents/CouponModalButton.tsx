import { BasicModal } from "@dev-dino22/modal-components";
import Button from "../../../../components/common/inputs/Button";
import { useBoolean } from "../../../../hooks/useBoolean";
import CouponModalContent from "../../../coupon/components/coupon-modal-content/CouponModalContent";

function CouponModalButton() {
  const [isOpen, handleOpen, handleClose] = useBoolean(false);
  return (
    <>
      <Button onClick={handleOpen}>쿠폰 적용</Button>
      {isOpen && (
        <BasicModal
          modalSize="medium"
          modalPosition="center"
          closeType="top"
          onClose={handleClose}
          titleText="쿠폰을 선택해주세요"
        >
          <CouponModalContent onClose={handleClose} />
        </BasicModal>
      )}
    </>
  );
}

export default CouponModalButton;
