import Img from "react-cool-img";
import logoImage from "../assets/images/logo-image.png";
import dummyImage from "../assets/images/dummyprofile-image.png";
import bellImage from "../assets/images/bell-image.png";
import { Colors } from "../constants/Colors";
import Button from "../components/Button";
import { buttonFontSizes } from "../constants/ButtonFontSizes";
import { FontFamily } from "../constants/FontFamily";
import { Link } from "react-router-dom";
import { Flex, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { compare } from "../helpers/CompareTime";
import { GetById } from "../helpers/GetById";
import moment from "moment";
import { useEffect, useState } from "react";
import { loadingImage } from "../constants/LoadingImage";
import { getById } from "../services/ProfileService";
function Header() {
  //State
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState({
    deviceId: "",
    email: "",
    fullname: "",
    id: "",
    password: "",
    phoneNumber: "",
    profilePicture: "",
  });

  //UseEffect
  useEffect(() => {
    (async () => {
      debugger;
      const response = await GetById(
        getById,
        JSON.parse(localStorage.getItem("nourriuser")).user.id
      );
      setUserData(response.data.data);
      setLoader(true);
    })();
  }, []);
  //Functions

  const logout = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    localStorage.removeItem("nourriuser");
    // document.querySelector(".userdropdownmenu").remove()
    navigate("/account/login");
  };

  const checkExpiryTime = () => {
    if (JSON.parse(localStorage.getItem("nourriuser"))) {
      // if (
      //   compare(
      //     moment(new Date()).format("HH:mm:ss"),
      //     moment(
      //       JSON.parse(localStorage.getItem("nourriuser")).token.expiration
      //     ).format("HH:mm:ss")
      //   ) === 1
      // ) {
      //   localStorage.removeItem("nourriuser");
      //   navigate("/account/login");
      // }
    } else {
      localStorage.removeItem("nourriuser");
      navigate("/account/login");
    }
  };

  setInterval(() => {
    checkExpiryTime();
  }, 300000);
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      h={"80px"}
      background={"#ffffff"}
      boxShadow={"0px 0px 18px #00000029"}
      p="0 40px 0 30px"
      position={"fixed"}
      w={"100%"}
      top={"0"}
      left={"0"}
      zIndex={999}
    >
      <Link to={"/"}>
        <Img
          placeholder={logoImage}
          src={logoImage}
          error={logoImage}
          alt="logo-img"
          width="125px"
          height="35px"
        />
      </Link>
      <Flex alignItems={"center"}>
        <Link to={"/notifications"}>
          <Img
            placeholder={bellImage}
            src={bellImage}
            error={bellImage}
            alt="bell-img"
            width="25px"
            height="25px"
            style={{ cursor: "pointer" }}
          />
        </Link>

        <Menu>
          <MenuButton className="menubutton" display={"flex"}>
            <Button
              fontSize={buttonFontSizes.button_header_size}
              height="40px"
              width="160px"
              maxWidth="100%"
              text={userData?.fullname ? userData.fullname : "Sam Arthur"}
              backgroundColor={Colors.button_header_color}
              color={Colors.black_color}
              borderColor={Colors.button_header_color}
              focusBorderColor={Colors.button_header_color}
              hoverBackgroundColor={Colors.white_color}
              hoverColor={Colors.black_color}
              hoverBorder={Colors.button_header_color}
              margin={"0 20px 0 50px"}
              fontFamily={FontFamily.primary_font}
              fontWeight="500"
              borderRadius="8px"
            />
            <Img
              placeholder={loadingImage}
              src={
                userData?.profilePicture ? userData.profilePicture : dummyImage
              }
              error={dummyImage}
              alt="profile-img"
              width="50px"
              height="50px"
              style={{ cursor: "pointer" }}
            />
          </MenuButton>
          <MenuList marginLeft={"55px"}>
            <Link to="/profile">
              <MenuItem
                _hover={{
                  color: Colors.white_color,
                  backgroundColor: Colors.button_primary_color,
                }}
                _focus={{
                  color: Colors.white_color,
                  backgroundColor: Colors.button_primary_color,
                }}
              >
                Your Profile
              </MenuItem>
            </Link>
            <MenuItem
              onClick={logout}
              _hover={{
                color: Colors.white_color,
                backgroundColor: Colors.button_primary_color,
              }}
              _focus={{
                color: Colors.white_color,
                backgroundColor: Colors.button_primary_color,
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
export default Header;
