import { Box, Flex } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import Img from "react-cool-img";
import uploadIconImage from "../../assets/images/upload-icon-image.svg";
import editUploadedImage from "../../assets/images/edit-uploaded-image.png";
import InputContainer from "../../components/InputContainer";
import { loadingImage } from "../../constants/LoadingImage";
import { InputImages } from "../../constants/InputImages";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import PageTitle from "../../components/PageTitle";
import useDisplayImage from "../../hooks/useDisplayImage";
import useDisplayImageSecond from "../../hooks/useDisplayImageSecond";
import { save } from "../../services/Riderservice";
import { uploadImage as uploadImageAPI } from "../../services/Generalfile";

import { InputFontSizes } from "../../constants/InputFontSizes";
import FooterButtons from "../../components/FooterButtons";
import TextArea from "../../components/TextArea";
import useDisplayImageThird from "../../hooks/useDisplayImageThird";
function AddRider() {
  //State
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [uploadImage, setUploadImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    uploadImageFirstError: false,
    uploadImageSecondError: false,
    uploadImageThirdError: false,
    paswordValidation: false,
  });
  const [uploadImageSecond, setUploadImageSecond] = useState(null);
  const [uploadImageThird, setUploadImageThird] = useState(null);
  const { result, uploader } = useDisplayImage();
  const { resultSecond, uploaderSecond } = useDisplayImageSecond();
  const { resultThird, uploaderThird } = useDisplayImageThird();
  const [btnLock, setBtnLock] = useState(false);
  const navigate = useNavigate();
  //Functions

  const submitForm = async (formData) => {
    const validationErrorsCopy = { ...validationErrors };
    let validCount = 0;
    if (uploadImage === null) {
      validationErrorsCopy.uploadImageFirstError = true;
      validCount++;
    } else {
      validationErrorsCopy.uploadImageFirstError = false;
    }

    if (uploadImageSecond === null) {
      validationErrorsCopy.uploadImageSecondError = true;
      validCount++;
    } else {
      validationErrorsCopy.uploadImageSecondError = false;
    }

    if (uploadImageThird === null) {
      validationErrorsCopy.uploadImageThirdError = true;
      validCount++;
    } else {
      validationErrorsCopy.uploadImageThirdError = false;
    }

    if (formData.ConfirmPassword !== formData.Password) {
      validationErrorsCopy.paswordValidation = true;
      validCount++;
    } else {
      validationErrorsCopy.paswordValidation = false;
    }

    setValidationErrors(validationErrorsCopy);

    if (validCount > 0) {
      return true;
    }

    setBtnLock(true);

    const body = {
      Fullname: "",
      Email: "",
      Password: "",
      PhoneNumber: "",
      ProfilePicture: "",
      RiderInfos: [
        {
          DriverLicense: "",
          VehicleLicense: "",
          Insurance: "",
        },
      ],
      VehicleInfos: [
        {
          Name: "",
          Model: "",
          Number: "",
        },
      ],
    };
    debugger;
    body.Fullname = formData.fullName;
    body.Email = formData.Email;
    body.PhoneNumber = formData.PhoneNumber;
    body.Password = formData.Password;
    body.RiderInfos[0].Insurance = formData.Insurance;
    body.VehicleInfos[0].Name = formData.Name;
    body.VehicleInfos[0].Model = formData.Model;
    body.VehicleInfos[0].Number = formData.Number;
    debugger;
    const formData1 = new FormData();
    formData1.append("profileImage", uploadImage);
    const imageResponse1 = await uploadImageAPI(formData1);
    body.ProfilePicture = imageResponse1.data.data[0].url;

    const formData2 = new FormData();
    formData2.append("driverImage", uploadImageSecond);
    const imageResponse2 = await uploadImageAPI(formData2);
    body.RiderInfos[0].DriverLicense = imageResponse2.data.data[0].url;

    const formData3 = new FormData();
    formData3.append("vehicleImage", uploadImageThird);
    const imageResponse3 = await uploadImageAPI(formData3);
    body.RiderInfos[0].VehicleLicense = imageResponse3.data.data[0].url;

    const response = await save(body);

    if (response.data.code === 1) {
      setBtnLock(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
      setTimeout(() => {
        navigate("/riders");
      }, 0);
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
    <div>
      <PageTitle title={"Rider"} location={window.location.href} />
      <DashboardHeading
        text={"Rider Management"}
        isBack={true}
        link="/riders"
      />
      <form onSubmit={handleSubmit(submitForm)}>
        <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"}>
          <Heading
            fontSize={HeadingFontSizes.heading_3}
            color={Colors.heading_primary_color}
            fontFamily={FontFamily.primary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"User Details"}
          />
          <Box display={"inline-block"} textAlign={"center"} mb={"40px"}>
            <Heading
              fontSize={HeadingFontSizes.heading_5}
              color={Colors.heading_primary_color}
              fontFamily={FontFamily.primary_font}
              fontWeight="400"
              margin="0 0 15px 0"
              text={"Upload Image"}
            />
            <Box pos={"relative"}>
              <label for="uploadImage">
                <Img
                  placeholder={loadingImage}
                  src={result ? result : uploadIconImage}
                  error={result ? result : uploadIconImage}
                  alt="upload-img"
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto",
                    "object-fit": "cover",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                />
                {result ? (
                  <Img
                    placeholder={loadingImage}
                    src={editUploadedImage}
                    error={editUploadedImage}
                    alt="upload-img"
                    style={{
                      width: "20px",
                      height: "20px",
                      "object-fit": "contain",
                      cursor: "pointer",
                      position: "absolute",
                      top: -5,
                      right: -5,
                    }}
                  />
                ) : (
                  ""
                )}
              </label>
              {validationErrors.uploadImageFirstError ? (
                <p className="error_validation">Image is Required</p>
              ) : (
                ""
              )}

              <input
                id="uploadImage"
                name="uploadImage"
                type={"file"}
                style={{
                  position: "absolute",
                  opacity: "0",
                  visibility: "hidden",
                }}
                onChange={(e) => {
                  setUploadImage(e.target.files[0]);
                  uploader(e);
                }}
              />
            </Box>
          </Box>
          <Flex wrap={"wrap"} width={"calc(100%)"} margin={"0 -15px"}>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Full Name"}
                register={register}
                registerName={"fullName"}
                backgroundImage={InputImages.user_image}
              />
              {errors.Fullname?.type === "required" && (
                <p className="error_validation">Name is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Email"}
                register={register}
                registerName={"Email"}
                backgroundImage={InputImages.user_image}
              />
              {errors.Email?.type === "required" && (
                <p className="error_validation">Email is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Phone Number"}
                register={register}
                registerName={"PhoneNumber"}
                backgroundImage={InputImages.phoneImage}
              />
              {errors.PhoneNumber?.type === "required" && (
                <p className="error_validation">Phone number is required</p>
              )}
            </Box>

            <Box maxW={"33.33%"} flex={"33.33%"} padding={"0 15px"} mb={"35px"}>
              <InputContainer
                title={"Password"}
                register={register}
                registerName={"Password"}
                backgroundImage={InputImages.lock_image}
                isPassword={true}
              />
              {errors.Password?.type === "required" && (
                <p className="error_validation">Password is required</p>
              )}
              {validationErrors.paswordValidation ? (
                <p className="error_validation">Password must be matching</p>
              ) : (
                ""
              )}
            </Box>
            <Box maxW={"33.33%"} flex={"33.33%"} padding={"0 15px"} mb={"35px"}>
              <InputContainer
                title={"Confirm Password"}
                register={register}
                registerName={"ConfirmPassword"}
                backgroundImage={InputImages.lock_image}
                isPassword={true}
              />
              {errors.ConfirmPassword?.type === "required" && (
                <p className="error_validation">Confirm password is required</p>
              )}
              {validationErrors.paswordValidation ? (
                <p className="error_validation">Password must be matching</p>
              ) : (
                ""
              )}
            </Box>
          </Flex>
        </Box>
        <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"} mt={"30px"}>
          <Heading
            fontSize={HeadingFontSizes.heading_3}
            color={Colors.heading_primary_color}
            fontFamily={FontFamily.primary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"Assign Vehicle Details"}
          />
          <Flex wrap={"wrap"} width={"calc(100%)"} margin={"0 -15px"}>
            <Box maxW={"33.33%"} flex={"33.33%"} mb={"0"} padding={"0 15px"}>
              <InputContainer
                title={"Vehicle Name"}
                register={register}
                registerName={"Name"}
                backgroundImage={InputImages.walletImage}
              />
              {errors.Name?.type === "required" && (
                <p className="error_validation">Vehicle name is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} flex={"33.33%"} mb={"0"} padding={"0 15px"}>
              <InputContainer
                title={"Vehicle Model"}
                register={register}
                registerName={"Model"}
                backgroundImage={InputImages.walletImage}
              />
              {errors.Model?.type === "required" && (
                <p className="error_validation">Model is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} flex={"33.33%"} mb={"0"} padding={"0 15px"}>
              <InputContainer
                title={"Vehicle Number"}
                register={register}
                registerName={"Number"}
                backgroundImage={InputImages.walletImage}
              />
              {errors.Number?.type === "required" && (
                <p className="error_validation">Vehicle number is required</p>
              )}
            </Box>
          </Flex>
        </Box>
        <Box
          padding={"30px 50px"}
          boxShadow={"0 0 18px #00000014"}
          mt={"30px"}
          mb="80px"
        >
          <Heading
            fontSize={HeadingFontSizes.heading_3}
            color={Colors.heading_primary_color}
            fontFamily={FontFamily.primary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"Attach Documents"}
          />
          <Flex wrap={"wrap"} width={"calc(100%)"} margin={"0 -15px"}>
            <Box maxW={"33.33%"} flex={"33.33%"} mb={"0"} padding={"0 15px"}>
              <Box display={"inline-block"} textAlign={"center"} mb={"40px"}>
                <Heading
                  fontSize={HeadingFontSizes.heading_5}
                  color={Colors.heading_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="400"
                  margin="0 0 15px 0"
                  text={"Upload Driver Lisence"}
                />
                <Box pos={"relative"}>
                  <label for="uploadImageSecond">
                    <Img
                      placeholder={loadingImage}
                      src={resultSecond ? resultSecond : uploadIconImage}
                      error={resultSecond ? resultSecond : uploadIconImage}
                      alt="upload-img"
                      style={{
                        width: "80px",
                        height: "80px",
                        margin: "0 auto",
                        "object-fit": "cover",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    />
                    {resultSecond ? (
                      <Img
                        placeholder={loadingImage}
                        src={editUploadedImage}
                        error={editUploadedImage}
                        alt="upload-img"
                        style={{
                          width: "20px",
                          height: "20px",
                          "object-fit": "contain",
                          cursor: "pointer",
                          position: "absolute",
                          top: -5,
                          right: -5,
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </label>

                  <input
                    id="uploadImageSecond"
                    name="uploadImageSecond"
                    type={"file"}
                    style={{
                      position: "absolute",
                      opacity: "0",
                      visibility: "hidden",
                    }}
                    onChange={(e) => {
                      setUploadImageSecond(e.target.files[0]);
                      uploaderSecond(e);
                    }}
                  />
                </Box>
                {validationErrors.uploadImageSecondError ? (
                  <p className="error_validation">Image is Required</p>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            <Box maxW={"33.33%"} flex={"33.33%"} mb={"0"} padding={"0 15px"}>
              <Box display={"inline-block"} textAlign={"center"} mb={"40px"}>
                <Heading
                  fontSize={HeadingFontSizes.heading_5}
                  color={Colors.heading_primary_color}
                  fontFamily={FontFamily.primary_font}
                  fontWeight="400"
                  margin="0 0 15px 0"
                  text={"Upload Vehicle Insurance"}
                />
                <Box pos={"relative"}>
                  <label for="uploadImageThird">
                    <Img
                      placeholder={loadingImage}
                      src={resultThird ? resultThird : uploadIconImage}
                      error={resultThird ? resultThird : uploadIconImage}
                      alt="upload-img"
                      style={{
                        width: "80px",
                        height: "80px",
                        margin: "0 auto",
                        "object-fit": "cover",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    />
                    {resultThird ? (
                      <Img
                        placeholder={loadingImage}
                        src={editUploadedImage}
                        error={editUploadedImage}
                        alt="upload-img"
                        style={{
                          width: "20px",
                          height: "20px",
                          "object-fit": "contain",
                          cursor: "pointer",
                          position: "absolute",
                          top: -5,
                          right: -5,
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </label>

                  <input
                    id="uploadImageThird"
                    name="uploadImageThird"
                    type={"file"}
                    style={{
                      position: "absolute",
                      opacity: "0",
                      visibility: "hidden",
                    }}
                    onChange={(e) => {
                      setUploadImageThird(e.target.files[0]);
                      uploaderThird(e);
                    }}
                  />
                </Box>
                {validationErrors.uploadImageThirdError ? (
                  <p className="error_validation">Image is Required</p>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            <Box maxW={"100%"} flex={"100%"} mb={"0"} padding={"0 15px"}>
              <Heading
                fontSize={HeadingFontSizes.heading_4}
                color={Colors.heading_primary_color}
                fontFamily={FontFamily.primary_font}
                fontWeight="800"
                margin="0 0 15px 0"
                text={"Insurance Information"}
              />
              <Flex wrap={"wrap"} width={"calc(100%)"} margin={"0 -15px"}>
                <Box maxW={"200%"} flex={"100%"} mb={"0"} padding={"0 15px"}>
                  <TextArea
                    placeholder="Enter Insurance Information"
                    margin={"0 0 0 0"}
                    fontFamily={FontFamily.primary_font}
                    fontSize={InputFontSizes.input_default_size}
                    color={Colors.input_primary_color}
                    fontWeight="500"
                    padding="30px 20px"
                    height="115px"
                    register={register}
                    registerName={"Insurance"}
                  />
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>

        <FooterButtons
          firstButtonText={"Save"}
          secondButtonText={"Cancel"}
          link={"/riders"}
          loadingText="Saving"
          isLoading={btnLock}
        />
      </form>
    </div>
  );
}

export default AddRider;
