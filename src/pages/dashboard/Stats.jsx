import { Flex, Skeleton } from "@chakra-ui/react";
import orderImage from "../../assets/images/stat-order-image.svg";
import restaurantImage from "../../assets/images/stat-restaurant-image.svg";
import riderImage from "../../assets/images/stat-rider-image.svg";
import userImage from "../../assets/images/stat-user-image.svg";
import { useState, useEffect } from "react";
import { get } from "../../services/DashboardService";

import Stat from "./Stat";
function Stats() {
  //State
  const [data, setData] = useState({
    totalUsers: 0,
    totalRiders: 0,
    totalRestaurants: 0,
    totalOrders: 0,
  });
  const [loader, setLoader] = useState(false);
  //UseEffect
  useEffect(() => {
    (async () => {
      const response = await get();
      setData(response.data.data);
      setLoader(true);
    })();
  }, []); //eslint-disable-line
  return (
    <Skeleton isLoaded={loader}>
      <Flex justifyContent={"space-between"}>
        <Stat data={data.totalUsers} image={userImage} title={"Total Users"} />
        <Stat
          data={data.totalRiders}
          image={riderImage}
          title={"Total Riders"}
        />
        <Stat
          data={data.totalRestaurants}
          image={restaurantImage}
          title={"Total Restaurants"}
        />
        <Stat
          data={data.totalOrders}
          image={orderImage}
          title={"Total Orders"}
        />
      </Flex>
    </Skeleton>
  );
}

export default Stats;
