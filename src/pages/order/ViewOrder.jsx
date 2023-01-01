import { Box, Flex, Skeleton } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import Img from "react-cool-img";
import userImage from "../../assets/images/dummy-profile.png";
import { loadingImage } from "../../constants/LoadingImage";
import FooterButtons from "../../components/FooterButtons";
import { getById } from "../../services/OrdersService";
import { GetById } from "../../helpers/GetById";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Image from "../../components/Image";
import DetailText from "../../components/DetailText";
import { getById as getdish } from "../../services/DishesService";
import { BaseUrl } from "../../constants/BaseUrl";
import moment from "moment";
function ViewOrder() {
  const [data, setData] = useState({
    id: "",
    orderNumber: 0,
    orderStatusTitle: "",
    restaurantName: "",
    userFullname: "",
    userPhoneNumber: "",
    userEmail: "",
    userProfilePicture: "",
    riderFullname: "",
    riderPhoneNumber: "",
    riderEmail: "",
    riderProfilePicture: "",
    orderInfos: [
      {
        id: "",
        orderId: "",
        dishId: 0,
        price: "",
        quantity: "",
        instructions: "",
        orderChoiceInfos: [],
      },
    ],
  });

  const [dishData, setDishData] = useState({});
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  //UseEffect
  useEffect(() => {
    (async () => {
      const response = await GetById(getById, id);
      const response1 = await GetById(
        getdish,
        response.data.data.orderInfos[0].dishId
      );
      setData(response.data.data);
      setDishData(response1.data.data);
      setLoader(true);
    })();
  }, []); //eslint-disable-line
  return (
    <div>
      <DashboardHeading
        text={"Order Management"}
        isBack={true}
        link="/orders"
      />
      <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <Heading
            fontSize={HeadingFontSizes.heading_3}
            color={Colors.heading_primary_color}
            fontFamily={FontFamily.primary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"User Details"}
          />
          <Flex alignItems={"center"}>
            <Box h={"170px"} w={"170px"} mr={"90px"}>
              <Image
                image={
                  data?.userProfilePicture
                    ? data?.userProfilePicture
                    : userImage
                }
              />
            </Box>
            <Flex wrap={"wrap"} width={"calc(100% - 260px)"}>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText
                  data={data?.userFullname}
                  headingName={"Full Name"}
                />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText
                  data={data?.userPhoneNumber}
                  headingName={"Phone Number"}
                />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText data={data?.userEmail} headingName={"Email"} />
              </Box>

              <Box maxW={"33.33%"} flex={"33.33%"}>
                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.heading_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="800"
                  margin="0 0 5px 0"
                  text={"Password"}
                />
                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.paragraph_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="400"
                  margin="0 0 0 0"
                  text={"******"}
                />
              </Box>
            </Flex>
          </Flex>
        </Skeleton>
      </Box>

      <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"} mt={30}>
        <Heading
          fontSize={HeadingFontSizes.heading_3}
          color={Colors.heading_primary_color}
          fontFamily={FontFamily.primary_font}
          fontWeight="800"
          margin="0 0 35px 0"
          text={"Order Details"}
        />
        <Skeleton isLoaded={loader}>
          <Flex alignItems={"center"}>
            <Flex wrap={"wrap"} width={"calc(100%)"}>
              <Box maxW={"25%"} flex={"25%"} mb={"55"}>
                <DetailText
                  data={data?.restaurantName}
                  headingName={"Restaurant Name"}
                />
              </Box>
              <Box maxW={"25%"} flex={"25%"} mb={"55"}>
                <DetailText data={dishData?.name} headingName={"Dish Name"} />
              </Box>
              <Box maxW={"25%"} flex={"25%"} mb={"55"}>
                <DetailText
                  data={data?.orderInfos[0].instructions}
                  headingName={"Instructions"}
                />
              </Box>
              <Box maxW={"25%"} flex={"25%"} mb={"55"}>
                <DetailText data={dishData?.price} headingName={"Price"} />
              </Box>
              <Box maxW={"25%"} flex={"25%"} mb={"55"}>
                <DetailText
                  data={data.orderInfos[0]?.quantity}
                  headingName={"Quantity"}
                />
              </Box>
              {/* <Box maxW={"25%"} flex={"25%"} mb={"55"}>
                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.heading_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="800"
                  margin="0 0 5px 0"
                  text={"Pickup Location"}
                />
                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.paragraph_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="400"
                  margin="0 0 0 0"
                  text={"227 Sector FF DHA Phase 4 Qatar"}
                />
              </Box> */}
              {/* <Box maxW={"50%"} flex={"50%"} mb={"55"}>
                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.heading_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="800"
                  margin="0 0 5px 0"
                  text={"Drop off Location"}
                />
                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.paragraph_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="400"
                  margin="0 0 0 0"
                  text={
                    "Marsa Malaz Kempinski Hotel Lower Ground Floor The Pearl, Doha, Qatar"
                  }
                />
              </Box> */}

              <Box maxW={"25%"} flex={"25%"} mb={"55"}>
                <DetailText
                  data={data?.orderNumber}
                  headingName={"Order Number"}
                />
              </Box>
              <Box maxW={"25%"} flex={"25%"} mb={"0"}>
                <DetailText
                  data={moment(data?.createdOn).format("L")}
                  headingName={"Date"}
                />
              </Box>
              <Box maxW={"25%"} flex={"25%"} mb={"0"}>
                <DetailText data={dishData?.time} headingName={"Time"} />
              </Box>
            </Flex>
          </Flex>
        </Skeleton>
      </Box>
      {data.riderFullname ? (
        <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"} mt={30}>
          <Skeleton isLoaded={loader}>
            <Heading
              fontSize={HeadingFontSizes.heading_3}
              color={Colors.heading_primary_color}
              fontFamily={FontFamily.primary_font}
              fontWeight="800"
              margin="0 0 35px 0"
              text={"Rider Details"}
            />
            <Flex alignItems={"center"}>
              <Box h={"170px"} w={"170px"} mr={"90px"}>
                <Image
                  image={
                    data?.profilePicture ? data?.riderProfilePicture : userImage
                  }
                />
              </Box>
              <Flex wrap={"wrap"} width={"calc(100% - 260px)"}>
                <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                  <DetailText
                    data={data?.riderFullname}
                    headingName={"Full Name"}
                  />
                </Box>
                <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                  <DetailText
                    data={data?.riderPhoneNumber}
                    headingName={"Phone Number"}
                  />
                </Box>
                <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                  <DetailText data={data?.riderEmail} headingName={"Email"} />
                </Box>

                <Box maxW={"33.33%"} flex={"33.33%"}>
                  <Heading
                    fontSize={HeadingFontSizes.heading_4}
                    color={Colors.heading_primary_color}
                    fontFamily={FontFamily.primary_font}
                    fontWeight="800"
                    margin="0 0 5px 0"
                    text={"Password"}
                  />
                  <Heading
                    fontSize={HeadingFontSizes.heading_4}
                    color={Colors.paragraph_primary_color}
                    fontFamily={FontFamily.primary_font}
                    fontWeight="400"
                    margin="0 0 0 0"
                    text={"******"}
                  />
                </Box>
              </Flex>
            </Flex>
          </Skeleton>
        </Box>
      ) : (
        ""
      )}

      {/* <Box
        padding={"30px 50px"}
        boxShadow={"0 0 18px #00000014"}
        mt={30}
        mb={"80px"}
      >
        <Skeleton>
          <Heading
            fontSize={HeadingFontSizes.heading_3}
            color={Colors.heading_primary_color}
            fontFamily={FontFamily.primary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"Vehicle Details"}
          />
          <Flex alignItems={"center"}>
            <Flex wrap={"wrap"} width={"calc(100%)"}>
              <Box maxW={"33.33%"} flex={"33.33%"}>
                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.heading_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="800"
                  margin="0 0 5px 0"
                  text={"Vehicle Name"}
                />
                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.paragraph_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="400"
                  margin="0 0 0 0"
                  text={"Honda"}
                />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"}>
                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.heading_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="800"
                  margin="0 0 5px 0"
                  text={"Vehicle Model"}
                />
                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.paragraph_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="400"
                  margin="0 0 0 0"
                  text={"City 2000"}
                />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"}>
                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.heading_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="800"
                  margin="0 0 5px 0"
                  text={"Vehicle Number"}
                />
                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.paragraph_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="400"
                  margin="0 0 0 0"
                  text={"ABC 857"}
                />
              </Box>
            </Flex>
          </Flex>
        </Skeleton>
      </Box> */}
      {/* <FooterButtons firstButtonText={"Accept "} secondButtonText={"Reject"} /> */}
    </div>
  );
}

export default ViewOrder;
