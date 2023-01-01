import { Box, Skeleton } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/DatatableHeader";
import {
  columns,
  pdfHeaders,
  columnNames,
} from "../../tabledata/ConfigurationData";
import PageTitle from "../../components/PageTitle";
import { useState, useEffect } from "react";
import { get, update } from "../../services/ConfigurationService";
import DataTableHeader1 from "../../components/DataTableHeader1";
function Configuration() {
  //State
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  // const [totalRows, setTotalRows] = useState(0);
  // const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  //UseEffect
  useEffect(() => {
    getData(1);
  }, [loader]); //eslint-disable-line

  //Functions
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [elt.title, elt.value];
    });
    setFilteredPdfData(filteredData);
  };

  // const getData = async (page) => {
  //   const response = await get({ pageSize: perPage, pageNumber: page });
  //   setData(response.data.data.records);
  //   filterPdfData(response.data.data.records);
  //   setTotalRows(response.data.data.total);
  //   setLoader(true);
  // };
  const getData = async () => {
    const response = await get();
    setData(response.data.data);
    filterPdfData(response.data.data);
    setLoader(true);
  };

  // const handlePageChange = (page) => {
  //   getData(page);
  // };

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setLoading(true);
  //   const response = await get({ pageSize: newPerPage, pageNumber: page });
  //   setData(response.data.data.records);
  //   filterPdfData(response.data.data.records);
  //   setPerPage(newPerPage);
  //   setLoading(false);
  // };
  return (
    <div>
      <PageTitle title={"Configuration"} location={window.location.href} />
      <DashboardHeading text={"Configuration"} />
      <Box padding={"35px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <DataTableHeader1
            columnNames={columnNames}
            pdfHeaders={pdfHeaders}
            incomingFilteredData={filteredPdfData}
            incomingData={data}
            inComingName={"Configuration"}
          />
          <Datatable
            columns={columns(update, setLoader)}
            // totalRows={totalRows}
            // handlePerRowsChange={handlePerRowsChange}
            // handlePageChange={handlePageChange}
            incomingData={data}
            loading={loading}
          />
        </Skeleton>
      </Box>
    </div>
  );
}

export default Configuration;
