import { useState } from "react";
import Swal from "sweetalert2";
import crossImage from "../assets/images/cross-image.png";
import { v4 as uuidv4 } from "uuid";

const AddChoicePopup = async (data, setLoader, setData) => {
  Swal.fire({
    customClass: "paymentmodel",
    title: "Add Choice",
    html: `<input type='text' id="Nameinput" name="Nameinput" placeholder="Enter Choice Name" class="paymentinput"/>
    <input type='number' id="Priceinput" name="Priceinput" placeholder="Enter Price" class="paymentinput"/>`,
    showCancelButton: true,
    confirmButtonText: `Save`,
    showCloseButton: true,
    closeButtonHtml: `<img src=${crossImage} alt="crossicon" className="popupcrossimage"/>`,
    inputValidator: (value) => {
      if (!value) {
        return "Please enter the value!";
      }
    },

    reverseButtons: true,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      debugger;

      const c = [...data];
      c.push({
        id: uuidv4(),
        name: document.getElementById("Nameinput").value,
        price: document.getElementById("Priceinput").value,
      });
      setData(c);

      setLoader(true);
    }
  });
};

export default AddChoicePopup;
