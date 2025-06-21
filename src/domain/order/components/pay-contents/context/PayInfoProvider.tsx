import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

interface PayInfoContextInterface {
  payInfo: PayInfoInterface;
  setDiscount: (price: number) => void;
  handleIsIslandToggle: () => void;
}

export interface PayInfoInterface {
  discount: number;
  isIsland: boolean;
}

const PayInfoContext = createContext<PayInfoContextInterface | null>(null);

export const PayInfoProvider = ({ children }: PropsWithChildren) => {
  const [payInfo, setPayInfo] = useState<PayInfoInterface>({
    discount: 0,
    isIsland: false,
  });

  const setDiscount = useCallback((price: number) => {
    setPayInfo((prev) => ({ ...prev, discount: price }));
  }, []);

  const handleIsIslandToggle = useCallback(() => {
    setPayInfo((prev) => ({ ...prev, isIsland: !prev.isIsland }));
  }, []);

  return (
    <PayInfoContext.Provider
      value={{
        payInfo,
        setDiscount,
        handleIsIslandToggle,
      }}
    >
      {children}
    </PayInfoContext.Provider>
  );
};

export const usePayInfoContext = () => {
  const context = useContext(PayInfoContext);
  if (!context) {
    throw new Error("useCouponContext 는 CouponProvider 안에서 사용해주세요.");
  }

  const { payInfo, setDiscount, handleIsIslandToggle } = context;

  return {
    payInfo,
    setDiscount,
    handleIsIslandToggle,
  };
};
