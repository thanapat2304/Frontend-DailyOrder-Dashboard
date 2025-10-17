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
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";

// React hooks
import { useState, useEffect, useMemo } from "react";

// Import XLSX library for Excel export
import * as XLSX from 'xlsx';

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftSelect from "components/SoftSelect";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftDatePicker from "components/SoftDatePicker";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { API_BASE_URL } from "config/api";

// components
import DeliveryOperationsTable from "./components/DeliveryOperationsTable";

function DeliveryOperations() {

  // State สำหรับเก็บข้อมูล hub dropdown
  const [hubOptions, setHubOptions] = useState([]);
  const [selectedHub, setSelectedHub] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rows, setRows] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  // Filter states
  const [selectedSalesman, setSelectedSalesman] = useState("");

  // ดึงข้อมูล hub dropdown จาก API
  useEffect(() => {
    const fetchHubDropdown = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // เรียก API เพื่อดึงข้อมูลจากตาราง hub_dropdown
        const response = await fetch(`${API_BASE_URL}/api/hub-dropdown`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // แปลงข้อมูลให้เป็นรูปแบบที่ SoftSelect ต้องการ
        const options = data.map(item => ({
          value: item.wh,
          label: item.wh
        }));
        
        setHubOptions(options);
        
      } catch (err) {
        console.error('Error fetching hub dropdown:', err);
        setError('ไม่สามารถโหลดข้อมูลคลังสินค้าได้');
        
        // ใช้ข้อมูล fallback หาก API ล้มเหลว
        setHubOptions([
          { value: "สำนักงานใหญ่", label: "สำนักงานใหญ่" },
          { value: "สาขาศรีราชา", label: "สาขาศรีราชา" },
          { value: "สาขาอุดรธานี", label: "สาขาอุดรธานี" },
          { value: "สาขาเพชรบุรี", label: "สาขาเพชรบุรี" },
          { value: "สาขาภูเก็ต", label: "สาขาภูเก็ต" },
          { value: "สาขาสีคิ้ว", label: "สาขาสีคิ้ว" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchHubDropdown();
  }, []);


  const salesmanOptions = useMemo(() => {
    const salesmen = [...new Set(rows.map(item => item.salesman))];
    return salesmen.map(salesman => ({ value: salesman, label: salesman }));
  }, [rows]);

  // กรองข้อมูลตามตัวเลือกที่เลือก
  const filteredTableData = useMemo(() => {
    return rows.filter(item => {
      const salesmanMatch = !selectedSalesman || item.salesman === selectedSalesman;
      
      return salesmanMatch;
    });
  }, [rows, selectedSalesman]);

  // ฟังก์ชันเปลี่ยนค่า hub dropdown
  const handleHubChange = (value) => {
    const newValue = value && typeof value === "object" && value.value ? value.value : value;
    setSelectedHub(newValue || "");
  };


  const handleSalesmanChange = (option) => {
    setSelectedSalesman(option ? option.value : "");
  };

  // ฟังก์ชัน Export to Excel
  const exportToExcel = () => {
    // เตรียมข้อมูลสำหรับ Excel
    const headers = [
      "เลขที่เอกสาร", "วันที่เอกสาร", "รหัสลูกค้า", "ชื่อลูกค้า", 
      "ที่อยู่จัดส่ง", "ประเภทลูกค้า", "สาขา", "พนักงานขาย"
    ];
    
    // สร้างข้อมูลสำหรับ Excel
    const excelData = [
      headers,
      ...filteredTableData.map(item => {
        // แปลงวันที่ให้แสดงเฉพาะวันที่
        let formattedDate = item.docdate;
        if (item.docdate) {
          try {
            const date = new Date(item.docdate);
            formattedDate = date.toISOString().split('T')[0]; // แสดงเฉพาะ YYYY-MM-DD
          } catch (error) {
            formattedDate = item.docdate; // หากแปลงไม่ได้ ให้ใช้ค่าเดิม
          }
        }
        
        return [
          item.docnumber,
          formattedDate,
          item.custno,
          item.custname,
          item.shipaddress,
          item.customer_type,
          item.branch,
          item.salesman
        ];
      })
    ];

    // สร้าง Workbook และ Worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    
    // กำหนดความกว้างของคอลัมน์
    const colWidths = [
      { wch: 15 }, // เลขที่เอกสาร
      { wch: 12 }, // วันที่เอกสาร
      { wch: 12 }, // รหัสลูกค้า
      { wch: 25 }, // ชื่อลูกค้า
      { wch: 30 }, // ที่อยู่จัดส่ง
      { wch: 15 }, // ประเภทลูกค้า
      { wch: 15 }, // สาขา
      { wch: 20 }  // พนักงานขาย
    ];
    ws['!cols'] = colWidths;

    // เพิ่ม Worksheet เข้าไปใน Workbook
    XLSX.utils.book_append_sheet(wb, ws, "ข้อมูลการจัดส่ง");

    // สร้างไฟล์ Excel และดาวน์โหลด
    const fileName = `delivery_operations_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const handleSearch = async () => {
    if (!selectedHub || !selectedDate) return;
    try {
      setTableLoading(true);
      setError(null);
      const dateStr = new Date(selectedDate).toISOString().slice(0, 10);
      const url = `${API_BASE_URL}/api/delivery-operations?wh=${selectedHub}&date=${dateStr}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError("ไม่สามารถโหลดข้อมูลได้");
      setRows([]);
    } finally {
      setTableLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <SoftTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  Branch
                </SoftTypography>
              </SoftBox>
              <SoftSelect
                placeholder={loading ? "กำลังโหลด..." : "เลือกสาขา"}
                options={hubOptions}
                value={selectedHub ? { value: selectedHub, label: selectedHub } : null}
                onChange={handleHubChange}
                disabled={loading}
                isClearable={true}
                isSearchable={true}
              />
              {error && (
                <SoftTypography variant="caption" color="error" mt={0.5}>
                  {error}
                </SoftTypography>
              )}
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={3}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <SoftTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  Date
                </SoftTypography>
              </SoftBox>
              <SoftDatePicker
                value={selectedDate}
                options={{ dateFormat: "Y-m-d" }}
                onChange={(dates) => setSelectedDate(dates && dates[0] ? dates[0] : null)}
              />
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={1}>
            <SoftBox height="100%" display="flex" alignItems="flex-end">
              <SoftButton 
                color="info" 
                size="small"
                onClick={handleSearch}
                disabled={loading || !selectedHub}
              >
                Search
              </SoftButton>
            </SoftBox>
          </Grid>
        </Grid>
        <Divider />

        {/* แสดงข้อความแนะนำเมื่อยังไม่มีการค้นหา */}
        {rows.length === 0 && !tableLoading && !error && (
          <SoftBox 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            py={8}
            px={3}
          >
            <SoftBox textAlign="center">
              <SoftTypography variant="h5" color="secondary" fontWeight="medium" mb={2}>
                📋 ข้อมูลการจัดส่ง
              </SoftTypography>
              <SoftTypography variant="body2" color="text" mb={3}>
                กรุณาเลือกสาขาและวันที่เพื่อค้นหาข้อมูลการจัดส่ง
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        )}

        {/* แสดง Card เฉพาะเมื่อมีการค้นหาข้อมูลแล้ว */}
        {(rows.length > 0 || tableLoading || error) && (
          <Card>
            <SoftBox p={0}>
              <DeliveryOperationsTable 
                data={rows}
                loading={tableLoading}
                error={error}
                filteredTableData={filteredTableData}
                selectedSalesman={selectedSalesman}
                handleSalesmanChange={handleSalesmanChange}
                salesmanOptions={salesmanOptions}
                exportToExcel={exportToExcel}
              />
            </SoftBox>
          </Card>
        )}
      </SoftBox>
    </DashboardLayout>
  );
}

export default DeliveryOperations;
