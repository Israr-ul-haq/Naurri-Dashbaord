import { Textarea as TextContainer } from "@chakra-ui/react";
import Img from "react-cool-img";
import eyeImage from "../assets/images/eye-image.png";
import { Colors } from "../constants/Colors";

function TextArea({
  margin = "0",
  padding = "10px 30px 10px 45px",
  placeholder = "Enter Your Placeholder",
  fontSize = "",
  boxShadow = "0 0 18px 0 #0000000F",
  fontFamily = "sans-serif",
  isPasswordInput = false,
  fontWeight = "500",
  backgroundImage = "",
  hasBackgroundImage = true,
  color = "",
  borderColor = Colors.border_primary_color,
  height = "50",
  type = "text",
  register,
  registerName,
  isRequired = true,
}) {
  let registerInput = null;
  if (register) {
    registerInput = { ...register(registerName, { required: isRequired }) };
  }
  return (
    <div
      style={
        isPasswordInput
          ? { position: "relative", margin: margin }
          : { margin: margin }
      }
    >
      <TextContainer
        type={type}
        bgImage={backgroundImage}
        backgroundPosition={hasBackgroundImage ? "15px 50%" : ""}
        border={0}
        boxShadow={boxShadow}
        padding={padding}
        placeholder={placeholder}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        backgroundRepeat={hasBackgroundImage ? "no-repeat" : ""}
        color={color}
        focusBorderColor={borderColor}
        height={height}
        {...registerInput}
      />
      {isPasswordInput ? (
        <div
          style={{
            position: "absolute",
            right: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
        >
          <Img
            placeholder={eyeImage}
            src={eyeImage}
            error={eyeImage}
            alt="eye-img"
            width="100%"
            height="100%"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default TextArea;
