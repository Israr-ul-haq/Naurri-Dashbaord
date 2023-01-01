import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

import RiderFinance from "../pages/riderfinance/RiderFinance";
import ViewRiderFinance from "../pages/riderfinance/ViewRiderFinance";

function RiderFinanceRoutes({ children }) {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <RiderFinance />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="view/:id"
          element={
            <PrivateRoute>
              <ViewRiderFinance />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default RiderFinanceRoutes;
