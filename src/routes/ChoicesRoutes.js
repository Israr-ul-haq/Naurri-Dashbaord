import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddChoices from "../pages/choices/AddChoices";
import EditChoices from "../pages/choices/EditChoices";
import ManageChoices from "../pages/choices/ManageChoices";
function ChoicesRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/:RestaurantId"
        element={
          <PrivateRoute>
            <ManageChoices />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/edit/:id/:RestaurantId"
        element={
          <PrivateRoute>
            <EditChoices />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/add/:RestaurantId"
        element={
          <PrivateRoute>
            <AddChoices />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default ChoicesRoutes;
