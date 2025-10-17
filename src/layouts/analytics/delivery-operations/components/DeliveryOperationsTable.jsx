import { useMemo } from "react";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

import DataTable from "examples/Tables/DataTable";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";
import SoftButton from "components/SoftButton";

function DeliveryOperationsTable({ 
  data, 
  loading, 
  error,
  filteredTableData,
  selectedSalesman,
  handleSalesmanChange,
  salesmanOptions,
  exportToExcel
}) {
  // Function to get filter label
  const getFilterLabel = () => {
    const parts = [];
    if (selectedSalesman) parts.push(`พนักงานขาย: ${selectedSalesman}`);
    if (parts.length > 0) {
      return `แสดงผลหลังกรอง: ${filteredTableData?.length || 0} รายการ (${parts.join(', ')})`;
    }
    return `แสดงข้อมูลการจัดส่งทั้งหมด (${data?.length || 0} รายการ)`;
  };

  // Create table data structure
  const createTableData = (data) => {
    const columns = [
      { 
        Header: "เลขที่เอกสาร", 
        accessor: "docnumber", 
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => <div style={{ whiteSpace: 'nowrap' }}>{value || "-"}</div>
      },
      { 
        Header: "วันที่เอกสาร", 
        accessor: "docdate", 
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => {
          if (!value) return <div style={{ whiteSpace: 'nowrap' }}>-</div>;
          
          // แปลงวันที่ให้แสดงเฉพาะวันที่
          let formattedDate = value;
          try {
            const date = new Date(value);
            formattedDate = date.toISOString().split('T')[0]; // แสดงเฉพาะ YYYY-MM-DD
          } catch (error) {
            // หากแปลงไม่ได้ ให้ใช้ค่าเดิม
            formattedDate = value;
          }
          
          return <div style={{ whiteSpace: 'nowrap' }}>{formattedDate}</div>;
        }
      },
      { 
        Header: "รหัสลูกค้า", 
        accessor: "custno", 
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => <div style={{ whiteSpace: 'nowrap' }}>{value || "-"}</div>
      },
      { 
        Header: "ชื่อลูกค้า", 
        accessor: "custname", 
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => <div style={{ whiteSpace: 'nowrap' }}>{value || "-"}</div>
      },
      { 
        Header: "ประเภทลูกค้า", 
        accessor: "customer_type", 
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => <div style={{ whiteSpace: 'nowrap' }}>{value || "-"}</div>
      },
      { 
        Header: "ที่อยู่จัดส่ง", 
        accessor: "shipaddress", 
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => <div style={{ whiteSpace: 'nowrap' }}>{value || "-"}</div>
      },
      { 
        Header: "สาขา", 
        accessor: "branch", 
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => <div style={{ whiteSpace: 'nowrap' }}>{value || "-"}</div>
      },
      { 
        Header: "พนักงานขาย", 
        accessor: "salesman", 
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => <div style={{ whiteSpace: 'nowrap' }}>{value || "-"}</div>
      },
    ];

    if (!Array.isArray(data)) {
      return { columns, rows: [] };
    }

    const rows = data.map((item, index) => ({
      docnumber: item?.docnumber || "-",
      docdate: item?.docdate || "-",
      custno: item?.custno || "-",
      custname: item?.custname || "-",
      shipaddress: item?.shipaddress || "-",
      customer_type: item?.customer_type || "-",
      branch: item?.branch || "-",
      salesman: item?.salesman || "-",
    }));

    return { columns, rows };
  };


  if (loading) {
    return (
      <SoftBox display="flex" justifyContent="center" alignItems="center" py={4}>
        <SoftTypography variant="h6" color="secondary">
          กำลังโหลดข้อมูล...
        </SoftTypography>
      </SoftBox>
    );
  }

  if (error) {
    return (
      <SoftBox display="flex" justifyContent="center" alignItems="center" py={4}>
        <SoftTypography variant="h6" color="error">
          {error}
        </SoftTypography>
      </SoftBox>
    );
  }

  if (!data || data.length === 0) {
    return (
      <SoftBox display="flex" justifyContent="center" alignItems="center" py={4}>
        <SoftTypography variant="h6" color="secondary">
          ไม่พบข้อมูลสำหรับการค้นหานี้
        </SoftTypography>
      </SoftBox>
    );
  }

  return (
    <>
      {/* Filter Dropdowns */}
      <SoftBox p={3} lineHeight={1}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} lg={12}>
            <SoftBox display="flex" flexDirection="column">
              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <SoftTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  กรองตามพนักงานขาย
                </SoftTypography>
              </SoftBox>
              <SoftSelect
                placeholder="เลือกพนักงานขาย"
                options={salesmanOptions}
                value={selectedSalesman ? { value: selectedSalesman, label: selectedSalesman } : null}
                onChange={handleSalesmanChange}
                isClearable={true}
                isSearchable={true}
                size="small"
              />
            </SoftBox>
          </Grid>
        </Grid>
        
        {/* Filter Summary */}
        <SoftBox mt={2}>
          <SoftTypography variant="caption" color="text">
            {getFilterLabel()}
          </SoftTypography>
        </SoftBox>
        
        {/* Export Button */}
        <SoftBox mt={1}>
          <SoftButton
            onClick={exportToExcel}
            disabled={!filteredTableData || filteredTableData.length === 0}
            sx={{ 
              minWidth: '35px', 
              height: '16px', 
              fontSize: '0.6em',
              fontWeight: 300,
              backgroundColor: '#097640',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              boxShadow: '0 2px 4px rgba(9, 118, 64, 0.2)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#075a32',
                boxShadow: '0 4px 8px rgba(9, 118, 64, 0.3)',
                transform: 'translateY(-1px)'
              },
              '&:active': {
                transform: 'translateY(0px)',
                boxShadow: '0 2px 4px rgba(9, 118, 64, 0.2)'
              },
              '&:disabled': {
                backgroundColor: '#cccccc',
                color: '#666666',
                boxShadow: 'none',
                transform: 'none'
              }
            }}
          >
            Excel
          </SoftButton>
        </SoftBox>
      </SoftBox>
      
      <DataTable 
        table={createTableData(filteredTableData || [])} 
        canSearch 
        bodyHeight="615px"
        enableOverflow={true}
        showVerticalBorders={false}
        tableLayout="auto"
        entriesPerPage={{
          defaultValue: 10,
          entries: [10, 20, 50, 100]
        }}
      />
    </>
  );
}

// Typechecking props
DeliveryOperationsTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  filteredTableData: PropTypes.array,
  selectedSalesman: PropTypes.string,
  handleSalesmanChange: PropTypes.func,
  salesmanOptions: PropTypes.array,
  exportToExcel: PropTypes.func,
};

export default DeliveryOperationsTable;
