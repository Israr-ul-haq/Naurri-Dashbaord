import { Box, Flex, Skeleton } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Datatable from "../../components/Datatable";
import Heading from "../../components/Heading";
import { useState, useEffect } from "react";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import { getChoice, update, save } from "../../services/ChoicesService";
import { InputImages } from "../../constants/InputImages";
import { InputFontSizes } from "../../constants/InputFontSizes";
import FooterButtons from "../../components/FooterButtons";
import { GetById } from "../../helpers/GetById";
import Select from "../../components/Select";
import { columns } from "../../tabledata/AddChoicesData";
import { useNavigate, useParams } from "react-router";
import InputContainer from "../../components/InputContainer";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import PageTitle from "../../components/PageTitle";
import AddChoicePopup from "../../helpers/AddChoicePopup";
function EditChoices() {
  const [data, setData] = useState([]);
  const [choiceData, setChoiceData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [choiceGroup, setChoiceGroup] = useState({
    IsRequired: "",
  });
  const [btnLock, setBtnLock] = useState(false);
  const [loading, setLoading] = useState(false);
  const { RestaurantId, id } = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await GetById(getChoice, id);
      debugger;
      reset(response.data.data);
      setChoiceData(response.data.data);
      setData(response.data.data.choiceGroupInfos);
      setLoader(true);
    })();
  }, []);

  const submitForm = async (formData) => {
    setBtnLock(true);
    debugger;
    const body = {
      Name: "",
      IsRequired: "",
      NoOfChoices: "",
      RestaurantId: RestaurantId,
      ChoiceGroupInfos: [],
    };
    body.NoOfChoices = formData.noOfChoices;
    body.ChoiceGroupInfos = data;
    data.forEach((object) => {
      delete object["id"];
    });
    if (body.NoOfChoices < data.length) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Choices limit exceeded",
        showConfirmButton: true,
        timer: 5000,
      });
    } else {
      body.Name = formData.name;
      if (choiceGroup.IsRequired === "") {
        body.IsRequired = formData.isRequired;
      } else {
        body.IsRequired = choiceGroup.IsRequired;
      }

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
          navigate(`/choices/${RestaurantId}`);
        }, 0);
      }

      if (response.data.code === 0) {
        setBtnLock(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: response.data.message,
          showConfirmButton: true,
          timer: 5000,
        });
      }
    }
  };

  return (
    <div>
      <PageTitle title={"Choices"} location={window.location.href} />
      <DashboardHeading
        text={"Edit Choices"}
        isBack={true}
        link={"/choices/" + RestaurantId}
      />
      <Skeleton isLoaded={loader}>
        <form onSubmit={handleSubmit(submitForm)}>
          <Box
            padding={"30px 50px"}
            mt={"30px"}
            boxShadow={"0 0 18px #00000014"}
          >
            <Heading
              fontSize={HeadingFontSizes.heading_3}
              color={Colors.heading_primary_color}
              fontFamily={FontFamily.primary_font}
              fontWeight="800"
              margin="0 0 35px 0"
              text={"Create Choices Group"}
            />
            <Flex wrap={"wrap"} width={"calc(100%)"} margin={"0 -15px"}>
              <Box maxW={"33.33%"} flex={"33.33%"} padding={"0 15px"}>
                <InputContainer
                  title={"Choice Name"}
                  register={register}
                  registerName={"name"}
                  backgroundImage={InputImages.choiceNameImage}
                />
                {errors.name?.type === "required" && (
                  <p className="error_validation">Choice name is required</p>
                )}
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"} padding={"0 15px"}>
                <Select
                  hasBackgroundImage={true}
                  backgroundImage={InputImages.choiceTypeImage}
                  margin={"0 0 0 0"}
                  fontFamily={FontFamily.primary_font}
                  fontSize={InputFontSizes.input_default_size}
                  color={Colors.input_primary_color}
                  fontWeight="500"
                  options={
                    choiceData?.isRequired ? (
                      <>
                        <option value="true" selected>
                          Required
                        </option>
                        <option value="false">Optional</option>
                      </>
                    ) : (
                      <>
                        <option value="true">Required</option>
                        <option value="false" selected>
                          Optional
                        </option>
                      </>
                    )
                  }
                  choiceGroup={choiceGroup}
                  setChoiceGroup={setChoiceGroup}
                  padding="10px 30px 10px 45px"
                />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"} padding={"0 15px"}>
                <InputContainer
                  title={"Maximum Number Of Choices"}
                  register={register}
                  registerName={"noOfChoices"}
                  backgroundImage={InputImages.choiceMaximumImage}
                  type={"number"}
                />
                {errors.name?.type === "required" && (
                  <p className="error_validation">No of choices is required</p>
                )}
              </Box>
            </Flex>
          </Box>
          <Box
            padding={"35px"}
            boxShadow={"0 0 18px #00000014"}
            mt={30}
            mb={"80px"}
          >
            <p
              className="Add_Button"
              onClick={() => AddChoicePopup(data, setLoader, setData)}
            >
              Add+
            </p>
            <Datatable
              columns={columns(data, setLoader, setData)}
              incomingData={data}
              loading={loading}
            />
          </Box>
          <FooterButtons
            firstButtonText={"Save"}
            secondButtonText={"Cancel"}
            link={"/choices/" + RestaurantId}
          />
        </form>
      </Skeleton>
    </div>
  );
}

export default EditChoices;
