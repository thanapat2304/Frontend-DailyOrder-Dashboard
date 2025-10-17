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
import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Analytics application components
import PagesBodyCell from "layouts/dashboards/components/PagesBodyCell";

function TopProduct({ height = "auto", data = [] }) {
  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h6">Top Product</SoftTypography>
      </SoftBox>
      <SoftBox py={1} px={2}>
        <TableContainer sx={{ boxShadow: "none", height: height }}>
          <Table>
            <TableBody>
              {data.map((product, index) => (
                <PagesBodyCell 
                  key={index}
                  rows={[
                    `${index + 1}. ${product.product_name.length > 20 ? product.product_name.substring(0, 20) + '..' : product.product_name}`,
                    `${product.total_amount.toLocaleString()}`
                  ]} 
                  noBorder={index === data.length - 1}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the TopProduct
TopProduct.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.arrayOf(PropTypes.shape({
    product_name: PropTypes.string,
    total_amount: PropTypes.number,
  })),
};

export default TopProduct;
