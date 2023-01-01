import { Box, Skeleton } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/DatatableHeader";
import { useState, useEffect } from "react";
import { get, deleteSomething } from "../../services/UserService";
import { columns, pdfHeaders, columnNames } from "../../tabledata/UsersData";
import PageTitle from "../../components/PageTitle";
function User() {
  //State
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  //UseEffect
  useEffect(() => {
    getData(1);
  }, [loader]); //eslint-disable-line

  //Functions
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [elt.fullname, elt.email, elt.phoneNumber, elt.userStatusTitle];
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
      <PageTitle title={"Users"} location={window.location.href} />
      <DashboardHeading text={"User Management"} />
      <Box padding={"35px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <DataTableHeader
            columnNames={columnNames}
            pdfHeaders={pdfHeaders}
            incomingFilteredData={filteredPdfData}
            incomingData={data}
            inComingName={"Users"}
            search={searchInput}
          />
          <Datatable
            columns={columns(data, deleteSomething, setLoader)}
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

export default User;
