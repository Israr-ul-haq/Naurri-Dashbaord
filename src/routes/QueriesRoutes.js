import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Query from "../pages/query/Query";
import ViewQuery from "../pages/query/ViewQuery";

function QueriesRoutes({ children }) {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Query />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/:id"
          element={
            <PrivateRoute>
              <ViewQuery />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default QueriesRoutes;
