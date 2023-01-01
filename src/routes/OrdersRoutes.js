import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Order from "../pages/order/Order";
import ViewOrder from "../pages/order/ViewOrder";

function OrdersRoutes({ children }) {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/:id"
          element={
            <PrivateRoute>
              <ViewOrder />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default OrdersRoutes;
