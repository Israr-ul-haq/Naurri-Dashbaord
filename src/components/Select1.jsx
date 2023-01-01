import { Select as SelectContainer } from "@chakra-ui/react";
import { Colors } from "../constants/Colors";

function Select1({
  padding = "10px 30px 10px 45px",
  fontSize = "",
  boxShadow = "0 0 18px 0 #0000000F",
  fontFamily = "sans-serif",
  fontWeight = "500",
  backgroundImage = "",
  hasBackgroundImage = true,
  color = "",
  borderColor = Colors.border_primary_color,
  height = "50",
  options,
  categoryGroup,
  setCategoryGroup,
}) {
  return (
    <div>
      <SelectContainer
        bgImage={backgroundImage}
        backgroundPosition={hasBackgroundImage ? "15px 50%" : ""}
        border={0}
        boxShadow={boxShadow}
        padding={padding}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        backgroundRepeat={hasBackgroundImage ? "no-repeat" : ""}
        color={color}
        focusBorderColor={borderColor}
        height={height}
        onChange={(e) => {
          debugger;
          const c = { ...categoryGroup };
          c.CategoryId = e.target.value;
          setCategoryGroup(c);
        }}
      >
        {options}
      </SelectContainer>
    </div>
  );
}

export default Select1;
