import { Heading as HeaderContainer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function Heading({
  margin = "0",
  padding = "0",
  color = "",
  lineHeight = "",
  fontWeight = "",
  text = "Enter Your Text",
  fontSize = "",
  fontFamily = "sans-serif",
  hasLink = false,
  linkText = "",
  link = "",
  hoverColor = "",

}) {
  return (
    <HeaderContainer
      m={margin}
      padding={padding}
      color={color}
      lineHeight={lineHeight}
      fontSize={fontSize}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
    >
      {text}
      

      {hasLink ? (
        <HeaderContainer
          color={color}
          lineHeight={lineHeight}
          fontSize={fontSize}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          display={"inline-block"}
          _hover={{
            color: hoverColor,
          }}
        >
          <Link to={link}>{linkText}</Link>
        </HeaderContainer>
      ) : (
        ""
      )}
    </HeaderContainer>
  );
}

export default Heading;
