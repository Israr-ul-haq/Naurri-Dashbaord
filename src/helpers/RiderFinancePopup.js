import { useState } from "react";
import Swal from "sweetalert2";
import crossImage from "../assets/images/cross-image.png";

const MakePayment = async (id, service, setLoader) => {
  Swal.fire({
    customClass: "paymentmodel",
    title: "Please Enter The Amount You Received.",
    html: `<input type='number' id="paymentinput" name="paymentinput" placeholder="Price" class="paymentinput"/>`,
    showCancelButton: true,
    confirmButtonText: `Send`,
    showCloseButton: true,
    closeButtonHtml: `<img src=${crossImage} alt="crossicon" className="popupcrossimage"/>`,
    inputValidator: (value) => {
      if (!value) {
        return "Please enter the value!";
      }
    },
    reverseButtons: true,
  }).then(async (result) => {
    debugger;
    /* Read more about isConfirmed, isDenied below */

    if (result.isConfirmed) {
      setLoader(true);
      try {
        const response = await service(
          id,
          document.getElementById("paymentinput").value
        );
        if (response.data.code === 1) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Sended!",
          });
          setLoader(false);
        }
        if (response.data.code === 0) {
          Swal.fire({
            icon: "error",
            text: response.data.data.message,
          });
          setLoader(false);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setLoader(false);
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
    setLoader(true);
  });
};

export default MakePayment;
