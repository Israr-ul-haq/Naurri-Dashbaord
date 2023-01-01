import React from "react";
import { Button as ButtonContainer } from "@chakra-ui/react";
function Button({
  fontFamily = "sans-serif",
  fontSize = "",
  backgroundColor = "",
  borderColor = "",
  text = "Enter Button Text",
  fontWeight = "",
  width = "",
  height = "",
  maxWidth = "",
  color = "",
  hoverBackgroundColor = "",
  hoverColor = "",
  focusBorderColor = "",
  hoverBorder = "",
  activeBackgroundColor = "",
  margin = "0",
  borderRadius = "",
  border = "",
  onClick,
  textDecoration = "none",
  isLoading = false,
  loadingText = "Submitting",
  type = "",
}) {
  return (
    <ButtonContainer
      type={type}
      m={margin}
      fontSize={fontSize}
      fontWeight={fontWeight}
      border={border}
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      w={width}
      color={color}
      _focus={{ borderColor: focusBorderColor }}
      _hover={{
        bg: hoverBackgroundColor,
        color: hoverColor,
        border: "2px solid" + hoverBorder,
        textDecoration: textDecoration,
      }}
      maxW={maxWidth}
      height={height}
      _active={{ bg: activeBackgroundColor }}
      fontFamily={fontFamily}
      borderRadius={borderRadius}
      onClick={onClick}
      textDecoration={textDecoration}
      isLoading={isLoading}
      loadingText={loadingText}
    >
      {text}
    </ButtonContainer>
  );
}

export default Button;
