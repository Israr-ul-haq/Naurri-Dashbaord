import { Routes, Route } from "react-router-dom";
import AddCategory from "../components/Categories/AddCategory";
import EditCategory from "../components/Categories/EditCategory";
import ManageCategories from "../components/Categories/ManageCategories";
import PrivateRoute from "../components/PrivateRoute";
import EditChoices from "../pages/choices/EditChoices";
function CategoriesRoute() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <ManageCategories />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/edit/:id"
        element={
          <PrivateRoute>
            <EditCategory />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/add"
        element={
          <PrivateRoute>
            <AddCategory />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default CategoriesRoute;
