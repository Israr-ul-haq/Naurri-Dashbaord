import { Box, Flex } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import Img from "react-cool-img";
import { loadingImage } from "../../constants/LoadingImage";
import FooterButtons from "../../components/FooterButtons";
import InputContainer from "../../components/InputContainer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import editUploadedImage from "../../assets/images/edit-uploaded-image.png";
import {
  uploadImage as uploadImageAPI,
  save,
} from "../../services/RestaurantService";
import { InputImages } from "../../constants/InputImages";
import useDisplayImage from "../../hooks/useDisplayImage";
import useDisplayImageSecond from "../../hooks/useDisplayImageSecond";
import Swal from "sweetalert2";
import PageTitle from "../../components/PageTitle";
import uploadIconImage from "../../assets/images/upload-icon-image.svg";

function AddRestaurant() {
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
    paswordValidation: false,
  });
  const [uploadImageSecond, setUploadImageSecond] = useState(null);
  const { result, uploader } = useDisplayImage();
  const { resultSecond, uploaderSecond } = useDisplayImageSecond();
  const [btnLock, setBtnLock] = useState(false);
  const navigate = useNavigate();
  //Functions

  const submitForm = async (formData) => {
    debugger;
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
      UserInfos: [
        {
          NationalId: "",
          DateOfBirth: "",
        },
      ],
      Restaurants: [
        {
          Name: "",
          Email: "",
          PhoneNumber: "",
          Address: "",
          Lat: "",
          Lng: "",
          Image: "",
          RestaurantBankInfos: [
            {
              BankName: "",
              BankAccount: "",
            },
          ],
        },
      ],
    };
    body.Fullname = formData.Fullname;
    body.Email = formData.Email;
    body.PhoneNumber = formData.PhoneNumber;
    body.UserInfos[0].NationalId = formData.NationalId;
    body.UserInfos[0].DateOfBirth = formData.DateOfBirth;
    body.Password = formData.Password;
    body.Restaurants[0].Name = formData.RestaurantName;
    body.Restaurants[0].Email = formData.RestaurantEmail;
    body.Restaurants[0].PhoneNumber = formData.RestaurantPhoneNumber;
    body.Restaurants[0].Address = formData.RestaurantAddress;
    body.Restaurants[0].RestaurantBankInfos[0].BankName = formData.BankName;
    body.Restaurants[0].RestaurantBankInfos[0].BankAccount =
      formData.BankAccount;
    body.Restaurants[0].Lat = 23323;
    body.Restaurants[0].Lng = 23322323;
    debugger;
    const formData1 = new FormData();
    formData1.append("profileImage", uploadImage);
    const imageResponse1 = await uploadImageAPI(formData1);
    body.Restaurants[0].Image = imageResponse1.data.data[0].url;

    const formData2 = new FormData();
    formData2.append("restaurantImage", uploadImageSecond);
    const imageResponse2 = await uploadImageAPI(formData2);
    body.ProfilePicture = imageResponse2.data.data[0].url;

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
        navigate("/restaurants");
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
      <PageTitle title={"Restaurant"} location={window.location.href} />
      <DashboardHeading
        text={"Restaurant Management"}
        isBack={true}
        link="/restaurants"
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
                registerName={"Fullname"}
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
                title={"CNIC"}
                register={register}
                registerName={"NationalId"}
                backgroundImage={InputImages.user_image}
              />
              {errors.NationalId?.type === "required" && (
                <p className="error_validation">CNIC is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                type={"date"}
                title={"Date of Birth"}
                register={register}
                registerName={"DateOfBirth"}
                backgroundImage={InputImages.user_image}
              />
              {errors.DateOfBirth?.type === "required" && (
                <p className="error_validation">Date of birth is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} flex={"33.33%"} padding={"0 15px"}>
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
            <Box maxW={"33.33%"} flex={"33.33%"} padding={"0 15px"}>
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
        <Box padding={"30px 50px"} mt={"30px"} boxShadow={"0 0 18px #00000014"}>
          <Heading
            fontSize={HeadingFontSizes.heading_3}
            color={Colors.heading_primary_color}
            fontFamily={FontFamily.primary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"Restaurant  Details"}
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
            {validationErrors.uploadImageFirstError ? (
              <p className="error_validation">Image is Required</p>
            ) : (
              ""
            )}
          </Box>
          <Flex wrap={"wrap"} width={"calc(100%)"} margin={"0 -15px"}>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Name"}
                register={register}
                registerName={"RestaurantName"}
                backgroundImage={InputImages.user_image}
              />
              {errors.RestaurantName?.type === "required" && (
                <p className="error_validation">Restaurant Name is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Email"}
                register={register}
                registerName={"RestaurantEmail"}
                backgroundImage={InputImages.user_image}
              />
              {errors.RestaurantEmail?.type === "required" && (
                <p className="error_validation">Restaurant Email is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Phone Number"}
                register={register}
                registerName={"RestaurantPhoneNumber"}
                backgroundImage={InputImages.phoneImage}
              />
              {errors.RestaurantPhoneNumber?.type === "required" && (
                <p className="error_validation">
                  Restaurant Phone Number is required
                </p>
              )}
            </Box>
            <Box maxW={"33.33%"} flex={"33.33%"} padding={"0 15px"} mb={"35px"}>
              <InputContainer
                title={"Address"}
                register={register}
                registerName={"RestaurantAddress"}
                backgroundImage={InputImages.addressImage}
              />
              {errors.RestaurantAddress?.type === "required" && (
                <p className="error_validation">
                  Restaurant Address is required
                </p>
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
            text={"Accounts"}
          />
          <Flex wrap={"wrap"} width={"calc(100%)"} margin={"0 -15px"}>
            <Box maxW={"33.33%"} flex={"33.33%"} mb={"0"} padding={"0 15px"}>
              <InputContainer
                title={"Bank Name"}
                register={register}
                registerName={"BankName"}
                backgroundImage={InputImages.bank}
              />
              {errors.BankName?.type === "required" && (
                <p className="error_validation">Bank Name is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} flex={"33.33%"} mb={"0"} padding={"0 15px"}>
              <InputContainer
                title={"Bank Account #"}
                register={register}
                registerName={"BankAccount"}
                backgroundImage={InputImages.walletImage}
              />
              {errors.BankAccount?.type === "required" && (
                <p className="error_validation">Bank Account is required</p>
              )}
            </Box>
          </Flex>
        </Box>
        <FooterButtons
          firstButtonText={"Save"}
          secondButtonText={"Cancel"}
          link={"/restaurants"}
          loadingText="Updating"
          isLoading={btnLock}
        />
      </form>
    </div>
  );
}

export default AddRestaurant;
