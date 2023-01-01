import { Box, Flex, Skeleton } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import userImage from "../../assets/images/dummyprofile-image.png";
import FooterButtons from "../../components/FooterButtons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { GetById } from "../../helpers/GetById";
import { Accept, getById, Reject } from "../../services/RestaurantService";
import Image from "../../components/Image";
import DetailText from "../../components/DetailText";
import Ratings from "react-ratings-declarative";
function ViewRestaurant() {
  //State
  const [data, setData] = useState({
    id: 5,
    userId: "3ee7d5c6-e41a-445f-ac85-bf5ea83d75f0",
    name: "ABC",
    email: "abc@gmail.com",
    phoneNumber: "1234",
    address: "Peco Road",
    lat: 3.11,
    lng: 1.44,
    image: "abc",
    user: {
      id: "3ee7d5c6-e41a-445f-ac85-bf5ea83d75f0",
      fullname: "MazharKhan2212432121233",
      email: "kmazhar67812131243232@gmail.com",
      phoneNumber: "1234",
      password: null,
      profilePicture: "/Files/Profile/737385.jpg",
      deviceId: "123",
    },
    restaurantBankInfos: [
      {
        id: 5,
        restaurantId: 5,
        bankName: "Abc",
        bankAccount: "123",
      },
    ],
    restaurantRatings: [],
  });
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  //UseEffect
  useEffect(() => {
    (async () => {
      const response = await GetById(getById, id);
      debugger;
      setData(response.data.data);
      setLoader(true);
    })();
  }, []); //eslint-disable-line
  return (
    <div>
      <DashboardHeading
        text={"Restaurant Management"}
        isBack={true}
        link="/restaurants"
        // firstButtonText="Choices Group"
        secondButtonText="Edit"
        ThirdButtonText="Manage Dishes"
        isThreeButtons={true}
        // firstButtonLink={"/choices/" + data.id}
        thirdButtonLink={"/dishes/" + data.id}
        secondButtonLink={"/restaurants/edit/" + id}
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
                  data.user.profilePicture
                    ? data?.user.profilePicture
                    : userImage
                }
              />
            </Box>
            <Flex wrap={"wrap"} width={"calc(100% - 260px)"}>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText
                  data={data?.user.fullname}
                  headingName={"Full Name"}
                />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText
                  data={data?.user.phoneNumber}
                  headingName={"Phone Number"}
                />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText data={data.user.email} headingName={"Email"} />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"}>
                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.heading_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="800"
                  margin="0 0 5px 0"
                  text={"CNIC"}
                />

                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.paragraph_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="400"
                  margin="0 0 0 0"
                  text={"96410-320711-13"}
                />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"}>
                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.heading_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="800"
                  margin="0 0 5px 0"
                  text={"Date of Birth"}
                />
                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.paragraph_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="400"
                  margin="0 0 0 0"
                  text={"09-2-2000"}
                />
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
      <Box
        padding={"30px 50px"}
        boxShadow={"0 0 18px #00000014"}
        mt={"30px"}
        mb="80px"
      >
        <Skeleton isLoaded={loader}>
          <Heading
            fontSize={HeadingFontSizes.heading_3}
            color={Colors.heading_primary_color}
            fontFamily={FontFamily.primary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"Restaurant Details"}
          />
          <Box h={"160"} w={"280px"} mb={"70px"}>
            <Image image={data?.image ? data?.image : userImage} />
          </Box>
          <Flex alignItems={"center"}>
            <Flex wrap={"wrap"} width={"calc(100%)"}>
              <Box maxW={"25%"} flex={"25%"} mb={"55px"}>
                <DetailText data={data?.name} headingName={"Restaurant Name"} />
              </Box>
              <Box maxW={"25%"} flex={"25%"} mb={"55px"}>
                <DetailText
                  data={data?.phoneNumber}
                  headingName={"Phone Number"}
                />
              </Box>
              <Box maxW={"25%"} flex={"25%"} mb={"55px"}>
                <DetailText data={data?.email} headingName={"Email"} />
              </Box>
              <Box maxW={"25%"} flex={"25%"} mb={"55px"}>
                <DetailText data={data?.address} headingName={"Address"} />
              </Box>

              <Box maxW={"25%"} flex={"25%"}>
                <DetailText
                  data={data?.restaurantRatings[0]?.score}
                  headingName={"Ratings"}
                />

                <Ratings
                  rating={data?.restaurantRatings[0]?.score}
                  widgetRatedColors="#FFC107"
                  widgetDimensions="18px"
                  widgetSpacings="5px"
                >
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings>
              </Box>
            </Flex>
          </Flex>
        </Skeleton>
      </Box>
      <FooterButtons
        firstButtonText={"Accept"}
        secondButtonText={"Reject"}
        isRestaurant={true}
        id={id}
        acceptService={Accept}
        rejectedService={Reject}
        title={data.name}
        navigate={navigate}
      />
    </div>
  );
}

export default ViewRestaurant;
