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

/* eslint-disable no-dupe-keys */
// Soft UI Dashboard PRO React helper functions
import rgba from "assets/theme/functions/rgba";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

const { gradients } = colors;

function configs(color, labels, label, data, chartColor) {
  const finalColor = chartColor || color;
  return {
    data: {
      labels,
      datasets: [
        {
          label,
          tension: 0.3,
          pointRadius: 2,
          pointBackgroundColor: gradients[finalColor] ? gradients[finalColor].main : gradients.info.main,
          borderColor: gradients[finalColor] ? gradients[finalColor].main : gradients.info.main,
          borderWidth: 2,
          backgroundColor: gradients[finalColor]
            ? rgba(gradients[finalColor].main, 0.1)
            : rgba(gradients.dark.main, 0.1),
          maxBarThickness: 6,
          fill: true,
          data,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
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
            font: {
              family: typography.fontFamily,
            },
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
            color: "#252f40",
            padding: 10,
            font: {
              family: typography.fontFamily,
            },
          },
        },
        y: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            color: "#9ca2b7",
            font: {
              family: typography.fontFamily,
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            color: "#9ca2b7",
            font: {
              family: typography.fontFamily,
            },
          },
        },
      },
    },
  };
}

export default configs;
