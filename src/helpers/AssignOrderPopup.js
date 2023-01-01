import Swal from "sweetalert2";
import crossImage from "../assets/images/cross-image.png";
import { useState, useEffect } from "react";
import { getRiders } from "../services/OrdersService";
const AssignOrderPopup = async (id, ridersData, service, setLoader) => {
  var options = {};
  ridersData.map((item) => {
    debugger;
    options[item.id] = item.fullname;
  });
  Swal.fire({
    title: "Assign Rider ",
    showCancelButton: true,
    confirmButtonText: `Assign`,
    showCloseButton: true,
    closeButtonHtml: `<img src=${crossImage} alt="crossicon" className="popupcrossimage"/>`,
    reverseButtons: true,
    input: `select`,
    inputOptions: options,
    inputPlaceholder: "Please select",
  }).then(async (result) => {
    if (result.isConfirmed) {
      debugger;
      setLoader(true);
      try {
        const response = await service(result.value, id);
        if (response.data.code === 1) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.data.message,
          });
          setLoader(false);
        }

        if (response.data.code === 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
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
      setLoader(false);
    }
  });
};

export default AssignOrderPopup;
