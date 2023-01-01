import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DashboardHeading from "../../components/DashboardHeading";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/DatatableHeader";
import Img from "react-cool-img";
import { TableIcons } from "../../constants/TableIcons";
import { loadingImage } from "../../constants/LoadingImage";
import { Colors } from "../../constants/Colors";

function RestaurantFinance() {
  const data = [
    {
      id: 121212,
      fullName: "Muabshar Ali Khan",
      email: "sdasd@GMAIL.COM",
      phoneNumber: "03232323",
      status: "Accepted",
      balance: "$500",
    },
    {
      id: 12221212,
      fullName: "Muabshar asd  Ali Khan",
      email: "sdasd23asd@GMAIL.COM",
      phoneNumber: "033rdd232323",
      status: "Rejected",
      balance: "$500",
    },
    {
      id: 12221212,
      fullName: "Muabshar asd  Ali Khan",
      email: "sdasd23asd@GMAIL.COM",
      phoneNumber: "033rdd232323",
      status: "Pending",
      balance: "$500",
    },
  ];

  const columns = [
    {
      name: "Sr#",
      cell: (row, index) => "0" + (index + 1),
      sortable: true,
    },

    {
      name: "Restaurant Name",
      cell: (row) => row["fullName"],
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: "phoneNumber",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
   
    {
      name: "Balance",
      selector: "balance",
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) =>
        row["status"] === "Accepted" ? (
          <Box color={Colors.header_success_color}>{row["status"]}</Box>
        ) : row["status"] === "Rejected" ? (
          <Box color={Colors.header_danger_color}>{row["status"]}</Box>
        ) : (
          <Box color={"#6B6B6B"}>{row["status"]}</Box>
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
            to={`/rider-finance/${row["id"]}`}
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
  return (
    <div>
      <DashboardHeading text={"Restaurant Finance"} />
      <Box padding={"35px"} boxShadow={"0 0 18px #00000014"}>
        <DataTableHeader />
        <Datatable columns={columns} incomingData={data} />
      </Box>
    </div>
  );
}

export default RestaurantFinance;
