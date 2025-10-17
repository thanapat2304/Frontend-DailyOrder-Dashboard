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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function DataTableBodyCell({ noBorder = false, align = "left", children, width, enableOverflow = false, showVerticalBorders = true }) {
  const { dark } = colors;
  const { size } = typography;
  const { borderWidth } = borders;

  return (
    <SoftBox
      component="td"
      textAlign={align}
      fontSize={size.sm}
      borderBottom={noBorder ? "none" : `${borderWidth[1]} solid ${dark.line}`}
      borderLeft={showVerticalBorders && !noBorder ? `${borderWidth[1]} solid ${dark.line}` : "none"}
      borderRight={showVerticalBorders && !noBorder ? `${borderWidth[1]} solid ${dark.line}` : "none"}
      py={1.5}
      px={3}
      sx={{
        width: width,
        minWidth: typeof width === 'object' ? width.xs : undefined,
        maxWidth: typeof width === 'object' ? width.xs : undefined
      }}
    >
      <SoftBox
        display="block"
        width="100%"
        color="text"
        sx={{
          verticalAlign: "middle",
          ...(enableOverflow 
            ? { 
                // เมื่อ enableOverflow = true ไม่บีบเนื้อหา
                overflow: "visible",
                textOverflow: "unset",
                whiteSpace: "normal"
              }
            : align !== "left"
            ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
            : { 
                whiteSpace: { xs: "nowrap", sm: "normal" },
                overflow: { xs: "visible", sm: "hidden" },
                textOverflow: { xs: "unset", sm: "ellipsis" }
              }),
        }}
      >
        {children}
      </SoftBox>
    </SoftBox>
  );
}


// Typechecking props for the DataTableBodyCell
DataTableBodyCell.propTypes = {
  children: PropTypes.node.isRequired,
  noBorder: PropTypes.bool,
  align: PropTypes.oneOf(["left", "right", "center"]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  enableOverflow: PropTypes.bool,
  showVerticalBorders: PropTypes.bool,
};

export default DataTableBodyCell;
