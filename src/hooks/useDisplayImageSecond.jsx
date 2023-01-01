import { useState } from "react";

function useDisplayImageSecond() {
  const [resultSecond, setResultSecond] = useState("");

  function uploaderSecond(e) {
    const imageFile = e.target.files[0];

    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setResultSecond(e.target.result);
    });

    reader.readAsDataURL(imageFile);
  }

  return { resultSecond, uploaderSecond, setResultSecond };
}

export default useDisplayImageSecond;
