import { Box, Skeleton } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/DatatableHeader";
import { useState, useEffect } from "react";
import { get, assignOrder, getRiders } from "../../services/OrdersService";
import { columns, pdfHeaders, columnNames } from "../../tabledata/OrdersData";
import PageTitle from "../../components/PageTitle";

function Order() {
  const [data, setData] = useState([]);
  const [ridersData, setRidersData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  //UseEffect
  useEffect(() => {
    getData(1);
    getRiderData(1);
  }, [loader]); //eslint-disable-line

  //Functions
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [
        elt.orderNumber,
        elt.orderStatusTitle,
        elt.restaurantName,
        elt.riderFullname,
        elt.userFullname,
      ];
    });
    setFilteredPdfData(filteredData);
  };

  const getData = async (page) => {
    debugger;
    const response = await get({
      pageSize: perPage,
      pageNumber: page,
      search: "",
    });

    setData(response.data.data.records);
    filterPdfData(response.data.data.records);
    setTotalRows(response.data.data.total);
    setLoader(true);
  };
  const getRiderData = async () => {
    const response = await getRiders();
    setRidersData(response.data.data);
  };

  const handlePageChange = (page) => {
    getData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await get({ pageSize: newPerPage, pageNumber: page });
    setData(response.data.data.records);
    filterPdfData(response.data.data.records);
    setPerPage(newPerPage);
    setLoading(false);
  };
  const searchInput = async (search) => {
    debugger;
    const response = await get({
      pageSize: 10,
      pageNumber: 1,
      search: search,
    });
    setData(response.data.data.records);
    setTotalRows(response.data.data.total);
    setLoader(true);
  };

  return (
    <div>
      <PageTitle title={"Orders"} location={window.location.href} />
      <DashboardHeading text={"Order Management"} />
      <Box padding={"35px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <DataTableHeader
            columnNames={columnNames}
            pdfHeaders={pdfHeaders}
            incomingFilteredData={filteredPdfData}
            incomingData={data}
            inComingName={"Orders"}
            search={searchInput}
          />
          <Datatable
            columns={columns(ridersData, assignOrder, setLoader)}
            totalRows={totalRows}
            handlePerRowsChange={handlePerRowsChange}
            handlePageChange={handlePageChange}
            incomingData={data}
            loading={loading}
          />
        </Skeleton>
      </Box>
    </div>
  );
}

export default Order;
