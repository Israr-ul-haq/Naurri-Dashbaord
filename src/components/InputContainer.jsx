import Input from "../components/Input";
import { InputFontSizes } from "../constants/InputFontSizes";
import { Colors } from "../constants/Colors";
import { FontFamily } from "../constants/FontFamily";
function InputContainer({
  title,
  isPassword = false,
  register,
  registerName,
  backgroundImage,
  isRequired,
  disabled,
  type,
  auto,
}) {
  return (
    <Input
      autocomplete={auto}
      placeholder={title}
      hasBackgroundImage={true}
      backgroundImage={backgroundImage}
      margin={"0 0 0 0"}
      fontFamily={FontFamily.primary_font}
      fontSize={InputFontSizes.input_default_size}
      color={Colors.input_primary_color}
      fontWeight="500"
      isPasswordInput={isPassword}
      register={register}
      registerName={registerName}
      isRequired={isRequired}
      disabled={disabled}
      type={type}
    />
  );
}

export default InputContainer;
