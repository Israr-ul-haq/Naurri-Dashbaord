import { Box, Flex, Skeleton } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Datatable from "../../components/Datatable";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import Img from "react-cool-img";
import userImage from "../../assets/images/dummyprofile-image.png";
import { loadingImage } from "../../constants/LoadingImage";
import DataTableHeader from "../../components/DatatableHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetById } from "../../helpers/GetById";
import { getById, pay } from "../../services/RiderFinanceService";
import DetailText from "../../components/DetailText";
import {
  columns,
  pdfHeaders,
  columnNames,
} from "../../tabledata/RiderTransactionsData";
import moment from "moment";
function ViewRiderFinance() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [
        elt.openingBalance,
        elt.closingBalance,
        elt.amount,
        elt.paymentMode,
        moment(elt.date).format("DD-MM-YY"),
      ];
    });
    setFilteredPdfData(filteredData);
  };

  const [financeData, setFinanceData] = useState({
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    balance: 0.0,
    debit: 0.0,
    credit: 0.0,
    status: "",
    transactions: [],
  });
  const { id } = useParams();
  //UseEffect
  useEffect(() => {
    getData(1);
  }, [loader]); //eslint-disable-line
  const getData = async (page) => {
    const response = await getById({
      id: id,
      // pageSize: perPage,
      // pageNumber: page,
    });
    setData(response.data.data.records.transactions);
    setFinanceData(response.data.data.records);
    filterPdfData(response.data.data.records.transactions);
    setTotalRows(response.data.data.total);
    setLoader(true);
  };

  // const handlePageChange = (page) => {
  //   getData(page);
  // };

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setLoading(true);
  //   const response = await getById({
  //     id: id,
  //     pageSize: newPerPage,
  //     pageNumber: page,
  //   });
  //   setData(response.data.data.records.transactions);
  //   filterPdfData(response.data.data.records.transactions);
  //   setPerPage(newPerPage);
  //   setLoading(false);
  // };
  return (
    <div>
      <DashboardHeading
        text={"Rider Finance"}
        isBack={true}
        link="/rider_finance"
        secondButtonText="Receive Payment"
        isPayment={true}
        service={pay}
        riderId={id}
        Loader={setLoader}
      />
      <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <Heading
            fontSize={HeadingFontSizes.heading_3}
            color={Colors.heading_primary_color}
            fontFamily={FontFamily.primary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"Rider Information"}
          />
          <Flex alignItems={"center"}>
            <Box h={"170px"} w={"170px"} mr={"90px"}>
              <Img
                placeholder={loadingImage}
                src={
                  financeData?.profilePicture
                    ? financeData?.profilePicture
                    : userImage
                }
                error={userImage}
                alt="user-img"
                style={{
                  width: "100%",
                  height: "100%",
                  "object-fit": "cover",
                  borderRadius: "16px",
                }}
              />
            </Box>
            <Flex wrap={"wrap"} width={"calc(100% - 260px)"}>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText
                  data={financeData?.fullName}
                  headingName={"Rider Name"}
                />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText
                  data={financeData?.phoneNumber}
                  headingName={"Phone Number"}
                />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText data={financeData?.email} headingName={"Email"} />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                <DetailText data={financeData?.status} headingName={"Status"} />
              </Box>
            </Flex>
          </Flex>
        </Skeleton>
      </Box>
      <Box
        padding={"30px 50px"}
        boxShadow={"0 0 18px #00000014"}
        mt={"30px"}
        mb="80px"
      >
        <Skeleton isLoaded={loader}>
          <Flex alignItems={"center"}>
            <Flex wrap={"wrap"} width={"calc(100%)"}>
              <Box maxW={"33.33%"} flex={"33.33%"}>
                <DetailText
                  data={financeData?.balance}
                  headingName={"Current Balance"}
                />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"}>
                <DetailText
                  data={financeData?.debit}
                  headingName={"Total Debit"}
                />
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"}>
                <DetailText
                  data={financeData?.credit}
                  headingName={"Total Credit"}
                />
              </Box>
            </Flex>
          </Flex>
        </Skeleton>
      </Box>
      <Box padding={"35px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <DataTableHeader
            columnNames={columnNames}
            pdfHeaders={pdfHeaders}
            incomingFilteredData={filteredPdfData}
            incomingData={data}
            inComingName={"Finance"}
          />
          <Datatable
            columns={columns(data, setLoader)}
            totalRows={totalRows}
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

export default ViewRiderFinance;
