import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddDish from "../pages/dishes/AddDish";
import Dishes from "../pages/dishes/Dishes";
import EditDish from "../pages/dishes/EditDish";
function DishesRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/:RestaurantId"
        element={
          <PrivateRoute>
            <Dishes />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/edit/:id/:RestaurantId"
        element={
          <PrivateRoute>
            <EditDish />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/add/:RestaurantId"
        element={
          <PrivateRoute>
            <AddDish />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default DishesRoutes;
