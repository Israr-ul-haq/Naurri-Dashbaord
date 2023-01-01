import { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Input from "../../components/Input";
import Img from "react-cool-img";
import Heading from "../../components/Heading";
import loginImage from "../../assets/images/login-image.png";
import loginBackgroundImage from "../../assets/images/login-background-image.png";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import { InputImages } from "../../constants/InputImages";
import { InputFontSizes } from "../../constants/InputFontSizes";
import Button from "../../components/Button";
import { buttonFontSizes } from "../../constants/ButtonFontSizes";
import { loadingImage } from "../../constants/LoadingImage";
import { forgotPassword as forgotAPI } from "../../services/Authservice";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loader from "../../helpers/Loader";
import { useForm } from "react-hook-form";
function ForgotPassword() {
  //State
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [loader, setloader] = useState(true);
  const [btnLock, setBtnLock] = useState(false);
  const navigate = useNavigate();
  // //UseEffect
  useEffect(() => {
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    if (JSON.parse(localStorage.getItem("nourriuser"))) {
      navigate("/");
    } else {
      setloader(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //Functions
  const loginSubmit = async (formData) => {
    setBtnLock(true);
    const response = await forgotAPI(formData.Email);
    if (response.data.code === 1) {
      setBtnLock(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Email Sent!",
        showConfirmButton: true,
        timer: 5000,
      });
      navigate("/account/login");
    }

    if (response.data.code === 0) {
      setBtnLock(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
    }
  };
  return (
    <>
      {loader ? (
        Loader
      ) : (
        <Box
          bgImage={loginBackgroundImage}
          bgPos={"left"}
          bgSize={"contain"}
          bgRepeat={"no-repeat"}
          w="100%"
          h="100vh"
          overflow="hidden"
        >
          <Flex
            p={"0 20px"}
            w="100%"
            h="100%"
            maxW="960px"
            m="0 auto"
            alignItems="center"
          >
            <Flex
              borderRadius={"10px"}
              bgColor={"white"}
              boxShadow="0 0 18px 0 #00000014"
              w="100%"
              alignItems="center"
            >
              <Box w="50%" p="0 60px">
                <Heading
                  fontSize={HeadingFontSizes.heading_1}
                  color={Colors.heading_primary_color}
                  fontFamily={FontFamily.primary_font_black}
                  fontWeight="800"
                  margin="0 0 0px 0"
                  text="Forgot Password"
                />

                <Heading
                  fontSize={HeadingFontSizes.heading_5}
                  color={Colors.paragraph_primary_color}
                  fontFamily={FontFamily.secondary_font}
                  fontWeight="400"
                  margin="0 0 25px 0"
                  text="Please Enter Email To Reset the Password"
                />
                <form onSubmit={handleSubmit(loginSubmit)}>
                  <Box mb={"10px"}>
                    <Input
                      placeholder="Email"
                      hasBackgroundImage={true}
                      backgroundImage={InputImages.user_image}
                      margin={"0 0 0 0"}
                      fontFamily={FontFamily.secondary_font}
                      fontSize={InputFontSizes.input_default_size}
                      color={Colors.input_primary_color}
                      fontWeight="500"
                      register={register}
                      registerName={"Email"}
                    />
                    {errors.Email?.type === "required" && (
                      <p className="error_validation">Email is Required</p>
                    )}
                  </Box>

                  <Heading
                    fontSize={HeadingFontSizes.heading_5}
                    color={Colors.heading_primary_color}
                    fontFamily={FontFamily.secondary_font}
                    fontWeight="400"
                    margin="0 0 60px 0"
                    text="Already have an account?  "
                    hasLink={true}
                    link="/account/login"
                    linkText="Login"
                    hoverColor="red"
                  />

                  <Button
                    height="50"
                    width="100%"
                    maxWidth="100%"
                    text="Submit"
                    backgroundColor={Colors.button_primary_color}
                    color={Colors.white_color}
                    borderColor={Colors.button_primary_color}
                    focusBorderColor={Colors.button_primary_color}
                    hoverBackgroundColor={Colors.white_color}
                    hoverColor={Colors.button_primary_color}
                    hoverBorder={Colors.button_primary_color}
                    fontWeight="500"
                    fontSize={buttonFontSizes.button_primary_size}
                    fontFamily={FontFamily.primary_font_medium}
                    borderRadius="8px"
                    loadingText="Please Wait"
                    isLoading={btnLock}
                    onClick={handleSubmit}
                    type={"submit"}
                  />
                </form>
              </Box>
              <Box w="50%">
                <Img
                  placeholder={loadingImage}
                  src={loginImage}
                  error={loginImage}
                  alt="login-img"
                  width="100%"
                  height="100%"
                />
              </Box>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default ForgotPassword;
