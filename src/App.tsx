import { Global } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MobileLayout } from "./components";
import { ScrollToTopOnRouteChange } from "./components/layout/ScrollToTopOnRouteChange";
import ErrorBoundary from "./domain/error-boundary/ErrorBoundary";
import { APIDataProvider } from "./context/APIDataProvider";
import { ToastProvider } from "./context/ToastProvider";
import { SelectedCartIdsProvider } from "./domain/order/context/SelectedCartIdsProvider";
import OrderConfirmPage from "./pages/order-confirm/OrderConfirmPage";
import ShoppingCartPage from "./pages/shopping-cart/ShoppingCartPage";
import SuccessConfirmPage from "./pages/success-confirm/SuccessConfirmPage";
import reset from "./style/reset";
import { getBrowserBaseUrl } from "./utils/getBrowserBaseUrl";

function App() {
  return (
    <>
      <Global styles={reset} />
      <MobileLayout>
        <ToastProvider>
          <APIDataProvider>
            <BrowserRouter basename={getBrowserBaseUrl()}>
              <ScrollToTopOnRouteChange />
              <Routes>
                <Route
                  path="/"
                  element={
                    <SelectedCartIdsProvider>
                      <ErrorBoundary>
                        <ShoppingCartPage />
                      </ErrorBoundary>
                    </SelectedCartIdsProvider>
                  }
                />
                <Route
                  path="/order-confirm"
                  element={
                    <SelectedCartIdsProvider>
                      <ErrorBoundary>
                        <OrderConfirmPage />
                      </ErrorBoundary>
                    </SelectedCartIdsProvider>
                  }
                />
                <Route
                  path="*"
                  element={
                    <div>
                      <h1>Page Not Found</h1>
                    </div>
                  }
                />
                <Route
                  path="/success-confirm"
                  element={
                    <ErrorBoundary>
                      <SuccessConfirmPage />
                    </ErrorBoundary>
                  }
                />
              </Routes>
            </BrowserRouter>
          </APIDataProvider>
        </ToastProvider>
      </MobileLayout>
    </>
  );
}

export default App;
