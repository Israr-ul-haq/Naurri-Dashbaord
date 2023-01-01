import { Box, Flex, Skeleton } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import userImage from "../../assets/images/dummy-profile.png";
import { BaseUrl } from "../../constants/BaseUrl";
import { useState, useEffect } from "react";
import { GetById } from "../../helpers/GetById";
import { useParams } from "react-router-dom";
import { block, getById, unBlock } from "../../services/UserService";
import DetailText from "../../components/DetailText";
import Image from "../../components/Image";
import PageTitle from "../../components/PageTitle";
function ViewUser() {
  //State
  const [data, setData] = useState({
    id: "",
    userStatusId: 0,
    userStatusTitle: "",
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    profilePicture: "",
    deviceId: "",
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
      <PageTitle title={"User"} location={window.location.href} />
      <DashboardHeading
        text={"User Management"}
        isBack={true}
        link="/users"
        isButtons={true}
        secondButtonLink={"/users/edit/" + id}
        firstButtonText={data.userStatusId === 2 ? "Block" : "Unblock"}
        secondButtonText="Edit"
        isFirstPopup={true}
        isUnblock={data.userStatusId === 2 ? false : true}
        title={data.fullname}
        service={data.userStatusId === 2 ? block : unBlock}
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
          <Flex alignItems={"flexStart"}>
            <Box h={"170px"} w={"170px"} mr={"90px"}>
              <Image
                image={data?.profilePicture ? data?.profilePicture : userImage}
              />
            </Box>
            <Flex wrap={"wrap"} width={"calc(100% - 260px)"}>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText data={data?.fullname} headingName={"Full Name"} />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText
                  data={data?.phoneNumber}
                  headingName={"Phone Number"}
                />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText data={data?.email} headingName={"Email"} />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"}>
                <DetailText data={"*****"} headingName={"Password"} />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"}>
                <DetailText
                  data={data?.userStatusTitle}
                  headingName={"Status"}
                  status={data?.userStatusId}
                />
              </Box>
            </Flex>
          </Flex>
        </Skeleton>
      </Box>
    </div>
  );
}

export default ViewUser;
