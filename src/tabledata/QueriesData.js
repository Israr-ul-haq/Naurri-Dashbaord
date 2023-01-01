import Img from "react-cool-img";
import { TableIcons } from "../constants/TableIcons";
import { loadingImage } from "../constants/LoadingImage";
import DeleteItem from "../helpers/DeleteItem";
import { Colors } from "../constants/Colors";
import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import Resolved from "../helpers/Resolved";

export const columnNames = [
  {
    userFullName: "",
    userEmail: "",
    date: "",
    isResolved: "",
  },
];

export const pdfHeaders = ["User Name", "Email", "Date", "Status"];

export const columns = (data, service, resolvedService, setLoader) => {
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
      name: "User Name",
      cell: (row) => row["userFullName"],
      sortable: true,
    },

    {
      name: "Email",
      cell: (row) => row["userEmail"],
      sortable: true,
    },
    {
      name: "Date",
      cell: (row) => moment(row.date).format("DD-MM-YY"),
      sortable: true,
    },

    {
      name: "Status",
      cell: (row) =>
        row["isResolved"] ? (
          <Box color={Colors.header_success_color}>Resolved</Box>
        ) : (
          <Box color={Colors.header_danger_color}>Pending</Box>
        ),
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <Flex alignItems={"center"}>
          <Link style={{ marginRight: "10px" }} to={`/query/${row["id"]}`}>
            <Img
              placeholder={loadingImage}
              src={TableIcons.replyImage}
              error={TableIcons.replyImage}
              alt="view-img"
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
              src={TableIcons.Resolved}
              error={TableIcons.Resolved}
              alt="delete-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
              onClick={() =>
                Resolved(
                  row.id,
                  data,
                  resolvedService,
                  row["userFullName"],
                  setLoader
                )
              }
            />
          </button>
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
              alt="view-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
              onClick={() =>
                DeleteItem(
                  row.id,
                  data,
                  service,
                  row["userFullName"],
                  setLoader
                )
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
