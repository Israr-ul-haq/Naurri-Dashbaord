import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddRider from "../pages/rider/AddRider";
import EditRider from "../pages/rider/EditRider";
import Rider from "../pages/rider/Rider";
import ViewRider from "../pages/rider/ViewRider";

function RiderRoutes({ children }) {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Rider />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/add"
          element={
            <PrivateRoute>
              <AddRider />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditRider />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/:id"
          element={
            <PrivateRoute>
              <ViewRider />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default RiderRoutes;
