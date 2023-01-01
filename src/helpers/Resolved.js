import Swal from "sweetalert2";
import crossImage from "../assets/images/cross-image.png";
const Resolved = async (id, data, service, title, setLoader) => {
  Swal.fire({
    title: "Are you sure, you want to resolved " + title + " " + "query",
    showCancelButton: true,
    confirmButtonText: `Resolve`,
    showCloseButton: true,
    closeButtonHtml: `<img src=${crossImage} alt="crossicon" className="popupcrossimage"/>`,
    reverseButtons: true,
  }).then(async (result) => {
    debugger;
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      setLoader(true);
      let removeIndex = data
        .map((item) => {
          return item.id;
        })
        .indexOf(id);
      data.splice(removeIndex, 1);
      debugger;
      try {
        const response = await service(id);
        if (response.data.code === 1) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: title + " deleted!",
          });
          setLoader(false);
        }

        if (response.data.code === 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
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

export default Resolved;
