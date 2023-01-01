import { Flex } from "@chakra-ui/react";
import Heading from "../components/Heading";
import { HeadingFontSizes } from "../constants/HeadingFontSizes";
import { Colors } from "../constants/Colors";
import { FontFamily } from "../constants/FontFamily";
import Button from "../components/Button";
import { buttonFontSizes } from "../constants/ButtonFontSizes";
import Img from "react-cool-img";
import arrowBack from "../assets/images/arrow-back-image.png";
import { Link, useParams } from "react-router-dom";
import { loadingImage } from "../constants/LoadingImage";
import MakePayment from "../helpers/RiderFinancePopup";
import Unblock from "../helpers/Unblock";
import Block from "../helpers/Block";
import { useState } from "react";
import { useNavigate } from "react-router";
function DashboardHeading({
  text,
  firstButtonText = "",
  secondButtonText = "",
  ThirdButtonText = "",
  isButtons = false,
  isBack = false,
  link = "",
  isSingle = false,
  secondButtonLink = "",
  firstButtonLink = "",
  thirdButtonLink = "",
  isThreeButtons = false,
  isPayment = false,
  isTwoButtonLinks = false,
  isFirstPopup = false,
  isUnblock = false,
  service,
  title,
  riderId,
  
  Loader,
}) {
  //State
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Flex
      borderBottom={"1px solid #70707082"}
      paddingBottom={"25px"}
      marginBottom={"35px"}
      justifyContent={"space-between"}
    >
      <Flex alignItems={"center"}>
        {link ? (
          <>
            <Link to={link} style={{ display: "flex", alignItems: "center" }}>
              {isBack ? (
                <Img
                  placeholder={loadingImage}
                  src={arrowBack}
                  error={arrowBack}
                  alt="arrowback-img"
                  style={{
                    marginRight: "30px",
                    width: "20px",
                    height: "20px",
                    "object-fit": "contain",
                  }}
                />
              ) : (
                ""
              )}
              <Heading
                fontSize={HeadingFontSizes.heading_2}
                color={Colors.heading_primary_color}
                fontFamily={FontFamily.primary_font_black}
                fontWeight="800"
                margin="0 0 0px 0"
                text={text}
              />
            </Link>
          </>
        ) : (
          <>
            {isBack ? (
              <Img
                placeholder={arrowBack}
                src={arrowBack}
                error={arrowBack}
                alt="arrowback-img"
                style={{
                  marginRight: "30px",
                  width: "20px",
                  height: "20px",
                  "object-fit": "contain",
                }}
              />
            ) : (
              ""
            )}
            <Heading
              fontSize={HeadingFontSizes.heading_2}
              color={Colors.heading_primary_color}
              fontFamily={FontFamily.primary_font_black}
              fontWeight="800"
              margin="0 0 0px 0"
              text={text}
            />
          </>
        )}
      </Flex>

      {isThreeButtons ? (
        <Flex alignItems={"center"}>
          <Link to={thirdButtonLink}>
            <Button
              margin="0 15px 0 0px"
              height="50"
              width="175px"
              maxWidth="175px"
              text={ThirdButtonText}
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
          <Link to={firstButtonLink}>
            {/* <Button
              height="50"
              width="175px"
              maxWidth="175px"
              text={firstButtonText}
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
            /> */}
          </Link>
          <Link to={secondButtonLink}>
            <Button
              margin="0 0 0 15px"
              height="50"
              width="175px"
              maxWidth="175px"
              text={secondButtonText}
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
            />
          </Link>
        </Flex>
      ) : (
        ""
      )}

      {isPayment ? (
        <Button
          margin="0 0 0 15px"
          height="50"
          width="175px"
          maxWidth="175px"
          text={secondButtonText}
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
          onClick={() => MakePayment(riderId, service, Loader)}
        />
      ) : (
        ""
      )}

      {isButtons ? (
        isSingle ? (
          <Flex alignItems={"center"}>
            <Link to={secondButtonLink}>
              <Button
                margin="0 0 0 15px"
                height="50"
                width="175px"
                maxWidth="175px"
                text={secondButtonText}
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
              />
            </Link>
          </Flex>
        ) : isFirstPopup ? (
          <Flex alignItems={"center"}>
            <Link to={firstButtonLink}>
              <Button
                height="50"
                width="175px"
                maxWidth="175px"
                text={firstButtonText}
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
                  isUnblock
                    ? Unblock(id, service, title, setLoader, navigate)
                    : Block(id, service, title, setLoader, navigate)
                }
                isLoading={loader}
                loadingText={isUnblock ? "unblocking" : "blocking"}
              />
            </Link>
            <Link to={secondButtonLink}>
              <Button
                margin="0 0 0 15px"
                height="50"
                width="175px"
                maxWidth="175px"
                text={secondButtonText}
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
              />
            </Link>
          </Flex>
        ) : isTwoButtonLinks ? (
          <Flex alignItems={"center"}>
            <Link to={firstButtonLink}>
              <Button
                height="50"
                width="175px"
                maxWidth="175px"
                text={firstButtonText}
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
            <Link to={secondButtonLink}>
              <Button
                margin="0 0 0 15px"
                height="50"
                width="175px"
                maxWidth="175px"
                text={secondButtonText}
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
              />
            </Link>
          </Flex>
        ) : (
          <Flex alignItems={"center"}>
            <Button
              height="50"
              width="175px"
              maxWidth="175px"
              text={firstButtonText}
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
            <Link to={"/user/edit/" + id}>
              <Button
                margin="0 0 0 15px"
                height="50"
                width="175px"
                maxWidth="175px"
                text={secondButtonText}
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
              />
            </Link>
          </Flex>
        )
      ) : (
        ""
      )}
    </Flex>
  );
}

export default DashboardHeading;
