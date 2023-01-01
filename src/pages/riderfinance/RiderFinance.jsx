import { Box, Flex, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DashboardHeading from "../../components/DashboardHeading";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/DatatableHeader";
import Img from "react-cool-img";
import { TableIcons } from "../../constants/TableIcons";
import { loadingImage } from "../../constants/LoadingImage";
import { Colors } from "../../constants/Colors";
import { useEffect, useState } from "react";
import {
  columns,
  pdfHeaders,
  columnNames,
} from "../../tabledata/RiderFinanceData";
import { get } from "../../services/RiderFinanceService";

function RiderFinance() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData(1);
  }, [loader]); //eslint-disable-line

  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [
        elt.fullName,
        elt.email,
        elt.phoneNumber,
        elt.balance,
        elt.status,
      ];
    });
    setFilteredPdfData(filteredData);
  };

  const getData = async (page) => {
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
      <DashboardHeading text={"Rider Finance"} />

      <Box padding={"35px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <DataTableHeader
            columnNames={columnNames}
            pdfHeaders={pdfHeaders}
            incomingFilteredData={filteredPdfData}
            incomingData={data}
            inComingName={"Riders"}
            search={searchInput}
          />
          <Datatable
            columns={columns(data, setLoader)}
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

export default RiderFinance;
