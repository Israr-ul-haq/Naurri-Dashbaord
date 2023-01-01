import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
function WebLayout() {
  return (
    <>
      <Header />
      <Sidebar />
      <Box
        marginLeft={"135px"}
        marginRight={"50px"}
        marginTop={"115px"}
        marginBottom={"35px"}
      >
        <Outlet />
        
      </Box>
    </>
  );
}

export default WebLayout;
