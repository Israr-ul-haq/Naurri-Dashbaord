import { Box } from "@chakra-ui/react";
import DataTable from "react-data-table-component";

function Datatable({ incomingData, columns,totalRows, handlePerRowsChange, handlePageChange,loading }) {
  return (
    <Box marginTop={"35px"}>
      <DataTable
        title=""
        columns={columns}
        data={incomingData}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        progressPending={loading}
      />
    </Box>
  );
}

export default Datatable;
