import { Box } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/DatatableHeader";
import { useState, useEffect } from "react";
import { get, deleteSomething } from "../../services/DishesService";
import { useParams } from "react-router-dom";
import { columns, pdfHeaders, columnNames } from "../../tabledata/DishesData";

function Dishes() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const { RestaurantId } = useParams();

  //UseEffect
  useEffect(() => {
    getData(1);
  }, [loader]); //eslint-disable-line
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [elt.fullname, elt.email, elt.phoneNumber, elt.userStatusTitle];
    });
    setFilteredPdfData(filteredData);
  };
  const getData = async (page) => {
    debugger;
    setLoading(true);
    const response = await get({ pageSize: perPage, pageNumber: page }, RestaurantId);
    setData(response.data.data.records);
    filterPdfData(response.data.data.records);
    setTotalRows(response.data.data.total);
    setLoading(false);
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

  return (
    <div>
      <DashboardHeading
        text={"Manage Dishes"}
        isSingle={true}
        isButtons={true}
        secondButtonText="Add"
        secondButtonLink={"/dishes/add/" + RestaurantId}
      />
      <Box padding={"35px"} boxShadow={"0 0 18px #00000014"}>
        <DataTableHeader
          columnNames={columnNames}
          pdfHeaders={pdfHeaders}
          incomingFilteredData={filteredPdfData}
          incomingData={data}
          inComingName={"Users"}
        />
        <Datatable
          columns={columns(data, deleteSomething, setLoader, RestaurantId)}
          totalRows={totalRows}
          handlePerRowsChange={handlePerRowsChange}
          handlePageChange={handlePageChange}
          incomingData={data}
          loading={loading}
        />
      </Box>
    </div>
  );
}

export default Dishes;
