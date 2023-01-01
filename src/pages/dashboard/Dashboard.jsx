import { Box } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import Heading from "../../components/Heading";
import Stats from "./Stats";
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
import faker from "faker";
import PageTitle from "../../components/PageTitle";
import { useEffect, useState } from "react";
import { get } from "../../services/DashboardService";
import LineGraph from "../../components/LineGraph";
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

function Dashboard() {
  const [labels, setLabel] = useState([]);
  const [value, setValue] = useState([]);

  const [loader, setLoader] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await get();
      debugger;
      let labels = response.data.data.monthlyIncome.map((item) => {
        return item.month;
      });
      let dashboardChartData = response.data.data.monthlyIncome.map((item) => {
        return item.value;
      });

      setLoader(true);
      setLabel(labels);

      setValue(dashboardChartData);
    })();
  }, []); //eslint-disable-line

  const data = {
    labels,
    datasets: [
      {
        label: "Orders",
        data: value,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        position: "top left",
        text: "Chart.js Bar Chart",
      },
    },
  };

  return (
    <div>
      <PageTitle title={"Dashboard"} location={window.location.href} />
      <DashboardHeading text={"Dashboard"} />
      <Stats />
      <Box
        marginTop={"30px"}
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
          text="Todays Orders"
        />
        <Bar options={options} data={data} />
      </Box>
      <LineGraph />
    </div>
  );
}

export default Dashboard;
