import { Box, Flex } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import userImage from "../../assets/images/dummy-profile.png";
import { useState, useEffect } from "react";
import { GetById } from "../../helpers/GetById";
import Image from "../../components/Image";
import DetailText from "../../components/DetailText";
import { getById } from "../../services/ProfileService";
function Profile() {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    (async () => {
      debugger
      const response = await GetById(
        getById,
        JSON.parse(localStorage.getItem("nourriuser")).user.id
      );
      setData(response.data.data);
      setLoader(true);
    })();
  }, []);
  return (
    <div>
      <DashboardHeading
        text={"Profile"}
        isSingle={true}
        isButtons={true}
        secondButtonText="Edit"
        secondButtonLink={"/EditProfile"}
      />
      <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"}>
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
            <Box maxW={"33.33%"} flex={"33.33%"}>
              <DetailText data={data.fullname} headingName={"Full Name"} />
            </Box>
            <Box maxW={"33.33%"} flex={"33.33%"}>
              <DetailText
                data={data.phoneNumber}
                headingName={"Phone Number"}
              />
            </Box>
            <Box maxW={"33.33%"} flex={"33.33%"}>
              <DetailText data={data.email} headingName={"Email"} />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
}

export default Profile;
