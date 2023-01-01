import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import { FontFamily } from "../constants/FontFamily";
import { HeadingFontSizes } from "../constants/HeadingFontSizes";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import Heading from "./Heading";
import { get } from "../services/DashboardService";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineGraph() {
  useEffect(() => {
    (async () => {
      const response = await get();
      debugger;

      let labels1 = response.data.data.ordersByMonth.map((item) => {
        return item.month;
      });
      let dashboardChartData1 = response.data.data.ordersByMonth.map((item) => {
        return item.value;
      });

      setLabels(labels1);
      setValue1(dashboardChartData1);
    })();
  }, []); //eslint-disable-line
  const [labels, setLabels] = useState();
  const [value1, setValue1] = useState([]);
  const options1 = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart - Multi Axis",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data1 = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: value1,

        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
    ],
  };
  return (
    <div>
      <Box
        marginTop={"30px"}
        marginBottom={"30px"}
        boxShadow={"0 0 18px #00000014"}
        borderRadius={"6px"}
        padding={"70px 45px"}
      >
        <Heading
          fontSize={HeadingFontSizes.heading_2}
          color={Colors.heading_primary_color}
          fontFamily={FontFamily.primary_font_black}
          fontWeight="800"
          margin="0 0 60px 0"
          text="Monthly Reports"
        />
        <Line options={options1} data={data1} />
      </Box>
    </div>
  );
}

export default LineGraph;
