import { Box, Flex, Skeleton } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";

import userImage from "../../assets/images/dummyprofile-image.png";

import { getById } from "../../services/Riderservice";
import { GetById } from "../../helpers/GetById";
import FooterButtons from "../../components/FooterButtons";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { useState, useEffect } from "react";
import Image from "../../components/Image";
import DetailText from "../../components/DetailText";
function ViewRider() {
  const [data, setData] = useState({
    riderInfos: [
      {
        driverLicense: "",
        vehicleLicense: "",
        insurance: "",
      },
    ],
    vehicleInfos: [
      {
        name: "",
        model: "",
        number: "",
      },
    ],
    fullname: "",
    email: "",
    phoneNumber: "",
    password: null,
    profilePicture: "",
  });
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  //UseEffect
  useEffect(() => {
    (async () => {
      const response = await GetById(getById, id);
      setData(response.data.data);
      setLoader(true);
    })();
  }, []); //eslint-disable-line
  return (
    <div>
      <PageTitle title={"Rider"} location={window.location.href} />
      <DashboardHeading
        text={"Rider Management"}
        isSingle={true}
        isButtons={true}
        secondButtonText="Edit "
        secondButtonLink={"/riders/edit/" + id}
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
                image={data.profilePicture ? data.profilePicture : userImage}
              />
            </Box>
            <Flex wrap={"wrap"} width={"calc(100% - 260px)"}>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText data={data.fullname} headingName={"Full Name"} />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText
                  data={data.phoneNumber}
                  headingName={"Phone Number"}
                />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText data={data.email} headingName={"Email"} />
              </Box>

              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText data={"*****"} headingName={"Password"} />
              </Box>
              {/* <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <Heading
                  fontSize={HeadingFontSizes.heading_4}
                  color={Colors.heading_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="800"
                  margin="0 0 5px 0"
                  text={"Ratings"}
                />
                <Flex>
                <DetailText
                  data={data.rating}
                  headingName={"Ratings"}
                />
                  <Img
                    placeholder={loadingImage}
                    src={starImage}
                    error={starImage}
                    alt="star-img"
                    style={{
                      width: "17px",
                      height: "17px",
                      "object-fit": "cover",
                      marginLeft: "10px",
                      marginTop: "2px",
                    }}
                  />
                </Flex>
              </Box> */}
            </Flex>
          </Flex>
        </Skeleton>
      </Box>
      <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"} mt={30}>
        <Skeleton isLoaded={loader}>
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
                <DetailText
                  data={data.vehicleInfos[0].name}
                  headingName={"Vehicle Name"}
                />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"}>
                <DetailText
                  data={data.vehicleInfos[0].model}
                  headingName={"Vehicle Model"}
                />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"}>
                <DetailText
                  data={data.vehicleInfos[0].number}
                  headingName={"Vehicle Number"}
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
            text={"Attach Documents"}
          />
          <Flex flexDirection={"column"}>
            <Flex wrap={"nowrap"} width={"calc(100%)"} mb="40px">
              <Box w={220} h={140}>
                <Image
                  image={
                    data.riderInfos[0].driverLicense
                      ? data.riderInfos[0].driverLicense
                      : userImage
                  }
                />
              </Box>
              <Box w={220} h={140}>
                <Image
                  image={
                    data.riderInfos[0].vehicleLicense
                      ? data.riderInfos[0].vehicleLicense
                      : userImage
                  }
                />
              </Box>
            </Flex>
            <Box>
              <DetailText
                data={data.riderInfos[0].insurance}
                headingName={"Insurance Information"}
              />
            </Box>
          </Flex>
        </Skeleton>
      </Box>
      {/* <FooterButtons
        // firstButtonText={"Assign Order"}
        secondButtonText={"Cancel"}
        link={"/riders"}
      /> */}
    </div>
  );
}

export default ViewRider;
