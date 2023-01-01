import { Box, Button, Flex, Skeleton } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import FooterButtons from "../../components/FooterButtons";
import { InputFontSizes } from "../../constants/InputFontSizes";
import TextArea from "../../components/TextArea";
import { useForm } from "react-hook-form";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { GetById } from "../../helpers/GetById";
import { getById, update } from "../../services/QueriesService";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { buttonFontSizes } from "../../constants/ButtonFontSizes";
import { Link } from "react-router-dom";
import QueryFooterButtons from "../../components/QueryFooterButton";

function ViewQuery() {
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm();
  const [loader, setLoader] = useState(false);
  const [btnLock, setBtnLock] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      debugger;
      const response = await GetById(getById, id);
      setData(response.data.data);
      setLoader(true);
    })();
  }, []); //eslint-disable-line
  const navigate = useNavigate();

  const submitForm = async (formData) => {
    debugger;
    const body = {
      QueryId: id,
      Message: "",
    };
    body.Message = formData.Message;
    const response = await update(body);

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
        navigate("/queries");
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
      <PageTitle title={"Query"} location={window.location.href} />
      <DashboardHeading
        text={"Queries Management"}
        isBack={true}
        link="/queries"
      />
      <form onSubmit={handleSubmit(submitForm)}>
        <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"} mb={"80px"}>
          <Skeleton isLoaded={loader}>
            <Flex alignItems={"center"}>
              <Flex wrap={"wrap"} width={"calc(100%)"}>
                <Box maxW={"100%"} flex={"100%"} mb={"55px"}>
                  <Heading
                    fontSize={HeadingFontSizes.heading_4}
                    color={Colors.heading_primary_color}
                    fontFamily={FontFamily.primary_font}
                    fontWeight="800"
                    margin="0 0 5px 0"
                    text={"User Query"}
                  />
                  <Heading
                    fontSize={HeadingFontSizes.heading_4}
                    color={Colors.paragraph_primary_color}
                    fontFamily={FontFamily.primary_font}
                    fontWeight="400"
                    margin="0 0 0 0"
                    text={data?.description}
                  />
                </Box>

                <Box maxW={"100%"} flex={"100%"}>
                  <Heading
                    fontSize={HeadingFontSizes.heading_4}
                    color={Colors.heading_primary_color}
                    fontFamily={FontFamily.primary_font}
                    fontWeight="800"
                    margin="0 0 5px 0"
                    text={"Reply Query"}
                  />

                  <TextArea
                    placeholder="Reply Query"
                    margin={"0 0 0 0"}
                    fontFamily={FontFamily.primary_font}
                    fontSize={InputFontSizes.input_default_size}
                    color={Colors.input_primary_color}
                    fontWeight="500"
                    padding="30px 20px"
                    height="115px"
                    register={register}
                    registerName={"Message"}
                  />
                  {errors.Message?.type === "required" && (
                    <p className="error_validation">
                      Query message is required
                    </p>
                  )}
                </Box>
              </Flex>
            </Flex>
          </Skeleton>
        </Box>
        <QueryFooterButtons
          firstButtonText={"Reply"}
          secondButtonText={"Cancel"}
          query={data?.queryInfos}
          link={"/queries"}
          loadingText="Saving"
          isLoading={btnLock}
        />
      </form>
    </div>
  );
}

export default ViewQuery;
