/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.3
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Pie } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// PieChart configurations
import configs from "examples/Charts/PieChart/configs";

function PieChart({ title = "", description = "", height = "19.125rem", chart, options: customOptions, plugins, showLabels = false }) {
  const { data, options: defaultOptions } = configs(chart.labels || [], chart.datasets || {});
  
  // Create datalabels options if showLabels is true
  const datalabelsOptions = showLabels ? {
    display: true,
    color: 'white',
    font: {
      family: 'Anuphan, sans-serif',
      weight: 'bold',
      size: 12
    },
    textAlign: 'center',
    textBaseline: 'middle',
    formatter: function(value, context) {
      const label = context.chart.data.labels[context.dataIndex];
      const total = context.dataset.data.reduce((a, b) => a + b, 0);
      const percentage = ((value / total) * 100).toFixed(1);
      return label + '\n' + percentage + '%';
    },
    anchor: 'center',
    align: 'center'
  } : { display: false };

  // Create complete options with all settings
  const completeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} documents (${percentage}%)`;
          }
        }
      },
      datalabels: datalabelsOptions
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
        ticks: {
          display: false,
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };
  
  // Merge custom options with complete options if provided
  const finalOptions = customOptions ? {
    ...completeOptions,
    plugins: {
      ...completeOptions.plugins,
      ...customOptions.plugins
    }
  } : completeOptions;
  
  // Set plugins based on showLabels
  const finalPlugins = showLabels ? [ChartDataLabels] : (plugins || []);

  const renderChart = (
    <SoftBox p={2}>
      {title || description ? (
        <SoftBox px={description ? 1 : 0} pt={description ? 1 : 0}>
          {title && (
            <SoftBox mb={1}>
              <SoftTypography variant="h6">{title}</SoftTypography>
            </SoftBox>
          )}
          <SoftBox mb={2}>
            <SoftTypography component="div" variant="button" fontWeight="regular" color="text">
              {description}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      ) : null}
      {useMemo(
        () => (
          <SoftBox height={height}>
            <Pie data={data} options={finalOptions} plugins={finalPlugins} />
          </SoftBox>
        ),
        [chart, height, finalOptions, finalPlugins]
      )}
    </SoftBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Typechecking props for the PieChart
PieChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
  options: PropTypes.object,
  plugins: PropTypes.array,
  showLabels: PropTypes.bool,
};

export default PieChart;
