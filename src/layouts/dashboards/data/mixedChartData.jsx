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

const mixedChartData = {
  labels: ["สำนักงานใหญ่", "อุดรธานี", "สีคิ้ว", "ศรีราชา", "ภูเก็ต", "เพชรบุรี"],
  datasets: [
    {
      chartType: "thin-bar",
      label: "Organic Search",
      color: "info",
      data: [50, 40, 300, 220, 500, 250],
    },
    {
      chartType: "default-line",
      label: "Referral",
      color: "success",
      data: [70, 60, 320, 240, 520, 270],
    },
  ],
};

export default mixedChartData;
