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

import { useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Soft UI Dashboard PRO React components
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";

// Soft UI Dashboard PRO React example components
import SalesTableCell from "examples/Tables/SalesTable/SalesTableCell";

function SalesTable({ 
  title, 
  rows = [{}], 
  maxHeight = "400px"
}) {
  const renderTableCells = rows.map((row, key) => {
    const tableRows = [];
    const rowKey = `row-${key}`;

    Object.entries(row).map(([cellTitle, cellContent]) => {
      if (Array.isArray(cellContent)) {
        tableRows.push(
          <SalesTableCell
            key={cellContent[1]}
            title={cellTitle}
            content={cellContent[1]}
            image={cellContent[0]}
            noBorder={key === rows.length - 1}
          />
        );
        return null;
      }

      // Support object form: { value, color }
      if (cellContent && typeof cellContent === "object") {
        const value = cellContent.value ?? "";
        const color = cellContent.color;
        tableRows.push(
          <SalesTableCell
            key={`${cellTitle}-${value}`}
            title={cellTitle}
            content={value}
            color={color}
            noBorder={key === rows.length - 1}
          />
        );
        return null;
      }

      tableRows.push(
        <SalesTableCell
          key={`${cellTitle}-${cellContent}`}
          title={cellTitle}
          content={cellContent}
          noBorder={key === rows.length - 1}
        />
      );
      return null;
    });

    return <TableRow key={rowKey}>{tableRows}</TableRow>;
  });

  return (
    <TableContainer sx={{ backgroundColor: "dark.main" }}>
      <Table>
        {title ? (
          <TableHead>
            <TableRow>
              <SoftBox component="tr" width="100%" display="block" mb={1.5}>
                <SoftTypography 
                  variant="h6" 
                  component="td"
                >
                  {title}
                </SoftTypography>
              </SoftBox>
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody 
          sx={{ 
            height: maxHeight, 
            overflow: "auto",
            display: "block"
          }}
        >
          {useMemo(() => renderTableCells, [rows])}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


// Typechecking props for the SalesTable
SalesTable.propTypes = {
  title: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.object),
  maxHeight: PropTypes.string,
};

export default SalesTable;
