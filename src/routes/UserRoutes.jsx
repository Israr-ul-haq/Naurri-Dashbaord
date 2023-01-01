import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import EditUser from "../pages/user/EditUser";
import User from "../pages/user/User";
import ViewUser from "../pages/user/ViewUser";
function UserRoutes({ children }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path=":id"
          element={
            <PrivateRoute>
              <ViewUser />
            </PrivateRoute>
          }
        />
        <Route
          path="edit/:id"
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default UserRoutes;
