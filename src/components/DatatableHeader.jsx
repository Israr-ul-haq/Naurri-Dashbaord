import downloadCSV from "../helpers/ExportCSV";
import { exportPDF } from "../helpers/ExportPDF";
import Heading from "../components/Heading";
import { HeadingFontSizes } from "../constants/HeadingFontSizes";
import { Colors } from "../constants/Colors";
import { FontFamily } from "../constants/FontFamily";
import { InputImages } from "../constants/InputImages";
import { InputFontSizes } from "../constants/InputFontSizes";
import Button from "../components/Button";
import { buttonFontSizes } from "../constants/ButtonFontSizes";
import { Box, Flex } from "@chakra-ui/react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
function DataTableHeader({
  incomingFilteredData,
  incomingData,
  inComingName,
  columnNames,
  pdfHeaders,
  search,
}) {
  //State
  const { register } = useForm();
  return (
    <>
      <Heading
        fontSize={HeadingFontSizes.heading_4}
        color={Colors.heading_primary_color}
        fontFamily={FontFamily.secondary_font}
        fontWeight="500"
        margin="0 0 15px 0"
        text="Export to:"
      />
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"}>
          <Button
            height="30"
            width="65px"
            maxWidth="65px"
            text="PDF"
            backgroundColor={Colors.button_primary_color}
            color={Colors.white_color}
            borderColor={Colors.button_primary_color}
            focusBorderColor={Colors.button_primary_color}
            hoverBackgroundColor={Colors.white_color}
            hoverColor={Colors.button_primary_color}
            hoverBorder={Colors.button_primary_color}
            fontWeight="400"
            fontSize={buttonFontSizes.button_export_header_size}
            fontFamily={FontFamily.secondary_font}
            onClick={(e) =>
              exportPDF(pdfHeaders, incomingFilteredData, inComingName)
            }
            borderRadius="4px"
          />
          <Button
            margin="0 0 0 10px"
            height="30"
            width="65px"
            maxWidth="65px"
            text="CSV"
            backgroundColor={Colors.button_primary_color}
            color={Colors.white_color}
            borderColor={Colors.button_primary_color}
            focusBorderColor={Colors.button_primary_color}
            hoverBackgroundColor={Colors.white_color}
            hoverColor={Colors.button_primary_color}
            hoverBorder={Colors.button_primary_color}
            fontWeight="400"
            fontSize={buttonFontSizes.button_export_header_size}
            fontFamily={FontFamily.secondary_font}
            onClick={(e) =>
              downloadCSV(incomingData, columnNames, inComingName)
            }
            borderRadius="4px"
          />
        </Flex>
        <Box w={"330px"}>
          {/* <Input
            placeholder="Search"
            hasBackgroundImage={true}
            backgroundImage={InputImages.searchImage}
            margin={"0 0 0 0"}
            fontFamily={FontFamily.primary_font}
            fontSize={InputFontSizes.input_default_size}
            color={Colors.input_primary_color}
            fontWeight="400"
            borderRadius={"12px"}
            register={register}
            registerName={"Search"}
          /> */}
          <input
            type="text"
            className="searchinput"
            onChange={(e) => search(e.target.value)}
            placeholder="Search"
          />
        </Box>
      </Flex>
    </>
  );
}

export default DataTableHeader;
