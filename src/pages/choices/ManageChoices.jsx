import { Box, Skeleton } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Datatable from "../../components/Datatable";
import { useState, useEffect } from "react";

import { getChoicesData } from "../../services/ChoicesService";

import DataTableHeader from "../../components/DatatableHeader";
import { columns, pdfHeaders, columnNames } from "../../tabledata/ChoicesData";
import { useParams } from "react-router";
import PageTitle from "../../components/PageTitle";
import { deleteSomething } from "../../services/ChoicesService";
function ManageChoices() {
  //State
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
      return [elt.title];
    });
    setFilteredPdfData(filteredData);
  };

  const getData = async (page) => {
    const response = await getChoicesData(
      {
        pageSize: perPage,
        pageNumber: page,
      },
      RestaurantId
    );
    debugger;
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
    const response = await getChoicesData(
      { pageSize: newPerPage, pageNumber: page },
      RestaurantId
    );
    debugger;
    setData(response.data.data.records);
    filterPdfData(response.data.data.records);
    setPerPage(newPerPage);
    setLoading(false);
  };
  return (
    <div>
      <PageTitle title={"Choices"} location={window.location.href} />
      <DashboardHeading
        text={"Manage Choices Group"}
        isSingle={true}
        isButtons={true}
        secondButtonText="Add"
        secondButtonLink={`/choices/add/${RestaurantId}`}
        isBack={true}
        link={"/restaurants"}
      />
      <Box padding={"35px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <DataTableHeader
            columnNames={columnNames}
            pdfHeaders={pdfHeaders}
            incomingFilteredData={filteredPdfData}
            incomingData={data}
            inComingName={"Restaurants"}
          />
          <Datatable
            columns={columns(data, deleteSomething, setLoader, RestaurantId)}
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

export default ManageChoices;
