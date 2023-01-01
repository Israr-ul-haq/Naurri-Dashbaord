import Img from "react-cool-img";
import { TableIcons } from "../constants/TableIcons";
import { loadingImage } from "../constants/LoadingImage";
import DeleteItem from "../helpers/DeleteItem";
import { Colors } from "../constants/Colors";
import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { StatusCodes } from "../constants/StatusCodes";

export const columnNames = [
  {
    name: "",
    categoryTitle: "",
    description: "",
    price: "",
  },
];

export const pdfHeaders = ["Full Name", "Email", "Phone Number", "Status"];

export const columns = (data, service, setLoader, RestaurantId) => {
  return [
    {
      name: "Sr#",
      cell: (row, index) => {
        if (index < 9) {
          return "0" + (index + 1);
        } else {
          return index + 1;
        }
      },
      sortable: true,
      width: "150px",
      maxWidth: "150px",
    },

    {
      name: "Dish Name",
      cell: (row) => row["name"],
      sortable: true,
    },

    {
      name: "Category",
      cell: (row) => row["categoryTitle"],
      sortable: true,
    },
    {
      name: "Description",
      cell: (row) => row["description"],
      sortable: true,
    },
    {
      name: "Price",
      cell: (row) => row["price"],
      sortable: true,
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <Flex alignItems={"center"}>
          <Link
            style={{ marginRight: "10px" }}
            to={`/dishes/edit/${row["id"]}/${RestaurantId}`}
          >
            <Img
              placeholder={loadingImage}
              src={TableIcons.editImage}
              error={TableIcons.editImage}
              alt="edit-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
            />
          </Link>
          <button
            style={{ marginRight: "10px" }}
            type="button"
            data-toggle="modal"
            className="tableactions_action"
          >
            <Img
              placeholder={loadingImage}
              src={TableIcons.deleteImage}
              error={TableIcons.deleteImage}
              alt="delete-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
              onClick={() =>
                DeleteItem(row.id, data, service, row["name"], setLoader)
              }
            />
          </button>
          {/* <button type="button" data-toggle="modal" className="tableactions_action">
            <Img
              placeholder={loadingImage}
              src={TableIcons.blockImage}
              error={TableIcons.blockImage}
              alt="block-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
            />
          </button> */}
        </Flex>
      ),
    },
  ];
};
