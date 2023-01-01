import { Flex } from "@chakra-ui/react";
import { Colors } from "../constants/Colors";
import { FontFamily } from "../constants/FontFamily";
import Button from "../components/Button";
import { buttonFontSizes } from "../constants/ButtonFontSizes";
import { Link } from "react-router-dom";
import Accept from "../helpers/Accept";
import Reject from "../helpers/Reject";
import { useState } from "react";
function FooterButtons({
  firstButtonText,
  secondButtonText,
  link = "/",
  isLoading,
  loadingText,
  isRestaurant = false,
  id,
  acceptService,
  rejectedService,
  title,
  navigate,
  query
}) {
  //State
  const [rejectLoader, setRejectLoader] = useState(false);
  const [acceptLoader, setAcceptLoader] = useState(false);
  return (
    <>
      {isRestaurant ? (
        <Flex alignItems={"center"}>
          <Button
            height="50"
            width="145px"
            maxWidth="175px"
            text={firstButtonText}
            backgroundColor={Colors.button_primary_color}
            color={Colors.white_color}
            borderColor={Colors.button_primary_color}
            focusBorderColor={Colors.button_primary_color}
            hoverBackgroundColor={Colors.white_color}
            hoverColor={Colors.button_primary_color}
            hoverBorder={Colors.button_primary_color}
            fontWeight="400"
            fontSize={buttonFontSizes.button_datatable_header_size}
            fontFamily={FontFamily.primary_font_medium}
            borderRadius="8px"
            border="1px solid"
            isLoading={acceptLoader}
            loadingText={"Accepting"}
            onClick={() =>
              Accept(id, acceptService, title, setAcceptLoader, navigate)
            }
          />
          <Button
            margin="0 0 0 15px"
            height="50"
            width="145px"
            maxWidth="175px"
            text={secondButtonText}
            backgroundColor={Colors.white_color}
            color={Colors.button_primary_color}
            borderColor={Colors.button_primary_color}
            focusBorderColor={Colors.button_primary_color}
            hoverBackgroundColor={Colors.button_primary_color}
            hoverColor={Colors.white_color}
            hoverBorder={Colors.button_primary_color}
            fontWeight="400"
            fontSize={buttonFontSizes.button_datatable_header_size}
            fontFamily={FontFamily.primary_font_medium}
            borderRadius="8px"
            border="2px solid"
            onClick={() =>
              Reject(id, rejectedService, title, setRejectLoader, navigate)
            }
            isLoading={rejectLoader}
            loadingText={"Rejecting"}
          />
        </Flex>
      ) : (
        <Flex alignItems={"center"}>
          <Button
            height="50"
            width="145px"
            maxWidth="175px"
            text={firstButtonText}
            backgroundColor={Colors.button_primary_color}
            color={Colors.white_color}
            borderColor={Colors.button_primary_color}
            focusBorderColor={Colors.button_primary_color}
            hoverBackgroundColor={Colors.white_color}
            hoverColor={Colors.button_primary_color}
            hoverBorder={Colors.button_primary_color}
            fontWeight="400"
            fontSize={buttonFontSizes.button_datatable_header_size}
            fontFamily={FontFamily.primary_font_medium}
            borderRadius="8px"
            border="1px solid"
            isLoading={isLoading}
            loadingText={loadingText}
          />
          <Link to={link}>
            <Button
              margin="0 0 0 15px"
              height="50"
              width="145px"
              maxWidth="175px"
              text={secondButtonText}
              backgroundColor={Colors.white_color}
              color={Colors.button_primary_color}
              borderColor={Colors.button_primary_color}
              focusBorderColor={Colors.button_primary_color}
              hoverBackgroundColor={Colors.button_primary_color}
              hoverColor={Colors.white_color}
              hoverBorder={Colors.button_primary_color}
              fontWeight="400"
              fontSize={buttonFontSizes.button_datatable_header_size}
              fontFamily={FontFamily.primary_font_medium}
              borderRadius="8px"
              border="2px solid"
            />
          </Link>
        </Flex>
      )}
    </>
  );
}

export default FooterButtons;
