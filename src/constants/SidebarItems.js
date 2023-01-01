import dashboardImage from "../assets/images/sidebar-dashboard-image.svg";
import dashboardImageActive from "../assets/images/sidebar-dashboard-active-image.svg";
import queryImage from "../assets/images/sidebar-query-image.png";
import queryImageActive from "../assets/images/sidebar-query-active-image.png";
import riderImage from "../assets/images/sidebar-rider-image.svg";
import riderImageActive from "../assets/images/sidebar-rider-active-image.svg";
import restaurantImage from "../assets/images/sidebar-restaurant-image.svg";
import restaurantImageActive from "../assets/images/sidebar-restaurant-active-image.svg";
import orderImage from "../assets/images/sidebar-order-image.svg";
import orderImageActive from "../assets/images/sidebar-order-active-image.svg";
import riderFinance from "../assets/images/sidebar-rider-finance-image.svg";
import riderFinanceActive from "../assets/images/sidebar-rider-finance-active-image.svg";
import userImage from "../assets/images/sidebar-user-image.svg";
import userImageActive from "../assets/images/sidebar-user-active-image.svg";
import configurationImage from "../assets/images/sidebar-configuration-image.svg";
import configurationImageActive from "../assets/images/sidebar-configuration-active-image.svg";
import restaurantFinanceImage from "../assets/images/sidebar-income-image.svg";
import restaurantFinanceImageActive from "../assets/images/sidebar-income-active-image.svg";

export const SidebarItems = [
  {
    name: "/",
    image: dashboardImage,
    imageActive: dashboardImageActive,
  },
  {
    name: "Users",
    image: userImage,
    imageActive: userImageActive,
  },
  {
    name: "Restaurants",
    image: restaurantImage,
    imageActive: restaurantImageActive,
  },
  {
    name: "Riders",
    image: riderImage,
    imageActive: riderImageActive,
  },
  {
    name: "Orders",
    image: orderImage,
    imageActive: orderImageActive,
  },
  {
    name: "rider_finance",
    image: riderFinance,
    imageActive: riderFinanceActive,
  },
  // {
  //   name: "Restaurant-Finances",
  //   image: restaurantFinanceImage,
  //   imageActive: restaurantFinanceImageActive,
  // },
  {
    name: "categories",
    image: restaurantFinanceImage,
    imageActive: restaurantFinanceImageActive,
  },
  {
    name: "Configurations",
    image: configurationImage,
    imageActive: configurationImageActive,
  },
  {
    name: "Queries",
    image: queryImage,
    imageActive: queryImageActive,
  },
];
