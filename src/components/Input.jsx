import { Input as InputContainer } from "@chakra-ui/react";
import { useState } from "react";
import Img from "react-cool-img";
import eyeImage from "../assets/images/eye-image.png";
import { Colors } from "../constants/Colors";
import { loadingImage } from "../constants/LoadingImage";
function Input({
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
  disabled=false
}) {
  let registerInput =  null;
  if(register){
   registerInput = {...register(registerName, { required: isRequired })}
  }
  const [showPassword, setShowPassword] = useState(false);
  const toggle = () => setShowPassword(!showPassword);
  return (
    <div style={{ position: "relative", margin: margin }}>
      <InputContainer
        type={isPasswordInput ? (showPassword ? "text" : "password") : type}
        border={0}
        boxShadow={boxShadow}
        padding={padding}
        placeholder={placeholder}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        color={color}
        focusBorderColor={borderColor}
        height={height}
        disabled={disabled}
        {...registerInput}
      />
      {hasBackgroundImage ? (
        <div
          style={{
            position: "absolute",
            left: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            zIndex: 999,
          }}
        >
          <Img
            placeholder={loadingImage}
            src={backgroundImage}
            error={backgroundImage}
            alt="input-img"
            style={{ width: "15px", height: "15px" }}
            onClick={toggle}
          />
        </div>
      ) : (
        ""
      )}
      {isPasswordInput ? (
        <div
          style={{
            position: "absolute",
            right: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            zIndex: 999,
          }}
        >
          <Img
            placeholder={loadingImage}
            src={eyeImage}
            error={eyeImage}
            alt="eye-img"
            style={{ width: "21px", height: "13px" }}
            onClick={toggle}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Input;
