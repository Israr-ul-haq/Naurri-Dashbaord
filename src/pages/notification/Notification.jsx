import { Box, Flex } from "@chakra-ui/react";
import Img from "react-cool-img";
import DashboardHeading from "../../components/DashboardHeading";
import { loadingImage } from "../../constants/LoadingImage";
import notificationImage from "../../assets/images/dummyprofile-image.png";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
function Notification() {
  return (
    <div>
      <DashboardHeading text={"Notifications"} />
      <Box padding={"50px"} boxShadow={"0 0 18px #00000014"}>
        <Flex
          borderBottom={"1px solid #DADADA"}
          mb={"15px"}
          paddingBottom={"15px"}
          _last={{mb: "0", borderBottom: "0", padding: "0"}}
        >
          <Img
            placeholder={loadingImage}
            src={notificationImage}
            error={notificationImage}
            alt="notification-img"
            width="50px"
            style={{ borderRadius: "50%", objectFit: "cover", height: "50px" }}
          />
          
          <Box marginLeft={"30px"}  >
            <Heading
              fontSize={HeadingFontSizes.heading_4}
              color={Colors.heading_primary_color}
              fontFamily={FontFamily.primary_font}
              fontWeight="700"
              margin="0 0 10px 0"
              text={"Notification"}
            />
            <Heading
              fontSize={HeadingFontSizes.heading_5}
              color={Colors.paragraph_primary_colors}
              fontFamily={FontFamily.primary_font}
              fontWeight="400"
              margin="0 0 0 0"
              text={
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus"
              }
            />
          </Box>
        </Flex>
        <Flex
          borderBottom={"1px solid #DADADA"}
          mb={"15px"}
          paddingBottom={"15px"}
          _last={{mb: "0", borderBottom: "0", padding: "0"}}
        >
          <Img
            placeholder={loadingImage}
            src={notificationImage}
            error={notificationImage}
            alt="notification-img"
            width="50px"
            style={{ borderRadius: "50%", objectFit: "cover", height: "50px" }}
          />
          
          <Box marginLeft={"30px"}  >
            <Heading
              fontSize={HeadingFontSizes.heading_4}
              color={Colors.heading_primary_color}
              fontFamily={FontFamily.primary_font}
              fontWeight="700"
              margin="0 0 10px 0"
              text={"Notification"}
            />
            <Heading
              fontSize={HeadingFontSizes.heading_5}
              color={Colors.paragraph_primary_colors}
              fontFamily={FontFamily.primary_font}
              fontWeight="400"
              margin="0 0 0 0"
              text={
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus"
              }
            />
          </Box>
        </Flex>
      </Box>
    </div>
  );
}

export default Notification;
