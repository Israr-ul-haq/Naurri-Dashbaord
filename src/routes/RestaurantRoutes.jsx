import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddRestaurant from "../pages/restaurant/AddRestaurant";
import EditRestaurant from "../pages/restaurant/EditRestaurant";
import Restaurant from "../pages/restaurant/Restaurant";
import ViewRestaurant from "../pages/restaurant/ViewRestaurant";
function RestaurantRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <Restaurant />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="add"
        element={
          <PrivateRoute>
            <AddRestaurant />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="edit/:id"
        element={
          <PrivateRoute>
            <EditRestaurant />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="view/:id"
        element={
          <PrivateRoute>
            <ViewRestaurant />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default RestaurantRoutes;
