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

// @mui material components
import TableCell from "@mui/material/TableCell";

// Soft UI Dashboard PRO React components
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";

function SalesTableCell({ title, content, image = "", noBorder = false, color, ...rest }) {
  return (
    <TableCell {...rest} align="left" sx={{ border: noBorder && 0, backgroundColor: "dark.main", width: "100%" }}>
      <SoftBox display="flex" alignItems="center" width="100%" minHeight="60px">
        <SoftBox display="flex" flexDirection="column" width="100%" justifyContent="center">
          <SoftTypography
            variant="caption"
            color="text"
            fontWeight="medium"
            textTransform="capitalize"
            mb={0.5}
          >
            {title}:
          </SoftTypography>
          <SoftTypography
            variant="button"
            fontWeight="medium"
            textTransform="capitalize"
            color={
              color || (title && title.toLowerCase().includes("expiry")
                ? "error"
                : title && title.toLowerCase().includes("warning")
                ? "warning"
                : "light")
            }
          >
            {content}
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </TableCell>
  );
}


// Typechecking props for the SalesTableCell
SalesTableCell.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  noBorder: PropTypes.bool,
  color: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "white",
    // Custom extension
    "softRad",
  ]),
};

export default SalesTableCell;
