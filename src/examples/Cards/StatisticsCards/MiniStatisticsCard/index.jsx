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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function MiniStatisticsCard({ bgColor = "dark", iconBgColor, title = { fontWeight: "medium", text: "" }, count, percentage = { color: "success", text: "" }, icon, direction = "right" }) {
  return (
    <Card sx={{ backgroundColor: "transparent"}}>
      <SoftBox bgColor={bgColor}>
        <SoftBox p={2}>
          <Grid container alignItems="center">
            {direction === "left" ? (
            <Grid item>
              <SoftBox
                width="3rem"
                height="3rem"
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={({ functions: { rgba }, palette }) => ({
                  backgroundColor: rgba(palette[iconBgColor || (bgColor === "white" ? icon.color : "white")].main, 0.5),
                  color: palette[iconBgColor || (bgColor === "white" ? icon.color : "white")].main
                })}
              >
                <Icon fontSize="medium" color="inherit">
                  {icon.component}
                </Icon>
              </SoftBox>
            </Grid>
            ) : null}
            <Grid item xs={8}>
              <SoftBox ml={direction === "left" ? 2 : 0} lineHeight={1}>
                <SoftTypography
                  variant="button"
                  color={bgColor === "white" ? "text" : "white"}
                  opacity={bgColor === "white" ? 1 : 0.7}
                  textTransform="capitalize"
                  fontWeight={title.fontWeight}
                >
                  {title.text}
                </SoftTypography>
                <SoftTypography
                  variant="h5"
                  fontWeight="bold"
                  color={bgColor === "white" ? "dark" : "white"}
                >
                  {count}{" "}
                  <SoftTypography variant="button" color={percentage.color} fontWeight="bold">
                    {percentage.text}
                  </SoftTypography>
                </SoftTypography>
              </SoftBox>
            </Grid>
            {direction === "right" ? (
            <Grid item xs={4}>
              <SoftBox
                width="3rem"
                height="3rem"
                marginLeft="auto"
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={({ functions: { rgba }, palette }) => ({
                  backgroundColor: rgba(palette[iconBgColor || (bgColor === "white" ? icon.color : "white")].main, 0.5),
                  color: palette[iconBgColor || (bgColor === "white" ? icon.color : "white")].main
                })}
              >
                <Icon fontSize="small" color="inherit">
                  {icon.component}
                </Icon>
              </SoftBox>
            </Grid>
            ) : null}
          </Grid>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}


// Typechecking props for the MiniStatisticsCard
MiniStatisticsCard.propTypes = {
  bgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  iconBgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    component: PropTypes.node.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
};

export default MiniStatisticsCard;
