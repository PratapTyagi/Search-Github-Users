import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.gammel";
import { Doughnut2D } from ".";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// STEP 3 - Creating the JSON object to store the chart configurations
const doughnut2D = ({ data }) => {
  const chartConfigs = {
    type: "doughnut2D", // The chart type
    width: "500", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption: "Stars Per Language",
        enableSmartLabels: "1",
        startingAngle: "1",
        showPercentValues: "0",
        decimals: "1",
        useDataPlotColorForLabels: "0",
        theme: "gammel",
        pieRadius: "40%",
      },
      // Chart Data
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default doughnut2D;
