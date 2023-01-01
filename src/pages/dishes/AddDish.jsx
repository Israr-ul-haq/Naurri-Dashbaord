import { Box, Flex } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import Img from "react-cool-img";
import uploadIconImage from "../../assets/images/upload-icon-image.svg";
import { loadingImage } from "../../constants/LoadingImage";
import { useParams } from "react-router";
import { InputImages } from "../../constants/InputImages";
import { InputFontSizes } from "../../constants/InputFontSizes";
import FooterButtons from "../../components/FooterButtons";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useDisplayImage from "../../hooks/useDisplayImage";
import editUploadedImage from "../../assets/images/edit-uploaded-image.png";
import Swal from "sweetalert2";
import { save } from "../../services/DishesService";
import { uploadImage as uploadImageAPI } from "../../services/Generalfile";
import InputContainer from "../../components/InputContainer";
import { getCategories, getChoiceGroups } from "../../services/DishesService";
import Select1 from "../../components/Select1";
import Select2 from "../../components/Select2";
function AddDish() {
  // STATES

  //#region ABC
  const [uploadImage, setUploadImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    uploadImageFirstError: false,
    uploadImageSecondError: false,
    paswordValidation: false,
  });
  const { result, uploader } = useDisplayImage();
  const [data, setData] = useState({
    CategoryId: "",
    ChoiceGroupId: "",
  });
  const [btnLock, setBtnLock] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [choicesGroupData, setChoicesGroupData] = useState([]);

  const [loader, setLoader] = useState(false);
  //#endregion

  // GLOBAL
  const { RestaurantId } = useParams();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // METHODS

  const submitForm = async (formData) => {
    const validationErrorsCopy = { ...validationErrors };
    let validCount = 0;
    if (uploadImage === null) {
      validationErrorsCopy.uploadImageFirstError = true;
      validCount++;
    } else {
      validationErrorsCopy.uploadImageFirstError = false;
    }

    setValidationErrors(validationErrorsCopy);

    if (validCount > 0) {
      return true;
    }

    setBtnLock(true);

    const body = {
      RestaurantId: 0,
      CategoryId: 0,
      Name: "",
      Price: 0,
      Time: "",
      Description: "",
      Image: "",
      DishInfos: [
        {
          ChoiceGroupId: 0,
        },
      ],
    };
    body.RestaurantId = RestaurantId;
    body.CategoryId = data.CategoryId;
    body.Name = formData.Name;
    body.Price = formData.Price;
    body.Time = formData.Time;
    body.Description = formData.descriptions;
    body.DishInfos[0].ChoiceGroupId = data.ChoiceGroupId;

    debugger;
    const formData1 = new FormData();
    formData1.append("dishImage", uploadImage);
    const imageResponse1 = await uploadImageAPI(formData1);
    body.Image = imageResponse1.data.data[0].url;

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
        navigate(`/dishes/${RestaurantId}`);
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

  useEffect(() => {
    getData(1);
    getChoiceGroupData(1);
  }, [loader]); //eslint-disable-line
  //Functions
  const getData = async () => {
    const response = await getCategories();
    setCategoryData(response.data.data);
    setLoader(true);
  };
  const getChoiceGroupData = async () => {
    debugger;
    const response = await getChoiceGroups(RestaurantId);
    setChoicesGroupData(response.data.data);
    setLoader(true);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <DashboardHeading
          text={"Manage Dishes"}
          isBack={true}
          link={"/dishes/" + RestaurantId}
        />
        <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"} mb={"80px"}>
          <Heading
            fontSize={HeadingFontSizes.heading_3}
            color={Colors.heading_primary_color}
            fontFamily={FontFamily.primary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"Dish Details"}
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
                registerName={"Name"}
                backgroundImage={InputImages.choiceNameImage}
              />
              {errors.Name?.type === "required" && (
                <p className="error_validation">Name is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <Select1
                hasBackgroundImage={true}
                backgroundImage={InputImages.categoryImage}
                margin={"0 0 0 0"}
                fontFamily={FontFamily.primary_font}
                fontSize={InputFontSizes.input_default_size}
                color={Colors.input_primary_color}
                fontWeight="500"
                options={
                  <>
                    <option selected>Category</option>
                    {categoryData?.map((item) => {
                      return <option value={item.id}>{item.title}</option>;
                    })}
                  </>
                }
                categoryGroup={data}
                setCategoryGroup={setData}
              />
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <Select2
                hasBackgroundImage={true}
                backgroundImage={InputImages.choiceTypeImage}
                margin={"0 0 0 0"}
                fontFamily={FontFamily.primary_font}
                fontSize={InputFontSizes.input_default_size}
                color={Colors.input_primary_color}
                fontWeight="500"
                options={
                  <>
                    <option selected>Choice</option>
                    {choicesGroupData?.map((item) => {
                      return <option value={item.id}>{item.name}</option>;
                    })}
                  </>
                }
                categoryGroup={data}
                setCategoryGroup={setData}
              />
            </Box>
            <Box maxW={"33.33%"} flex={"33.33%"} padding={"0 15px"} mb={"35px"}>
              <InputContainer
                title={"Price"}
                register={register}
                registerName={"Price"}
                backgroundImage={InputImages.moneyImage}
              />
              {errors.Price?.type === "required" && (
                <p className="error_validation">Price is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"30 Minutes"}
                register={register}
                registerName={"Time"}
                backgroundImage={InputImages.clockImage}
              />
              {errors.Time?.type === "required" && (
                <p className="error_validation">Time is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Description"}
                register={register}
                registerName={"descriptions"}
                backgroundImage={InputImages.coinImages}
              />
              {errors.descriptions?.type === "required" && (
                <p className="error_validation">Description is required</p>
              )}
            </Box>
          </Flex>
        </Box>
        <FooterButtons
          firstButtonText={"Save"}
          secondButtonText={"Cancel"}
          link={"/dishes/" + RestaurantId}
          loadingText="Saving"
          isLoading={btnLock}
        />
      </form>
    </div>
  );
}

export default AddDish;
