import Img from "react-cool-img";
import { TableIcons } from "../constants/TableIcons";
import { loadingImage } from "../constants/LoadingImage";
import MakePayment from "../helpers/MakePayment";
import { Flex } from "@chakra-ui/react";

export const columnNames = [
  {
    title: "",
    value: "",
  },
];

export const pdfHeaders = ["Name", "Value"];

export const columns = (service, setLoader) => {
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
      width: "150px",
      maxWidth: "150px",
    },

    {
      name: "Name",
      cell: (row) => row["title"],
      sortable: true,
      width: "350px",
      maxWidth: "350px",
    },

    {
      name: "Value",
      cell: (row) => row["value"],
      sortable: true,
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <Flex alignItems={"center"}>
          <button
            style={{ marginRight: "10px" }}
            type="button"
            data-toggle="modal"
            className="tableactions_action"
          >
            <Img
              placeholder={loadingImage}
              src={TableIcons.editImage}
              error={TableIcons.editImage}
              alt="view-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
              onClick={() => MakePayment(row.id, service, setLoader)}
            />
          </button>

          {/* <button type="button" data-toggle="modal" className="tableactions_action">
            <Img
              placeholder={loadingImage}
              src={TableIcons.blockImage}
              error={TableIcons.blockImage}
              alt="block-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
            />
          </button> */}
        </Flex>
      ),
    },
  ];
};
