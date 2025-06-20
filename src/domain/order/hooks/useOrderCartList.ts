import { useEffect, useMemo } from "react";
import { useCartAPIData } from "../../cart/hooks/useCartAPIData";
import { useSelectedCartIdsContext } from "../context/SelectedCartIdsProvider";

export function useOrderCartList() {
  const { cartListData, cartRefetch } = useCartAPIData();
  const {
    selectedCartIds,
    handleAddCartId,
    handleDeleteCartId,
    handleReplaceCartIds,
    handleClearSelectedCartIds,
    syncSelectedIdsWithData,
  } = useSelectedCartIdsContext();

  useEffect(() => {
    if (!cartListData) return;
    syncSelectedIdsWithData(cartListData);
  }, [cartListData, syncSelectedIdsWithData]);

  const selectedCartData = useMemo(() => {
    if (!cartListData) return [];
    return cartListData.filter((cart) => selectedCartIds.includes(cart.id));
  }, [cartListData, selectedCartIds]);

  return {
    cartListData,
    cartRefetch,
    selectedCartIds,
    handleAddCartId,
    handleDeleteCartId,
    handleReplaceCartIds,
    handleClearSelectedCartIds,
    selectedCartData,
  };
}
