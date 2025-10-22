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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useState, useEffect } from "react";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftSnackbar from "components/SoftSnackbar";
import SoftTypography from "components/SoftTypography";
import SoftDatePicker from "components/SoftDatePicker";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultStatisticsCard from "examples/Cards/StatisticsCards/DefaultStatisticsCard";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import MixedChart from "examples/Charts/MixedChart";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import { API_BASE_URL } from "config/api";
import PieChart from "examples/Charts/PieChart";

// Components
import TopProduct from "layouts/dashboards/components/TopProduct";

// Data
import horizontalBarChartData from "layouts/dashboards/data/horizontalBarChartData";
import mixedChartData from "layouts/dashboards/data/mixedChartData";
import defaultDoughnutChartData from "layouts/dashboards/data/defaultDoughnutChartData";
import gradientLineChartData from "layouts/dashboards/data/gradientLineChartData";
import pieChartData from "layouts/dashboards/data/pieChartData";

// Icon
import Truck from "examples/Icons/Truck";
import Forklift from "examples/Icons/Forklift";
import Customer from "examples/Icons/Customer";
import Trending from "examples/Icons/Trending";

function Overview() {
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for system announcement snackbar
  const [showAnnouncementSB, setShowAnnouncementSB] = useState(false);
  
  // State for the date used in WHERE clause from backend
  const [dateUsed, setDateUsed] = useState(null);
  
  // State for selected date from DatePicker
  const [selectedDate, setSelectedDate] = useState(null);

  // Helper: format Date/string to YYYY-MM-DD
  const formatToYMD = (value) => {
    if (!value) return null;
    // If already in YYYY-MM-DD, return as is
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return null;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // Fetch dashboard data from API
  const fetchDashboardData = async (customDate = null) => {
    try {
      setLoading(true);
      let url = `${API_BASE_URL}/api/dashboard`;
      
      // If custom date is provided, send it as query parameter
      if (customDate) {
        url += `?custom_date=${encodeURIComponent(customDate)}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setDashboardData(data);
      setDateUsed(data.data?.date_used || null);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    // Only use date from URL; do NOT fallback to localStorage (new tab should use backend logic)
    const params = new URLSearchParams(window.location.search);
    const urlDate = params.get('custom_date');
    const initialDate = formatToYMD(urlDate);
    if (initialDate) {
      setSelectedDate(initialDate);
      fetchDashboardData(initialDate);
    } else {
      fetchDashboardData();
    }
  }, []);

  // Show announcement snackbar when component mounts
  useEffect(() => {
    setShowAnnouncementSB(true);
  }, []);

  // Close announcement snackbar
  const closeAnnouncementSB = () => setShowAnnouncementSB(false);

  // Function to get dynamic date based on backend data
  const getDynamicDate = () => {
    // Use the actual date from backend if available
    if (dateUsed) {
      const [year, month, day] = dateUsed.split('-');
      const buddhistYear = parseInt(year) + 543;
      
      const monthNames = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
      ];
      
      return `${parseInt(day)} ${monthNames[parseInt(month) - 1]} ${buddhistYear}`;
    }
    
    // Fallback to current time calculation
    const now = new Date();
    const currentHour = now.getHours();
    const weekday = now.getDay(); // 0=Sun,1=Mon,...,5=Fri,6=Sat

    const addDays = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

    let targetDate;
    if (weekday === 5) {
      // Friday: before noon = Fri, after noon = Mon
      targetDate = currentHour < 12 ? now : addDays(now, 3);
    } else if (weekday === 6) {
      // Saturday: both = Mon
      targetDate = addDays(now, 2);
    } else if (weekday === 0) {
      // Sunday: both = Mon
      targetDate = addDays(now, 1);
    } else {
      // Mon-Thu: before noon = today, after noon = tomorrow
      targetDate = currentHour < 12 ? now : addDays(now, 1);
    }
    
    const day = targetDate.getDate();
    const month = targetDate.getMonth() + 1; // getMonth() returns 0-11
    const year = targetDate.getFullYear() + 543; // Convert to Buddhist year
    
    const monthNames = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    
    return `${day} ${monthNames[month - 1]} ${year}`;
  };

  // Show loading state
  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftBox display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <SoftBox>Loading dashboard data...</SoftBox>
          </SoftBox>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftBox display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <SoftBox color="error">Error loading dashboard: {error}</SoftBox>
          </SoftBox>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    );
  }

  // Get data for charts
  const mattypeChartData = dashboardData?.data?.mattype_chart || defaultDoughnutChartData;
  const savingGroupChartData = dashboardData?.data?.saving_group_chart || horizontalBarChartData;
  const branchChartData = dashboardData?.data?.branch_chart || mixedChartData;
  const topProductsData = dashboardData?.data?.top_products || [];
  const salesTerritoryChartData = dashboardData?.data?.sales_territory_chart || pieChartData;
  const monthlySummaryChartData = dashboardData?.data?.monthly_summary_chart || gradientLineChartData;

  // KPI metrics from backend stats
  const stats = dashboardData?.data?.stats;
  const statsPct = dashboardData?.data?.stats_pct || {};

  const formatPct = (v) => {
    if (v === null || v === undefined || Number.isNaN(v)) return "0.00%";
    const num = Number(v);
    const sign = num >= 0 ? "+" : "";
    return `${sign}${num.toFixed(2)}%`;
  };

  // Compact formatter for revenue: show k / M; if < 1k show integer only
  const formatRevenueCompact = (value) => {
    const n = Number(value) || 0;
    const abs = Math.abs(n);
    if (abs >= 1_000_000) {
      const v = (n / 1_000_000).toFixed(1);
      return `฿${v.endsWith('.0') ? v.slice(0, -2) : v}M`;
    }
    if (abs >= 1_000) {
      const v = (n / 1_000).toFixed(1);
      return `฿${v.endsWith('.0') ? v.slice(0, -2) : v}k`;
    }
    return `฿${Math.round(n).toLocaleString()}`;
  };
  const totalBills = stats?.total_bills ?? 0;
  const totalItems = stats?.total_items ?? 0;
  const totalCustomers = stats?.total_customers ?? 0;
  const totalRevenue = stats?.total_revenue ?? 0;

  const currentDateValue = selectedDate || dateUsed || null;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      
      {/* System Announcement Snackbar */}
      <SoftSnackbar
        color="dark"
        icon="notifications"
        title="ประกาศจากระบบ Dashboard"
        content={`ขณะนี้แสดงข้อมูล Order ของวันที่ ${getDynamicDate()}\nระบบจะทำการ อัปเดตข้อมูลอัตโนมัติ วันละ 1 ครั้ง เวลา 12:00 น. และข้อมูลที่แสดงเป็น ข้อมูลล่วงหน้าของวันถัดไป (Next Day Data)`}
        dateTime="เมื่อเปิดหน้า"
        open={showAnnouncementSB}
        onClose={closeAnnouncementSB}
        close={closeAnnouncementSB}
        position="top-center"
        autoHideDuration={15000}
        titleVariant="h5"
      />
      
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={6} md={4} lg={2}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftDatePicker
                options={{ dateFormat: "Y-m-d" }}
                input={{
                  icon: { component: <Icon>date_range</Icon>, direction: "right" },
                }}
                {...(currentDateValue ? { value: currentDateValue } : {})}
                onChange={(dates) => {
                  console.log('DatePicker onChange - dates:', dates);
                  const selectedDateValue = dates && dates[0] ? dates[0] : null;
                  console.log('DatePicker onChange - selectedDateValue:', selectedDateValue);
                  
                  if (selectedDateValue) {
                  const ymd = formatToYMD(selectedDateValue);
                  if (ymd) {
                    setSelectedDate(ymd);
                    // Reflect in URL without reload (persistence across refreshes)
                    const params = new URLSearchParams(window.location.search);
                    params.set('custom_date', ymd);
                    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
                    // Fetch new data with the selected date (YYYY-MM-DD)
                    fetchDashboardData(ymd);
                  }
                  }
                }}
              />
            </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <DefaultStatisticsCard
                title="Total Bills"
                count={totalBills.toLocaleString()}
                iconComponent={Truck}
                iconSize={72}
                iconTop="50%"
                iconColor="#4b97eeff" 
                percentage={{
                  color: (statsPct.bills_pct ?? 0) >= 0 ? "success" : "softRad",
                  value: formatPct(statsPct.bills_pct ?? 0),
                  label: "vs yesterday",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DefaultStatisticsCard
                title="Total Item"
                count={totalItems.toLocaleString()}
                iconComponent={Forklift}
                iconSize={72}
                iconTop="50%"
                iconColor="#52e261ff" 
                percentage={{
                  color: (statsPct.items_pct ?? 0) >= 0 ? "success" : "softRad",
                  value: formatPct(statsPct.items_pct ?? 0),
                  label: "vs yesterday",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DefaultStatisticsCard
                title="Total Customer"
                count={totalCustomers.toLocaleString()}
                iconComponent={Customer}
                iconSize={72}
                iconTop="50%"
                iconColor="#f89c45ff"
                percentage={{
                  color: (statsPct.customers_pct ?? 0) >= 0 ? "success" : "softRad",
                  value: formatPct(statsPct.customers_pct ?? 0),
                  label: "vs yesterday",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DefaultStatisticsCard
                title="Total Revenue"
                count={formatRevenueCompact(totalRevenue)}
                iconComponent={Trending}
                iconSize={72}
                iconTop="50%"
                iconColor="#9f70f0ff"
                percentage={{
                  color: (statsPct.revenue_pct ?? 0) >= 0 ? "success" : "softRad",
                  value: formatPct(statsPct.revenue_pct ?? 0),
                  label: "vs yesterday",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={0}>
              <Grid item xs={12} md={12} lg={3} sx={{ pr: { lg: 1.5 } }}>
                <SoftBox mb={3}>
                  <DefaultDoughnutChart 
                    title="Product Type" 
                    chart={mattypeChartData} 
                  />
                </SoftBox>
                <SoftBox 
                  sx={{ 
                    my: 2,
                    height: "1px",
                    backgroundColor: "rgba(206, 196, 196, 0.34)",
                    width: "100%"
                  }} 
                />
                <HorizontalBarChart 
                  title="Storage Room" 
                  chart={savingGroupChartData} 
                  barThickness={20}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={6} sx={{ 
                position: "relative",
                pl: { lg: 1.5 },
                pr: { lg: 1.5 },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "5%",
                  bottom: "5%",
                  width: "1px",
                  backgroundColor: "rgba(206, 196, 196, 0.34)",
                  display: { xs: "none", lg: "block" }
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  right: 0,
                  top: "5%",
                  bottom: "5%",
                  width: "1px",
                  backgroundColor: "rgba(206, 196, 196, 0.34)",
                  display: { xs: "none", lg: "block" }
                }
              }}>
                <MixedChart 
                  title="Orders by Branch" 
                  height="19.12rem" 
                  chart={branchChartData} 
                  barWidth={25}
                  options={{
                    plugins: {
                      tooltip: {
                        filter: (ctx) => ctx.datasetIndex === 0,
                      },
                    },
                  }}
                />
                <SoftBox 
                  sx={{ 
                    my: 2,
                    height: "1px",
                    backgroundColor: "rgba(206, 196, 196, 0.34)",
                    width: "100%"
                  }} 
                />
                <GradientLineChart 
                  title="Monthly Bills (This year vs Last year)" 
                  chart={monthlySummaryChartData}
                  tension={0} 
                  showPoints={true}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={3} sx={{ pl: { lg: 1.5 } }}>
                <SoftBox mb={3}>
                  <TopProduct height="312px" data={topProductsData} />
                </SoftBox>
                <SoftBox 
                  sx={{ 
                    my: 2,
                    height: "1px",
                    backgroundColor: "rgba(206, 196, 196, 0.34)",
                    width: "100%"
                  }} 
                />
                <PieChart 
                  title="Territory-wise Bill Ratio" 
                  chart={salesTerritoryChartData}
                  showLabels={true}
                />
              </Grid>
            </Grid>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
