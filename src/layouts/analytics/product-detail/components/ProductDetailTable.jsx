import React, { useMemo } from "react";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

function ProductDetailTable({ 
  data, 
  loading, 
  error,
  filteredTableData,
  exportToExcel
}) {
  // Function to get filter label
  const getFilterLabel = () => {
    const filteredCount = Array.isArray(filteredTableData) ? filteredTableData.length : 0;
    const totalCount = Array.isArray(data) ? data.length : 0;
    if (filteredCount > 0 && filteredCount !== totalCount) {
      return `แสดงผลหลังกรอง: ${filteredCount} รายการ`;
    }
    return `แสดงข้อมูลการจัดส่งทั้งหมด (${totalCount} รายการ)`;
  };

  // Prepare grouped rows and totals based on Branch/Storage Location
  const buildGrouped = (items) => {
    const list = Array.isArray(items) ? items : [];
    const groups = new Map();
    let grandTotal = 0;
    list.forEach((it) => {
      const branch = it?.branch || "-";
      const store = it?.storage_location || "-";
      const key = `${branch}||${store}`;
      const qty = Number(it?.quantity_out ?? 0) || 0;
      grandTotal += qty;
      if (!groups.has(key)) {
        groups.set(key, {
          branch,
          store,
          uom: it?.unit || "",
          rows: [],
          subtotal: 0,
        });
      }
      const g = groups.get(key);
      g.subtotal += qty;
      g.rows.push({
        date: it?.document_date || "-",
        reference: it?.document_no || "-",
        qty,
        uom: it?.unit || "",
        remark: `${it?.custno ?? ''} | ${it?.custname ?? ''}`.trim() || "-",
      });
    });
    return { groups: Array.from(groups.values()), grandTotal };
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

  const { groups, grandTotal } = useMemo(() => buildGrouped(filteredTableData || data || []), [filteredTableData, data]);
  const borderRightStyle = '1px solid #414254';

  return (
    <>
      {/* Filter Summary & Export */}
      <SoftBox p={3} lineHeight={1}>
        <SoftBox>
          <SoftTypography variant="caption" color="text">
            {getFilterLabel()}
          </SoftTypography>
        </SoftBox>
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
      
      <SoftBox px={3} pb={1}>
        <SoftTypography variant="h6" color="secondary" fontWeight="bold">
          {`${data?.[0]?.matno ?? ''}  ${data?.[0]?.matdesc ?? ''}`.trim()}
        </SoftTypography>
      </SoftBox>
      <TableContainer style={{
        maxHeight: 615,
        overflowX: 'auto',
        overflowY: 'auto',
        borderRadius: 10,
        border: '1px solid #414254',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        background: '#2b2c40',
        width: '100%'
      }}>
        <Table size="small" stickyHeader style={{ background: '#2b2c40', tableLayout: 'fixed', width: '100%', minWidth: 900 }}>
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '45%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell style={{
                fontWeight: 700,
                background: '#2b2c40',
                color: '#e2e8f0',
                borderBottom: '#414254 1px solid',
                padding: '12px 16px',
                borderRight: borderRightStyle,
                boxSizing: 'border-box'
              }}>Date</TableCell>
              <TableCell style={{
                fontWeight: 700,
                background: '#2b2c40',
                color: '#e2e8f0',
                borderBottom: '#414254 1px solid',
                padding: '12px 16px',
                borderRight: borderRightStyle,
                boxSizing: 'border-box'
              }}>Reference</TableCell>
              <TableCell style={{
                fontWeight: 700,
                background: '#2b2c40',
                color: '#e2e8f0',
                textAlign: 'right',
                borderBottom: '#414254 1px solid',
                padding: '12px 16px',
                borderRight: borderRightStyle,
                boxSizing: 'border-box'
              }}>Qty.Out</TableCell>
              <TableCell style={{
                fontWeight: 700,
                background: '#2b2c40',
                color: '#e2e8f0',
                borderBottom: '#414254 1px solid',
                padding: '12px 16px',
                boxSizing: 'border-box'
              }}>Remark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.length > 0 && (
              <TableRow>
                <TableCell colSpan={4} style={{
                  background: '#2d2e43',
                  color: '#e5e7eb',
                  fontWeight: 700,
                  padding: '10px 16px',
                  borderTop: '2px solid #414254'
                }}>
                  {groups[0].branch}
                </TableCell>
              </TableRow>
            )}
            {groups.map((g, gi) => (
              <React.Fragment key={`group-${g.branch}-${g.store}-${gi}`}>
                {gi !== 0 && (
                  <TableRow key={`ghead-${gi}`}>
                    <TableCell colSpan={4} style={{
                      background: '#2d2e43',
                      color: '#e5e7eb',
                      fontWeight: 700,
                      padding: '10px 16px',
                      borderTop: '2px solid #414254'
                    }}>
                      {g.branch}
                    </TableCell>
                  </TableRow>
                )}
                {g.rows.map((r, ri) => (
                  <TableRow key={`row-${gi}-${ri}`} hover>
                    <TableCell style={{
                      whiteSpace: 'nowrap',
                      color: '#e5e7eb',
                      padding: '10px 16px',
                      borderRight: borderRightStyle,
                    }}>{r.date}</TableCell>
                    <TableCell style={{
                      whiteSpace: 'nowrap',
                      color: '#e5e7eb',
                      padding: '10px 16px',
                      borderRight: borderRightStyle,
                    }}>{r.reference}</TableCell>
                    <TableCell align="right" style={{
                      whiteSpace: 'nowrap',
                      fontVariantNumeric: 'tabular-nums',
                      color: '#e5e7eb',
                      padding: '10px 16px',
                      borderRight: borderRightStyle,
                    }}>{r.qty?.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</TableCell>
                    <TableCell style={{
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      color: '#e5e7eb',
                      padding: '10px 16px',
                    }}>{r.remark}</TableCell>
                  </TableRow>
                ))}
                <TableRow key={`gfoot-${gi}`}>
                  <TableCell colSpan={2} style={{ padding: '8px 16px' }} />
                  <TableCell align="right" style={{
                    fontWeight: 700,
                    color: '#e2e8f0',
                    padding: '8px 16px',
                    borderRight: borderRightStyle,
                  }}>{g.subtotal.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</TableCell>
                  <TableCell style={{
                    color: '#e2e8f0',
                    padding: '8px 16px'
                  }}>{g.uom || ''}</TableCell>
                </TableRow>
              </React.Fragment>
            ))}
            <TableRow>
              <TableCell colSpan={2} style={{ padding: '8px 16px' }}>
                <SoftTypography variant="button" color="secondary" fontWeight="bold">
                  Sum By Product Code
                </SoftTypography>
              </TableCell>
              <TableCell align="right" style={{
                fontWeight: 800,
                color: '#e2e8f0',
                padding: '8px 16px',
                borderRight: borderRightStyle,
              }}>{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</TableCell>
              <TableCell style={{
                color: '#e2e8f0',
                padding: '8px 16px'
              }}>{data?.[0]?.unit || ''}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

// Typechecking props
ProductDetailTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  filteredTableData: PropTypes.array,
  selectedCustomerType: PropTypes.string,
  handleCustomerTypeChange: PropTypes.func,
  customerOptions: PropTypes.array,
  selectedSalesman: PropTypes.string,
  handleSalesmanChange: PropTypes.func,
  salesmanOptions: PropTypes.array,
  exportToExcel: PropTypes.func,
};

export default ProductDetailTable;
