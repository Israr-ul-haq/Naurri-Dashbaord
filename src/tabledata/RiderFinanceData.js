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
    fullName: "",
    email: "",
    phoneNumber: "",
    balance: "",
    status: "",
  },
];

export const pdfHeaders = [
  "Name",
  "Email",
  "Phone Number",
  "Balance",
  "Status",
];

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
      name: "Rider",
      cell: (row) => row["fullName"],
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
      name: "Balance",
      cell: (row) => row["balance"],
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) =>
        row["status"] === StatusCodes.PaymentCleared ? (
          <Box color={Colors.header_success_color}>{row["status"]}</Box>
        ) : row["status"] === StatusCodes.PaymentPending ? (
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
            to={`/rider_finance/view/${row["id"]}`}
          >
            <Img
              placeholder={loadingImage}
              src={TableIcons.viewImage}
              error={TableIcons.viewImage}
              alt="view-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
            />
          </Link>
        </Flex>
      ),
    },
  ];
};
