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

import { useMemo, useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import { useMediaQuery, useTheme } from "@mui/material";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";
import SoftInput from "components/SoftInput";
import SoftPagination from "components/SoftPagination";

// Soft UI Dashboard PRO React example components
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";


function DataTable({
  entriesPerPage = { defaultValue: 10, entries: [10, 20, 50, 100] },
  canSearch = false,
  showTotalEntries = true,
  table,
  pagination = { variant: "gradient", color: "info" },
  isSorted = true,
  noEndBorder = false,
  maxHeight = null, // เพิ่ม prop สำหรับความสูงสูงสุด
  height = null, // เพิ่ม prop สำหรับความสูงตายตัว
  bodyHeight = "300px", // เพิ่ม prop สำหรับความสูงของ body
  enableOverflow = false, // เพิ่ม prop สำหรับเปิด/ปิด horizontal overflow
  tableLayout = "fixed", // เพิ่ม prop สำหรับกำหนด table layout
  showVerticalBorders = true, // เพิ่ม prop สำหรับควบคุมเส้นแนวตั้ง
}) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage.entries ? entriesPerPage.entries : [10, 20, 50, 100];
  
  // ตรวจสอบขนาดหน้าจอ
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  
  // ถ้าเป็น xs ให้บังคับให้ enableOverflow = true, ถ้าไม่ใช่ใช้ค่าที่ส่งมา
  const shouldEnableOverflow = isXs ? true : enableOverflow;
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

  // Set the entries per page value based on the select value
  const setEntriesPerPage = ({ value }) => setPageSize(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <SoftPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </SoftPagination>
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  return (
    <TableContainer 
      sx={{ 
        boxShadow: "none", 
        backgroundColor: "dark.main",
        ...(maxHeight && { maxHeight: maxHeight, overflow: "auto" }),
        ...(height && { height: height, overflow: "auto" })
      }}
    >
      {entriesPerPage || canSearch ? (
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          {entriesPerPage && (
            <SoftBox display="flex" alignItems="center">
              <SoftSelect
                defaultValue={{ value: defaultValue, label: defaultValue }}
                options={entries.map((entry) => ({ value: entry, label: entry }))}
                onChange={setEntriesPerPage}
                size="small"
                isClearable={false}
              />
              <SoftTypography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </SoftTypography>
            </SoftBox>
          )}
          {canSearch && (
            <SoftBox width="12rem" ml="auto">
              <SoftInput
                placeholder="Search..."
                value={search}
                onChange={({ currentTarget }) => {
                  setSearch(search);
                  onSearchChange(currentTarget.value);
                }}
                sx={(theme) => ({
                  backgroundColor: `${theme.palette.dark.main} !important`,
                  borderColor: theme.palette.light.main,
                  color: theme.palette.light.main,
                  "& .MuiInputBase-input": {
                    color: theme.palette.light.main,
                    "&::placeholder": {
                      color: theme.palette.light.main,
                      opacity: 0.6,
                    },
                  },
                })}
              />
            </SoftBox>
          )}
        </SoftBox>
      ) : null}
      <SoftBox 
        sx={{ 
          maxHeight: bodyHeight, 
          overflowY: "auto",
          overflowX: shouldEnableOverflow ? "auto" : "hidden", // ใช้ shouldEnableOverflow
          position: "relative"
        }}
      >
        <Table {...getTableProps()} sx={{ 
          tableLayout: tableLayout, // ใช้ tableLayout ที่ส่งมาจาก prop
          minWidth: shouldEnableOverflow ? "1000px" : { xs: "580px", sm: "auto" }, // ใช้ shouldEnableOverflow
          width: shouldEnableOverflow ? "auto" : "100%", // ใช้ shouldEnableOverflow
          ...(showVerticalBorders ? {} : {
            "& .MuiTableCell-root": {
              borderRight: "none !important"
            }
          })
        }}>
          <SoftBox component="thead" sx={{ 
            position: "sticky", 
            top: 0, 
            zIndex: 10,
            backgroundColor: "dark.main",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "1px",
              backgroundColor: "#ffffff",
              zIndex: 11
            }
          }}>
            {headerGroups.map((headerGroup, key) => {
              const { key: hgKey, ...hgProps } = headerGroup.getHeaderGroupProps();
              return (
                <TableRow key={hgKey || key} {...hgProps}>
                  {headerGroup.headers.map((column, key) => {
                    const { key: colKey, ...colProps } = column.getHeaderProps(isSorted && column.getSortByToggleProps());
                    return (
                      <DataTableHeadCell
                        key={colKey || key}
                        {...colProps}
                        width={column.width ? column.width : "auto"}
                        align={column.align ? column.align : "left"}
                        sorted={setSortedValue(column)}
                      >
                        {column.render("Header")}
                      </DataTableHeadCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </SoftBox>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, key) => {
              prepareRow(row);
              const { key: rowKey, ...rowProps } = row.getRowProps();
              return (
                <TableRow key={rowKey || key} {...rowProps}>
                  {row.cells.map((cell, key) => {
                    const { key: cellKey, ...cellProps } = cell.getCellProps();
                    return (
                      <DataTableBodyCell
                        key={cellKey || key}
                        noBorder={noEndBorder && rows.length - 1 === key}
                        align={cell.column.align ? cell.column.align : "left"}
                        width={cell.column.width}
                        enableOverflow={shouldEnableOverflow}
                        showVerticalBorders={showVerticalBorders}
                        {...cellProps}
                      >
                        {cell.render("Cell")}
                      </DataTableBodyCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </SoftBox>

      <SoftBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <SoftBox mb={{ xs: 3, sm: 0 }}>
            <SoftTypography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </SoftTypography>
          </SoftBox>
        )}
        {pageOptions.length > 1 && (
          <SoftPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {canPreviousPage && (
              <SoftPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </SoftPagination>
            )}
            {renderPagination.length > 6 ? (
              <SoftBox width="5rem" mx={1}>
                <SoftInput
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </SoftBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <SoftPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </SoftPagination>
            )}
          </SoftPagination>
        )}
      </SoftBox>
    </TableContainer>
  );
}


// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bodyHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  enableOverflow: PropTypes.bool,
  tableLayout: PropTypes.oneOf(["fixed", "auto"]),
  showVerticalBorders: PropTypes.bool,
};

export default DataTable;
