import { useMemo } from "react";
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
import SoftSelect from "components/SoftSelect";
import SoftButton from "components/SoftButton";

function ProductDeliveryTable({ 
  data, 
  loading, 
  error,
  filteredTableData,
  selectedCustomerType,
  handleCustomerTypeChange,
  customerOptions,
  selectedSalesman,
  handleSalesmanChange,
  salesmanOptions,
  exportToExcel
}) {
  // Function to get filter label
  const getFilterLabel = () => {
    const parts = [];
    if (selectedCustomerType) parts.push(`ลูกค้า: ${selectedCustomerType}`);
    if (selectedSalesman) parts.push(`พนักงานขาย: ${selectedSalesman}`);
    if (parts.length > 0) {
      return `แสดงผลหลังกรอง: ${filteredTableData?.length || 0} รายการ (${parts.join(', ')})`;
    }
    return `แสดงข้อมูลการจัดส่งทั้งหมด (${data?.length || 0} รายการ)`;
  };

  // Prepare rows with real rowSpan for merged cells
  const prepareMergedRows = (data) => {
    if (!Array.isArray(data)) return [];

    const sorted = [...data].sort((a, b) => {
      const aCustomer = `${a?.custno ?? ''} | ${a?.custname ?? ''}`;
      const bCustomer = `${b?.custno ?? ''} | ${b?.custname ?? ''}`;
      if (aCustomer !== bCustomer) return aCustomer.localeCompare(bCustomer);
      const aDoc = `${a?.dt ?? ''} | ${a?.docno ?? ''}`;
      const bDoc = `${b?.dt ?? ''} | ${b?.docno ?? ''}`;
      if (aDoc !== bDoc) return aDoc.localeCompare(bDoc);
      const aProd = `${a?.product_code ?? ''} | ${a?.product_name ?? ''}`;
      const bProd = `${b?.product_code ?? ''} | ${b?.product_name ?? ''}`;
      return aProd.localeCompare(bProd);
    });

    // Compute row spans
    const rows = sorted.map((item) => ({
      customerLabel: `${item?.custno ?? '-'} | ${item?.custname ?? '-'}`,
      documentLabel: `${item?.dt ?? '-'} ${item?.docno ?? '-'}`,
      product: `${item?.product_code ?? '-'} | ${item?.product_name ?? '-'}`,
      unit_sale: item?.unit_sale ?? '-',
      uom_sale: item?.uom_sale ?? '-',
      customerRowSpan: 1,
      documentRowSpan: 1,
      showCustomer: true,
      showDocument: true,
    }));

    // Customer spans
    for (let i = 0; i < rows.length; ) {
      let j = i + 1;
      while (j < rows.length && rows[j].customerLabel === rows[i].customerLabel) j++;
      const span = j - i;
      rows[i].customerRowSpan = span;
      for (let k = i + 1; k < j; k++) rows[k].showCustomer = false;
      // Document spans inside each customer group
      let d = i;
      while (d < j) {
        let e = d + 1;
        while (e < j && rows[e].documentLabel === rows[d].documentLabel) e++;
        const dSpan = e - d;
        rows[d].documentRowSpan = dSpan;
        for (let k = d + 1; k < e; k++) rows[k].showDocument = false;
        d = e;
      }
      i = j;
    }

    return rows;
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

  const mergedRows = useMemo(() => prepareMergedRows(filteredTableData || data || []), [filteredTableData, data]);

  const borderRightStyle = '1px solid #414254';

  return (
    <>
      {/* Filter Dropdowns */}
      <SoftBox p={3} lineHeight={1}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <SoftBox display="flex" flexDirection="column">
              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <SoftTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  กรองตามลูกค้า
                </SoftTypography>
              </SoftBox>
              <SoftSelect
                placeholder="เลือกลูกค้า"
                options={customerOptions}
                value={selectedCustomerType ? { value: selectedCustomerType, label: selectedCustomerType } : null}
                onChange={handleCustomerTypeChange}
                isClearable={true}
                isSearchable={true}
                size="small"
              />
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6}>
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
        <Table size="small" stickyHeader style={{ background: '#2b2c40', tableLayout: 'fixed', width: '100%', minWidth: 1000 }}>
          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
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
              }}>ลูกค้า</TableCell>
              <TableCell style={{
                fontWeight: 700,
                background: '#2b2c40',
                color: '#e2e8f0',
                borderBottom: '#414254 1px solid',
                padding: '12px 16px',
                borderRight: borderRightStyle,
                boxSizing: 'border-box'
              }}>เลขที่เอกสาร</TableCell>
              <TableCell style={{
                fontWeight: 700,
                background: '#2b2c40',
                color: '#e2e8f0',
                borderBottom: '#414254 1px solid',
                padding: '12px 16px',
                borderRight: borderRightStyle,
                boxSizing: 'border-box'
              }}>สินค้า</TableCell>
              <TableCell style={{
                fontWeight: 700,
                background: '#2b2c40',
                color: '#e2e8f0',
                textAlign: 'right',
                borderBottom: '#414254 1px solid',
                padding: '12px 16px',
                borderRight: borderRightStyle,
                boxSizing: 'border-box'
              }}>จำนวน</TableCell>
              <TableCell style={{
                fontWeight: 700,
                background: '#2b2c40',
                color: '#e2e8f0',
                borderBottom: '#414254 1px solid',
                padding: '12px 16px',
                boxSizing: 'border-box'
              }}>หน่วย</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mergedRows.map((row, idx) => {
              const zebra = idx % 2 === 1 ? '#2f3046' : '#2b2c40';
              const customerCellStyle = {
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                verticalAlign: 'top',
                background: '#2d2e43',
                borderRight: borderRightStyle,
                borderTop: row.showCustomer ? '2px solid #414254' : undefined,
                fontWeight: 600,
                color: '#e5e7eb',
                padding: '12px 16px',
                boxSizing: 'border-box',
                width: '25%'
              };
              const documentCellStyle = {
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                verticalAlign: 'top',
                borderRight: borderRightStyle,
                borderTop: row.showDocument ? '1px dashed #414254' : undefined,
                color: '#cbd5e1',
                padding: '12px 16px',
                boxSizing: 'border-box',
                width: '15%'
              };
              return (
                <TableRow key={idx} hover style={{ background: zebra }}>
                  {row.showCustomer && (
                    <TableCell rowSpan={row.customerRowSpan} style={customerCellStyle}>
                      {row.customerLabel}
                    </TableCell>
                  )}
                  {row.showDocument && (
                    <TableCell rowSpan={row.documentRowSpan} style={documentCellStyle}>
                      {row.documentLabel}
                    </TableCell>
                  )}
                  {!row.showCustomer && !row.showDocument && null}
                  <TableCell style={{ 
                    whiteSpace: 'normal', 
                    wordWrap: 'break-word',
                    color: '#e5e7eb', 
                    padding: '12px 16px', 
                    borderRight: borderRightStyle, 
                    boxSizing: 'border-box',
                    verticalAlign: 'top',
                    width: '40%'
                  }}>{row.product}</TableCell>
                  <TableCell align="right" style={{ 
                    whiteSpace: 'nowrap', 
                    fontVariantNumeric: 'tabular-nums', 
                    color: '#e5e7eb', 
                    padding: '12px 16px', 
                    borderRight: borderRightStyle, 
                    boxSizing: 'border-box',
                    width: '10%'
                  }}>{row.unit_sale}</TableCell>
                  <TableCell style={{ 
                    whiteSpace: 'nowrap', 
                    color: '#e5e7eb', 
                    padding: '12px 16px', 
                    boxSizing: 'border-box',
                    width: '10%'
                  }}>{row.uom_sale}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

// Typechecking props
ProductDeliveryTable.propTypes = {
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

export default ProductDeliveryTable;
