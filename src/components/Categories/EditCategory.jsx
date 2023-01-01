import { Box, Flex } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import FooterButtons from "../../components/FooterButtons";
import InputContainer from "../../components/InputContainer";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getById, save, update } from "../../services/CategoriesService";
import { InputImages } from "../../constants/InputImages";

import Swal from "sweetalert2";
import PageTitle from "../../components/PageTitle";

import { GetById } from "../../helpers/GetById";

function EditCategory() {
  //State
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [btnLock, setBtnLock] = useState(false);
  const navigate = useNavigate();
  //Functions

  useEffect(() => {
    debugger;
    (async () => {
      const response = await GetById(getById, id);
      debugger;
      if (response.data.code === 1) {
        reset(response.data.data);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: response.data.data.message,
          showConfirmButton: true,
          timer: 5000,
        });
      }
    })();
  }, []); //eslint-disable-line

  const submitForm = async (formData) => {
    debugger;
    setBtnLock(true);

    const body = {
      title: formData.title,
    };

    const response = await update(id, body);

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
        navigate("/categories");
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
      <PageTitle title={"Category"} location={window.location.href} />
      <DashboardHeading
        text={"Category Management"}
        isBack={true}
        link="/categories"
      />
      <form onSubmit={handleSubmit(submitForm)}>
        <Box
          padding={"30px 50px"}
          boxShadow={"0 0 18px #00000014"}
          marginBottom={"20px"}
        >
          <Heading
            fontSize={HeadingFontSizes.heading_3}
            color={Colors.heading_primary_color}
            fontFamily={FontFamily.primary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"Category Detail"}
          />

          <Flex wrap={"wrap"} width={"calc(100%)"} margin={"0 -15px"}>
            <Box maxW={"33.33%"} mb={"50px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Title"}
                register={register}
                registerName={"title"}
                backgroundImage={InputImages.user_image}
              />
              {errors.title?.type === "required" && (
                <p className="error_validation">Title is required</p>
              )}
            </Box>
          </Flex>
        </Box>

        <FooterButtons
          firstButtonText={"Update"}
          secondButtonText={"Cancel"}
          link={"/categories"}
          loadingText="Updating"
          isLoading={btnLock}
        />
      </form>
    </div>
  );
}

export default EditCategory;
