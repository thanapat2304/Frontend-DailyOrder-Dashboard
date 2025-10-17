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

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";

// Custom styles for ComplexProjectCard
function ComplexProjectCard({ color = "dark", image, title, dateEnd = "", description, dateStart = "" }) {

  return (
    <Card>
      <SoftBox p={2}>
        <SoftBox display="flex" alignItems="center">
          <SoftAvatar
            src={image}
            alt={title}
            size="xl"
            variant="rounded"
            bgColor={color}
            sx={{ p: 1 }}
          />
          <SoftBox ml={2} lineHeight={0}>
            <SoftBox mb={1} lineHeight={0}>
              <SoftTypography 
                variant="h6" 
                textTransform="capitalize" 
                fontWeight="medium"
                sx={(theme) => ({ color: theme.palette.text.main })}
              >
                {title}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftButton 
            variant="outlined" 
            color="info" 
            size="small"
            sx={{ ml: "auto" }}
          >
            ORDER
          </SoftButton>
        </SoftBox>
        <SoftBox my={2} lineHeight={1}>
          <SoftTypography variant="button" fontWeight="regular" color="text">
            {description}
          </SoftTypography>
        </SoftBox>
        <Divider />
        <SoftBox display="flex" justifyContent="space-between" alignItems="center">
          {dateStart ? (
            <SoftBox display="flex" flexDirection="column" lineHeight={0}>
              <SoftTypography 
                variant="button" 
                fontWeight="medium"
                sx={(theme) => ({ color: theme.palette.text.main })}
              >
                {dateStart}
              </SoftTypography>
              <SoftTypography 
                variant="button" 
                fontWeight="medium"
                sx={(theme) => ({ color: theme.palette.text.main })}
              >
                End Date
              </SoftTypography>
            </SoftBox>
          ) : null}
          {dateEnd ? (
            <SoftBox display="flex" flexDirection="column" lineHeight={0}>
              <SoftTypography 
                variant="button" 
                fontWeight="medium"
                sx={(theme) => ({ color: theme.palette.text.main })}
              >
                {dateEnd}
              </SoftTypography>
              <SoftTypography 
                variant="button" 
                fontWeight="medium"
                sx={(theme) => ({ color: theme.palette.text.main })}
              >
                End Date
              </SoftTypography>
            </SoftBox>
          ) : null}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ComplexProjectCard.propTypes = {
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
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dateEnd: PropTypes.string,
  dateStart: PropTypes.string,
  description: PropTypes.node.isRequired,
  members: PropTypes.arrayOf(PropTypes.string),
};

export default ComplexProjectCard;
