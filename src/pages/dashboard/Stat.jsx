import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import Heading from "../../components/Heading";
import Img from "react-cool-img";
import { Box, Flex } from "@chakra-ui/react";

function Stat({ image, data, title }) {
  return (
    <Box marginRight={"30px"} w={"100%"} className="stats_box">
      <Flex
        boxShadow={"0 0 18px #00000014"}
        borderRadius={"6px"}
        padding={"30px 25px"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box marginRight={"10px"}>
          <Heading
            fontSize={HeadingFontSizes.heading_3}
            color={Colors.heading_primary_color}
            fontFamily={FontFamily.primary_font_black}
            fontWeight="800"
            margin="0 0 10px 0"
            text={title}
          />
          <Heading
            fontSize={HeadingFontSizes.heading_2}
            color={Colors.heading_secondary_color}
            fontFamily={FontFamily.secondary_font}
            fontWeight="700"
            margin="0 0 0 0"
            text={data}
          />
        </Box>
        <Img placeholder={image} src={image} error={image} alt="user-img" />
      </Flex>
    </Box>
  );
}

export default Stat;
