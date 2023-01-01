import Swal from "sweetalert2";
import crossImage from "../assets/images/cross-image.png";

const DeleteChoice = async (id, data, title, setLoader, setData) => {
  Swal.fire({
    title: "Are you sure, you want to delete " + title + "?",
    showCancelButton: true,
    confirmButtonText: `Delete`,
    showCloseButton: true,
    closeButtonHtml: `<img src=${crossImage} alt="crossicon" className="popupcrossimage"/>`,
    reverseButtons: true,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      setLoader(true);
      debugger;
      let removedArray = data.filter((item) => {
        return id !== item.id;
      });

      setData(removedArray);
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
      setLoader(false);
    }
  });
};

export default DeleteChoice;
