import { Box, Flex } from "@chakra-ui/react";
import Img from "react-cool-img";
import notFoundImage from "../../assets/images/notfound-image.svg";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import Button from "../../components/Button";
import { buttonFontSizes } from "../../constants/ButtonFontSizes";
import Heading from "../../components/Heading";
import { Link } from "react-router-dom";
import { loadingImage } from "../../constants/LoadingImage";
function NotFound() {
  return (
    <Flex
      p={"0 20px"}
      w="100%"
      maxW="1250px"
      m="0 auto"
      alignItems="center"
      h="100vh"
      overflow="hidden"
    >
      <Box w="50%" p="0 145px 0 0">
        <Heading
          fontSize={HeadingFontSizes.heading_1}
          color={Colors.heading_primary_color}
          fontFamily={FontFamily.primary_font_black}
          fontWeight="800"
          margin="0 0 10px 0"
          text="Oops.. Looks like you’ve found a dead end.."
        />
        <Heading
          fontSize={HeadingFontSizes.heading_2}
          color={Colors.notfound_secondary_color}
          fontFamily={FontFamily.secondary_font}
          fontWeight="400"
          margin="0 0 35px 0"
          text="The page you were looking for doesn't exist."
        />
        <Link to="/">
          <Button
            height="50"
            width="100%"
            maxWidth="250px"
            text="Go To Homepage"
            backgroundColor={Colors.button_primary_color}
            color={Colors.white_color}
            borderColor={Colors.button_primary_color}
            focusBorderColor={Colors.button_primary_color}
            hoverBackgroundColor={Colors.white_color}
            hoverColor={Colors.button_primary_color}
            hoverBorder={Colors.button_primary_color}
            fontWeight="500"
            fontSize={buttonFontSizes.button_primary_size}
            fontFamily={FontFamily.primary_font_medium}
            borderRadius="8px"
          />
        </Link>
      </Box>
      <Box w="50%">
        <Img
          placeholder={loadingImage}
          src={notFoundImage}
          error={notFoundImage}
          alt="notfound-img"
          style={{
            width: "100%",
            height: "100%",
            "object-fit": "contain",
          }}
        />
      </Box>
    </Flex>
  );
}

export default NotFound;
