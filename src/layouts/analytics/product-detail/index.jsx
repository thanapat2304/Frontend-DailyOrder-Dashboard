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
import ProductDetailTable from "./components/ProductDetailTable";

function ProductDetail() {

  // State สำหรับเก็บข้อมูล product dropdown (ขึ้นกับวันที่)
  const [hubOptions, setHubOptions] = useState([]);
  const [selectedHub, setSelectedHub] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rows, setRows] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

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

  // ฟังก์ชันเปลี่ยนค่า hub dropdown
  const handleHubChange = (value) => {
    const newValue = value && typeof value === "object" && value.value ? value.value : value;
    setSelectedHub(newValue || "");
  };

  // ดึงรายการสินค้าในวันที่เลือกและสาขาที่เลือก
  useEffect(() => {
    const fetchProductsByDate = async () => {
      if (!selectedDate) return;
      try {
        setLoading(true);
        setError(null);
        // แก้ไขปัญหา timezone โดยใช้ local date
        const date = new Date(selectedDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        
        console.log('fetchProductsByDate - Selected date:', selectedDate);
        console.log('fetchProductsByDate - Formatted date string:', dateStr);
        
        // สร้าง URL พร้อม branch parameter ถ้ามี
        let url = `${API_BASE_URL}/api/products-by-date?date=${dateStr}`;
        if (selectedHub) {
          url += `&branch=${encodeURIComponent(selectedHub)}`;
        }
        
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const opts = Array.isArray(data)
          ? data.map(it => ({ value: it.code, label: `${it.code} | ${it.name}` }))
          : [];
        setProductOptions(opts);
        // reset product selection if no longer present
        if (selectedProduct && !opts.find(o => o.value === selectedProduct)) {
          setSelectedProduct("");
        }
      } catch (e) {
        console.error(e);
        setError("ไม่สามารถโหลดรายการสินค้าได้");
        setProductOptions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsByDate();
  }, [selectedDate, selectedHub, API_BASE_URL]);


  // No salesman filtering; use raw rows
  const filteredTableData = useMemo(() => rows, [rows]);

  // ฟังก์ชันเปลี่ยนค่าสินค้า
  const handleProductChange = (value) => {
    const newValue = value && typeof value === "object" && value.value ? value.value : value;
    setSelectedProduct(newValue || "");
  };


  // No salesman change handler

  // ฟังก์ชัน Export to Excel (ปรับให้ตรงกับข้อมูลของหน้านี้)
  const exportToExcel = () => {
    // Header ตามตารางในหน้านี้
    const headers = [
      "Branch",
      "Storage",
      "Date",
      "Reference",
      "Qty.Out",
      "UOM",
      "Customer",
    ];

    // แถวข้อมูลจากผลลัพธ์ที่กรองแล้ว
    const detailRows = filteredTableData.map((item) => {
      let dateStr = item.document_date;
      if (item.document_date) {
        try {
          const d = new Date(item.document_date);
          dateStr = d.toISOString().split("T")[0];
        } catch (_) {
          dateStr = item.document_date;
        }
      }
      const reference = item.document_no ?? "";
      const qtyOut = Number(item.quantity_out ?? 0) || 0; // ใส่เป็นตัวเลขใน Excel
      const remark = `${item.custno ?? ''} | ${item.custname ?? ''}`.trim();
      return [
        item.branch ?? "-",
        item.storage_location ?? "-",
        dateStr ?? "-",
        reference,
        qtyOut,
        item.unit ?? "",
        remark || "-",
      ];
    });

    // Metadata ส่วนหัวไฟล์
    const metaDate = selectedDate
      ? new Date(selectedDate).toISOString().split("T")[0]
      : "";
    const productMeta = rows && rows.length > 0
      ? `${rows[0]?.matno ?? ""} ${rows[0]?.matdesc ?? ""}`.trim()
      : (selectedProduct || "");

    const metaRows = [
      ["Product Detail Export"],
      ["Date", metaDate],
      ["Product", productMeta],
      [],
      headers,
    ];

    const excelData = [...metaRows, ...detailRows];

    // สร้าง Workbook และ Worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);

    // ความกว้างคอลัมน์ให้เหมาะกับข้อมูลของหน้า
    ws["!cols"] = [
      { wch: 14 }, // Branch
      { wch: 12 }, // Store
      { wch: 12 }, // Date
      { wch: 20 }, // Reference
      { wch: 12 }, // Qty.Out
      { wch: 10 }, // UOM
      { wch: 28 }, // Customer
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Product Detail");

    const fileName = `product_detail_${metaDate || "export"}_${
      (selectedProduct || "").toString().replace(/[^\w-]+/g, "_")
    }.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const handleSearch = async () => {
    if (!selectedProduct || !selectedDate) return;
    try {
      setTableLoading(true);
      setError(null);
      // แก้ไขปัญหา timezone โดยใช้ local date
      const date = new Date(selectedDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      console.log('handleSearch - Selected date:', selectedDate);
      console.log('handleSearch - Formatted date string:', dateStr);
      
      // สร้าง URL พร้อม branch parameter ถ้ามี
      let url = `${API_BASE_URL}/api/product-detail?date=${dateStr}&product=${encodeURIComponent(selectedProduct)}`;
      if (selectedHub) {
        url += `&branch=${encodeURIComponent(selectedHub)}`;
      }
      
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
          <Grid item xs={12} lg={3}>
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
          <Grid item xs={12} lg={4}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <SoftTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  Product
                </SoftTypography>
              </SoftBox>
              <SoftSelect
                placeholder={loading ? "กำลังโหลด..." : "เลือกสินค้า"}
                options={productOptions}
                value={selectedProduct ? productOptions.find(o => o.value === selectedProduct) || null : null}
                onChange={handleProductChange}
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
          <Grid item xs={12} lg={3}>
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
          <Grid item xs={12} sm={2}>
            <SoftBox height="100%" display="flex" alignItems="flex-end">
              <SoftButton 
                color="info" 
                size="small"
                onClick={handleSearch}
                disabled={loading || !selectedProduct}
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
                กรุณาเลือกวันที่และสินค้าเพื่อค้นหาข้อมูลการจัดส่ง
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        )}

        {/* แสดง Card เฉพาะเมื่อมีการค้นหาข้อมูลแล้ว */}
        {(rows.length > 0 || tableLoading || error) && (
          <Card>
            <SoftBox p={0}>
            <ProductDetailTable 
                data={rows}
                loading={tableLoading}
                error={error}
                filteredTableData={filteredTableData}
                exportToExcel={exportToExcel}
              />
            </SoftBox>
          </Card>
        )}
      </SoftBox>
    </DashboardLayout>
  );
}

export default ProductDetail;
