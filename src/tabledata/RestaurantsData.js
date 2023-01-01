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
    email: "",
    phoneNumber: "",
    status: "",
  },
];

export const pdfHeaders = ["Name", "Email", "Phone Number", "Status"];

export const columns = (data, service, setLoader) => {
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
      name: "Restaurant Name",
      cell: (row) => row["name"],
      sortable: true,
    },

    {
      name: "Email",
      cell: (row) => row["email"],
      sortable: true,
    },
    {
      name: "Phone Number",
      cell: (row) => row["phoneNumber"],
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) =>
        Number(row["statusId"]) === StatusCodes.active ? (
          <Box color={Colors.header_success_color}>{row["status"]}</Box>
        ) : Number(row["statusId"]) === StatusCodes.pending ? (
          <Box color={Colors.header_danger_color}>{row["status"]}</Box>
        ) : (
          <Box color={Colors.header_warning_color}>{row["status"]}</Box>
        ),
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <Flex alignItems={"center"}>
          <Link
            style={{ marginRight: "10px" }}
            to={`/restaurants/view/${row["userId"]}`}
          >
            <Img
              placeholder={loadingImage}
              src={TableIcons.viewImage}
              error={TableIcons.viewImage}
              alt="view-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
            />
          </Link>
          <Link
            style={{ marginRight: "10px" }}
            to={`/restaurants/edit/${row["userId"]}`}
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
                DeleteItem(row.userId, data, service, row["name"], setLoader, "restaurant")
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
