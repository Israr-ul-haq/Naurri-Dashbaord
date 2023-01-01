import Heading from "../components/Heading";
import { HeadingFontSizes } from "../constants/HeadingFontSizes";
import { Colors } from "../constants/Colors";
import { FontFamily } from "../constants/FontFamily";
import { StatusCodes } from "../constants/StatusCodes";
function DetailText({ data, headingName, status = 0 }) {
  let textColor = "";
  switch (status) {
    case StatusCodes.pending:
      textColor = Colors.header_warning_color;
      break;
    case StatusCodes.active:
      textColor = Colors.header_success_color;
      break;
    case StatusCodes.unblock:
      textColor = Colors.header_danger_color;
      break;
    default:
      break;
  }

  return (
    <div>
      <Heading
        fontSize={HeadingFontSizes.heading_4}
        color={Colors.heading_primary_color}
        fontFamily={FontFamily.primary_font_black}
        fontWeight="800"
        margin="0 0 5px 0"
        text={headingName}
      />
      <Heading
        fontSize={HeadingFontSizes.heading_4}
        color={status ? textColor : Colors.paragraph_primary_color}
        fontFamily={"poppins"}
        fontWeight="400"
        margin="0 0 0 0"
        text={data}
      />
    </div>
  );
}

export default DetailText;
