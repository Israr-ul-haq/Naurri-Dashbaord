import Img from "react-cool-img";
import { TableIcons } from "../constants/TableIcons";
import { loadingImage } from "../constants/LoadingImage";
import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AssignOrderPopup from "../helpers/AssignOrderPopup";

export const columnNames = [
  {
    riderFullname: "",
    orderNumber: "",
    restaurantName: "",
    userFullname: "",
    orderStatusTitle: "",
  },
];

export const pdfHeaders = [
  "Order Number",
  "Status",
  "Restuarant Name",
  "User Name",
];

export const columns = (ridersData, service, setLoader) => {
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
      width: "100px",
      MaxWidth: "100px",
    },

    {
      name: "Rider Name",
      cell: (row) => (row.riderFullname ? row.riderFullname : "N/A"),
      sortable: true,
    },
    {
      name: "Order Number",
      cell: (row) => row["orderNumber"],
      sortable: true,
    },

    {
      name: "Restuarant",
      cell: (row) => row["restaurantName"],
      sortable: true,
    },

    {
      name: "Customers",
      cell: (row) => row["userFullname"],
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) =>
        row["orderStatusTitle"] === "Ride Completed" ? (
          <>
            <div>
              <p style={{ color: "green" }}>Ride Completed</p>
            </div>
          </>
        ) : row["orderStatusTitle"] === "Pending" ? (
          <>
            <div>
              <p style={{ color: "red" }}>Pending</p>
            </div>
          </>
        ) : row["orderStatusTitle"] === "Rider Assigned" ? (
          <>
            <div>
              <p style={{ color: "#FFAF00" }}>Rider Assigned</p>
            </div>
          </>
        ) : row["orderStatusTitle"] === "Accepted By Restaurant" ? (
          <>
            <div>
              <p style={{ color: "red" }}>Accepted By Restaurant</p>
            </div>
          </>
        ) : (
          ""
        ),

      sortable: true,
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <Flex alignItems={"center"}>
          <Link style={{ marginRight: "10px" }} to={`/orders/${row["id"]}`}>
            <Img
              placeholder={loadingImage}
              src={TableIcons.viewImage}
              error={TableIcons.viewImage}
              alt="view-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
            />
          </Link>
          {row.orderStatusTitle === "Pending" ||
          row.orderStatusTitle === "Accepted By Restaurant" ? (
            <button
              style={{ marginRight: "10px" }}
              type="button"
              data-toggle="modal"
              className="tableactions_action"
            >
              <Img
                placeholder={loadingImage}
                src={TableIcons.viewRiderImage}
                error={TableIcons.viewRiderImage}
                alt="delete-img"
                style={{ height: "23px", width: "23px", maxWidth: "unset" }}
                onClick={() =>
                  AssignOrderPopup(row.id, ridersData, service, setLoader)
                }
              />
            </button>
          ) : (
            ""
          )}
        </Flex>
      ),
    },
  ];
};
