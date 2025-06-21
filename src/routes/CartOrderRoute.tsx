import { Outlet } from "react-router-dom";
import ErrorBoundary from "../domain/error-boundary/ErrorBoundary";
import { SelectedCartIdsProvider } from "../domain/order/context/SelectedCartIdsProvider";

export const CartOrderRoute = () => (
  <SelectedCartIdsProvider>
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  </SelectedCartIdsProvider>
);
