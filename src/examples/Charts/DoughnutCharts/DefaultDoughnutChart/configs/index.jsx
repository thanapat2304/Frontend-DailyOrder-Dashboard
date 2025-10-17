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
// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";

const { gradients, dark } = colors;

function configs(labels, datasets, cutout = 60, legendColor = "#ffffff") {
  const backgroundColors = [];

  if (datasets.backgroundColors) {
    datasets.backgroundColors.forEach((color) => {
      if (gradients[color]) {
        if (color === "info") {
          backgroundColors.push(gradients.info.main);
        } else {
          backgroundColors.push(gradients[color].state);
        }
      } else {
        backgroundColors.push(dark.main);
      }
    });
  } else {
    backgroundColors.push(dark.main);
  }

  return {
    data: {
      labels,
      datasets: [
        {
          label: datasets.label,
          weight: 9,
          cutout,
          tension: 0.9,
          pointRadius: 2,
          borderWidth: 2,
          backgroundColor: backgroundColors,
          fill: false,
          data: datasets.data,
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
        tooltip: {
          enabled: true,
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              family: 'Anuphan, sans-serif',
              size: 12,
              weight: 'bold'
            },
            generateLabels: function(chart) {
              const data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.labels.map((label, i) => {
                  const dataset = data.datasets[0];
                  
                  return {
                    text: `${label}`,
                    fillStyle: dataset.backgroundColor[i],
                    strokeStyle: dataset.backgroundColor[i],
                    lineWidth: 2,
                    pointStyle: 'circle',
                    hidden: false,
                    index: i,
                    fontColor: legendColor
                  };
                });
              }
              return [];
            }
          }
        }
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
    },
  };
}

export default configs;
