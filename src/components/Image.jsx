import Img from "react-cool-img";
import { loadingImage } from "../constants/LoadingImage";

function Image({ image }) {
  return (
      <Img
        placeholder={loadingImage}
        src={image}
        error={image}
        alt="user-img"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "16px",
        }}
      />
  );
}

export default Image;
