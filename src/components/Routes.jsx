import {
  Route,
  Routes as Switch,
  HashRouter as Router,
} from "react-router-dom";
import WebLayout from "../layouts/WebLayout";
import AddChoices from "../pages/choices/EditChoices";
import Configuration from "../pages/configuration/Configuration";
import Dashboard from "../pages/dashboard/Dashboard";
import AddDish from "../pages/dishes/AddDish";
import Dishes from "../pages/dishes/Dishes";
import ForgotPassword from "../pages/forgotpassword/ForgotPassword";
import Notification from "../pages/notification/Notification";
import NotFound from "../pages/notfound/NotFound";
import Order from "../pages/order/Order";
import ViewOrder from "../pages/order/ViewOrder";
import Profile from "../pages/profile/Profile";
import Query from "../pages/query/Query";
import ViewQuery from "../pages/query/ViewQuery";
import RestaurantFinance from "../pages/restaurantfinance/RestaurantFinance";
import AddRider from "../pages/rider/AddRider";
import EditRider from "../pages/rider/EditRider";

import ViewRider from "../pages/rider/ViewRider";
import RiderFinance from "../pages/riderfinance/RiderFinance";
import ViewRiderFinance from "../pages/riderfinance/ViewRiderFinance";
import Login from "../pages/login/Login";

import PrivateRoute from "./PrivateRoute";
import UserRoutes from "../routes/UserRoutes";
import RestaurantRoutes from "../routes/RestaurantRoutes";
import RiderRoutes from "../routes/RiderRoutes";
import QueriesRoutes from "../routes/RiderRoutes";
import EditProfile from "../pages/profile/EditProfile";
import ManageChoices from "../pages/choices/ManageChoices";
import ChoicesRoutes from "../routes/ChoicesRoutes";
import DishesRoutes from "../routes/DishesRoutes";
import OrdersRoutes from "../routes/OrdersRoutes";
import RiderFinanceRoutes from "../routes/RiderFinanceRoutes";
import CategoriesRoute from "../routes/CategoriesRoutes";

function Routes() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/account/login" element={<Login />} />
          <Route
            exact
            path="/account/forgotpassword"
            element={<ForgotPassword />}
          />
          <Route path="/" element={<WebLayout />}>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/EditProfile" element={<EditProfile />} />
            <Route path="users/*" element={<UserRoutes />} />
            <Route path="restaurants/*" element={<RestaurantRoutes />} />
            <Route path="queries/*" element={<QueriesRoutes />} />
            <Route path="choices/*" element={<ChoicesRoutes />} />
            <Route path="riders/*" element={<RiderRoutes />} />
            <Route path="dishes/*" element={<DishesRoutes />} />
            <Route path="orders/*" element={<OrdersRoutes />} />
            <Route path="rider_finance/*" element={<RiderFinanceRoutes />} />
            <Route path="categories/*" element={<CategoriesRoute />} />

            <Route
              exact
              path="/rider-finance/:id"
              element={<ViewRiderFinance />}
            />
            <Route exact path="/notifications" element={<Notification />} />
            <Route exact path="/configurations" element={<Configuration />} />
            <Route exact path="/queries" element={<Query />} />

            <Route exact path="/query/:id" element={<ViewQuery />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Switch>
      </>
    </Router>
  );
}

export default Routes;
