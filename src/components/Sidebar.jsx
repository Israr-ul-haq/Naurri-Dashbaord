import { Box, Flex } from "@chakra-ui/react";
import Img from "react-cool-img";
import { NavLink } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { loadingImage } from "../constants/LoadingImage";
import { SidebarItems } from "../constants/SidebarItems";
function Sidebar() {
  return (
    <Box
      width={"100px"}
      h={"100vh"}
      position={"fixed"}
      left={"0"}
      top={"0px"}
      borderRight={"1px solid #D1D1D1"}
      paddingTop={"80px"}
      className="mainsidebar"
    >
      <SimpleBar forceVisible="y" autoHide={true} style={{ height: "100%" }}>
        {SidebarItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.name.toLowerCase()}
            style={{
              width: "100%",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Flex
              key={item.name}
              alignItems={"center"}
              justifyContent={"center"}
              w={"100%"}
              height={"100px"}
            >
              <Img
                className="inactivesidebarimage"
                placeholder={loadingImage}
                src={item.image}
                error={item.image}
                alt={item.name.toLowerCase() + "-image"}
                style={{ cursor: "pointer" }}
              />
              <Img
                className="activesidebarimage"
                placeholder={loadingImage}
                src={item.imageActive}
                error={item.image}
                alt={item.name.toLowerCase() + "-image"}
                style={{ cursor: "pointer" }}
              />
            </Flex>
          </NavLink>
        ))}
      </SimpleBar>
    </Box>
  );
}

export default Sidebar;
