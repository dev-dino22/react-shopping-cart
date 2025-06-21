import { useCallback, useMemo } from "react";
import { useCartStore } from "../../../store/hooks/useCartStore";
import { useSelectedCartIdsContext } from "../context/SelectedCartIdsProvider";

export function useOrderCartList() {
  const { cartListData, ...cartActions } = useCartStore();
  const { selectedCartIds, ...selectionActions } = useSelectedCartIdsContext();

  const selectedCartData = useMemo(() => {
    return (
      cartListData?.filter((cart) => selectedCartIds.includes(cart.id)) ?? []
    );
  }, [cartListData, selectedCartIds]);

  const syncSelectedIds = useCallback(() => {
    if (!cartListData) return;
    selectionActions.syncSelectedIdsWithData(cartListData);
  }, [cartListData, selectionActions]);

  return {
    cartListData,
    selectedCartData,
    selectedCartIds,
    ...cartActions,
    ...selectionActions,
    syncSelectedIds,
  };
}
