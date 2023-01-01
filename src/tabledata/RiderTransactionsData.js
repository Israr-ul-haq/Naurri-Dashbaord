import moment from "moment";

export const columnNames = [
  {
    openingBalance: "",
    closingBalance: "",
    amount: "",
    paymentMode: "",
    date: "",
  },
];

export const pdfHeaders = [
  "Opening Balance",
  "Closing Balance",
  "Amount",
  "Payment Mode",
  "Date",
];

export const columns = (data, service, setLoader) => {
  return [
    {
      name: "Sr#",
      cell: (row, index) => "0" + (index + 1),
      sortable: true,
    },

    {
      name: "Opening Balance",
      cell: (row) => row["openingBalance"],
      sortable: true,
    },

    {
      name: "Closing Balance",
      selector: "closingBalance",
      sortable: true,
    },
    {
      name: "Amount",
      selector: "amount",
      sortable: true,
    },
    {
      name: "Payment Mode",
      selector: "paymentMode",
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => moment(row.date).format("DD-MM-YY"),
      sortable: true,
    },
  ];
};
