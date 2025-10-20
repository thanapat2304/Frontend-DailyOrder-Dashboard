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
import ProductDeliveryTable from "./components/ProductDeliveryTable";

function ProductDelivery() {

  // State สำหรับเก็บข้อมูล hub dropdown
  const [hubOptions, setHubOptions] = useState([]);
  const [selectedHub, setSelectedHub] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rows, setRows] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  // Customer dropdown removed from header
  // Salesman dropdown (header) - removed

  // Filter states
  const [selectedCustomerType, setSelectedCustomerType] = useState("");
  const [selectedSalesman, setSelectedSalesman] = useState(""); // keep for table-level filter only


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

  // customer-dropdown effect removed

  // ดึงรายการพนักงานขายสำหรับ dropdown (removed)

  // สร้างตัวเลือกสำหรับ filter dropdowns
  const customerFilterOptions = useMemo(() => {
    // ถ้าเลือกพนักงานขายแล้ว ให้แสดงเฉพาะลูกค้าที่เกี่ยวข้องกับพนักงานขายนั้น
    let filteredRows = rows;
    if (selectedSalesman) {
      filteredRows = rows.filter(item => item.salesman === selectedSalesman);
    }
    
    const customers = [...new Set(filteredRows.map(item => item.custname))];
    return customers.map(customer => ({ value: customer, label: customer }));
  }, [rows, selectedSalesman]);

  const salesmanOptions = useMemo(() => {
    // ถ้าเลือกลูกค้าแล้ว ให้แสดงเฉพาะพนักงานที่เกี่ยวข้องกับลูกค้านั้น
    let filteredRows = rows;
    if (selectedCustomerType) {
      filteredRows = rows.filter(item => item.custname === selectedCustomerType);
    }
    
    const salesmen = [...new Set(filteredRows.map(item => item.salesman))];
    return salesmen.map(salesman => ({ value: salesman, label: salesman }));
  }, [rows, selectedCustomerType]);

  // กรองข้อมูลตามตัวเลือกที่เลือก
  const filteredTableData = useMemo(() => {
    return rows.filter(item => {
      const customerMatch = !selectedCustomerType || item.custname === selectedCustomerType;
      const salesmanMatch = !selectedSalesman || item.salesman === selectedSalesman;
      
      return customerMatch && salesmanMatch;
    });
  }, [rows, selectedCustomerType, selectedSalesman]);

  // ฟังก์ชันเปลี่ยนค่า hub dropdown
  const handleHubChange = (value) => {
    const newValue = value && typeof value === "object" && value.value ? value.value : value;
    setSelectedHub(newValue || "");
  };
  
  // const handleSalesFilterChange = () => {}; // removed

  // ฟังก์ชันจัดการการเปลี่ยนแปลงตัวเลือก filter
  const handleCustomerTypeChange = (option) => {
    const newCustomer = option ? option.value : "";
    setSelectedCustomerType(newCustomer);
    // คงค่าพนักงานขายไว้ ถ้ายังสอดคล้องกับลูกค้าที่เลือกอยู่
    if (selectedSalesman) {
      const stillValid = rows.some(
        (item) => (!newCustomer || item.custname === newCustomer) && item.salesman === selectedSalesman
      );
      if (!stillValid) setSelectedSalesman("");
    }
  };

  const handleSalesmanChange = (option) => {
    const newSalesman = option ? option.value : "";
    setSelectedSalesman(newSalesman);
    // คงค่าลูกค้าไว้ ถ้ายังสอดคล้องกับพนักงานขายที่เลือกอยู่
    if (selectedCustomerType) {
      const stillValid = rows.some(
        (item) => (!newSalesman || item.salesman === newSalesman) && item.custname === selectedCustomerType
      );
      if (!stillValid) setSelectedCustomerType("");
    }
  };



  // ฟังก์ชัน Export to Excel สำหรับ Product Delivery
  const exportToExcel = () => {
    // เตรียมข้อมูลสำหรับ Excel ตามคอลัมน์ที่แสดงในตาราง
    const headers = [
      "ลูกค้า", "เลขที่เอกสาร", "สินค้า", "จำนวน", "หน่วย"
    ];
    
    // สร้างข้อมูลสำหรับ Excel
    const excelData = [
      headers,
      ...filteredTableData.map(item => {
        return [
          `${item.custno || '-'} | ${item.custname || '-'}`,
          `${item.dt || '-'} ${item.docno || '-'}`,
          `${item.product_code || '-'} | ${item.product_name || '-'}`,
          item.unit_sale || '-',
          item.uom_sale || '-'
        ];
      })
    ];

    // สร้าง Workbook และ Worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    
    // กำหนดความกว้างของคอลัมน์
    const colWidths = [
      { wch: 30 }, // ลูกค้า
      { wch: 20 }, // เลขที่เอกสาร
      { wch: 50 }, // สินค้า
      { wch: 10 }, // จำนวน
      { wch: 10 }  // หน่วย
    ];
    ws['!cols'] = colWidths;

    // เพิ่ม Worksheet เข้าไปใน Workbook
    XLSX.utils.book_append_sheet(wb, ws, "ข้อมูลการจัดส่งสินค้า");

    // สร้างไฟล์ Excel และดาวน์โหลด
    const fileName = `product_delivery_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const handleSearch = async () => {
    if (!selectedHub || !selectedDate) return;
    try {
      setTableLoading(true);
      setError(null);
      // แก้ไขปัญหา timezone โดยใช้ local date
      const date = new Date(selectedDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      console.log('Selected date:', selectedDate);
      console.log('Formatted date string:', dateStr);
      
      let url = `${API_BASE_URL}/api/product-delivery?wh=${encodeURIComponent(selectedHub)}&date=${dateStr}`;
      // if (selectedCustomer) { // This line is removed
      //   url += `&customer=${encodeURIComponent(selectedCustomer)}`; // This line is removed
      // }
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
                onChange={(dates) => {
                  console.log('DatePicker onChange - dates:', dates);
                  const selectedDateValue = dates && dates[0] ? dates[0] : null;
                  console.log('DatePicker onChange - selectedDateValue:', selectedDateValue);
                  setSelectedDate(selectedDateValue);
                }}
              />
            </SoftBox>
          </Grid>
          {/* Customer dropdown removed */}
          {/* Salesman dropdown removed */}
          <Grid item xs={12} sm={2.4}>
            <SoftBox height="100%" display="flex" alignItems="flex-end">
              <SoftButton 
                color="info" 
                size="small"
                onClick={handleSearch}
                disabled={loading || !selectedHub || !selectedDate}
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
                  📋 ข้อมูลการส่งสินค้า
              </SoftTypography>
              <SoftTypography variant="body2" color="text" mb={3}>
                  กรุณาเลือกสาขา และวันที่ เพื่อค้นหาข้อมูล
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        )}

        {/* แสดง Card เฉพาะเมื่อมีการค้นหาข้อมูลแล้ว */}
        {(rows.length > 0 || tableLoading || error) && (
          <Card>
            <SoftBox p={0}>
              <ProductDeliveryTable 
                data={rows}
                loading={tableLoading}
                error={error}
                filteredTableData={filteredTableData}
                selectedCustomerType={selectedCustomerType}
                handleCustomerTypeChange={handleCustomerTypeChange}
                customerOptions={customerFilterOptions}
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

export default ProductDelivery;
