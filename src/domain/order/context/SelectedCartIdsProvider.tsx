import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Cart } from "../../../api/cart";

const STORAGE_KEY = "selected-cart-items";

const SelectedCartIdsContext = createContext<{
  selectedCartIds: string[];
  setSelectedCartIds: React.Dispatch<React.SetStateAction<string[]>>;
  handleAddCartId: (cartId: string) => void;
  handleDeleteCartId: (cartId: string) => void;
  handleReplaceCartIds: (ids: string[]) => void;
  handleClearSelectedCartIds: () => void;
  syncSelectedIdsWithData: (cartListData: Cart[]) => void;
}>({
  selectedCartIds: [],
  setSelectedCartIds: () => {},
  handleAddCartId: () => {},
  handleDeleteCartId: () => {},
  handleReplaceCartIds: () => {},
  handleClearSelectedCartIds: () => {},
  syncSelectedIdsWithData: () => {},
});

export const SelectedCartIdsProvider = ({ children }: PropsWithChildren) => {
  const [selectedCartIds, setSelectedCartIds] = useState<string[]>(() => {
    const savedIds = localStorage.getItem(STORAGE_KEY);
    return savedIds ? JSON.parse(savedIds) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedCartIds));
  }, [selectedCartIds]);

  const handleAddCartId = useCallback((cartId: string) => {
    setSelectedCartIds((prev) =>
      prev.includes(cartId) ? prev : [...prev, cartId]
    );
  }, []);

  const handleDeleteCartId = useCallback((cartId: string) => {
    setSelectedCartIds((prev) => prev.filter((id) => id !== cartId));
  }, []);

  const handleReplaceCartIds = useCallback((ids: string[]) => {
    setSelectedCartIds(ids);
  }, []);

  const handleClearSelectedCartIds = useCallback(() => {
    setSelectedCartIds([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const syncSelectedIdsWithData = useCallback((cartListData: Cart[]) => {
    if (!cartListData) return;
    setSelectedCartIds((prev) =>
      prev.filter((cartId) => cartListData.some((cart) => cart.id === cartId))
    );
  }, []);

  return (
    <SelectedCartIdsContext.Provider
      value={{
        selectedCartIds,
        setSelectedCartIds,
        handleAddCartId,
        handleDeleteCartId,
        handleReplaceCartIds,
        handleClearSelectedCartIds,
        syncSelectedIdsWithData,
      }}
    >
      {children}
    </SelectedCartIdsContext.Provider>
  );
};

export const useSelectedCartIdsContext = () => {
  const {
    selectedCartIds,
    setSelectedCartIds,
    handleAddCartId,
    handleDeleteCartId,
    handleReplaceCartIds,
    handleClearSelectedCartIds,
    syncSelectedIdsWithData,
  } = useContext(SelectedCartIdsContext);
  if (!selectedCartIds) {
    throw new Error(
      "useOrderListContext 는 반드시 OrderListProvider 안에서 사용되어야합니다."
    );
  }

  return {
    selectedCartIds,
    setSelectedCartIds,
    handleAddCartId,
    handleDeleteCartId,
    handleReplaceCartIds,
    handleClearSelectedCartIds,
    syncSelectedIdsWithData,
  };
};
