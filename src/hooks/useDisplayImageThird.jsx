import { useState } from "react";

function useDisplayImageThird() {
  const [resultThird, setResultThird] = useState("");

  function uploaderThird(e) {
    const imageFile = e.target.files[0];

    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setResultThird(e.target.result);
    });

    reader.readAsDataURL(imageFile);
  }

  return { resultThird, uploaderThird, setResultThird };
}

export default useDisplayImageThird;
