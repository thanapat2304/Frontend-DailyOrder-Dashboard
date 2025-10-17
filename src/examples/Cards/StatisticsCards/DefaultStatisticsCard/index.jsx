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

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";

function DefaultStatisticsCard({ title, count, percentage = null, dropdown = false, backgroundColor = null, icon = null, iconComponent: IconComponent = null, iconSize = "4rem", iconTop = "50%", iconColor = "light" }) {
  // ตรวจสอบว่า backgroundColor เป็นชื่อสีจากธีมหรือสี hex
  const getBackgroundColor = () => {
    if (!backgroundColor) return undefined;
    
    // ถ้าเป็นชื่อสีจากธีม (เช่น "info", "primary", "success")
    if (colors[backgroundColor]) {
      return colors[backgroundColor].main;
    }
    
    // ถ้าเป็นสี hex code หรือสีอื่นๆ
    return backgroundColor;
  };

  // คืนค่าสีสำหรับไอคอนจากธีมหรือ hex ที่ส่งมา
  const getIconColor = () => {
    if (!iconColor) return "#ffffff";
    if (colors[iconColor]) {
      return colors[iconColor].main;
    }
    return iconColor; // รองรับ hex หรือสี CSS อื่นๆ
  };

  // เตรียม props สำหรับ IconComponent: ส่ง color เฉพาะกรณีเป็นชื่อสีในธีม เพื่อลด prop-type warning
  const iconProps = colors[iconColor]
    ? { size: iconSize, color: iconColor }
    : { size: iconSize };

  return (
    <Card sx={{ backgroundColor: getBackgroundColor(), position: "relative", overflow: "hidden" }}>
      <SoftBox p={2}>
        <Grid container>
          <Grid item xs={7}>
            <SoftBox mb={0.5} lineHeight={1}>
              <SoftTypography
                variant="h5"
                fontWeight="medium"
                color="light"
                textTransform="capitalize"
              >
                {title}
              </SoftTypography>
            </SoftBox>
            <SoftBox lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="bold" color="light">
                {count}
              </SoftTypography>
              {percentage && (percentage.value || percentage.label) && (
                <SoftTypography
                  variant="button"
                  fontWeight="bold"
                  color={percentage?.color === "softRad" ? "error" : (percentage?.color || "success")}
                  sx={percentage?.color === "softRad" ? { color: colors.softRad.main } : undefined}
                >
                  {percentage?.value}&nbsp;
                  <SoftTypography variant="button" fontWeight="regular" color="light">
                    {percentage?.label}
                  </SoftTypography>
                </SoftTypography>
              )}
            </SoftBox>
          </Grid>
          <Grid item xs={5}>
            {dropdown && (
              <SoftBox width="100%" textAlign="right" lineHeight={1}>
                <SoftTypography
                  variant="caption"
                  color="light"
                  sx={{ cursor: "pointer" }}
                  onClick={dropdown.action}
                >
                  {dropdown.value}
                </SoftTypography>
                {dropdown.menu}
              </SoftBox>
            )}
          </Grid>
        </Grid>
      </SoftBox>
      
      {/* ไอคอนพื้นหลัง */}
      {(icon || IconComponent) && (
        <SoftBox
          position="absolute"
          top={iconTop}
          right="20px"
          sx={{
            transform: "translateY(-50%)",
            opacity: 0.6,
            fontSize: iconSize,
            color: getIconColor(),
            zIndex: 0,
            width: typeof iconSize === "number" ? `${iconSize}px` : iconSize,
            height: typeof iconSize === "number" ? `${iconSize}px` : iconSize,
            // Force color for nested SVGs that don't use currentColor
            '& svg': { color: getIconColor(), fill: getIconColor() },
            '& svg path': { fill: getIconColor(), stroke: getIconColor() },
          }}
        >
          {IconComponent ? (
            <SoftBox component="span" sx={{ fontSize: "inherit", lineHeight: 0, color: getIconColor() }}>
              <IconComponent {...iconProps} />
            </SoftBox>
          ) : (
            <Icon sx={{ fontSize: "inherit" }}>{icon}</Icon>
          )}
        </SoftBox>
      )}
    </Card>
  );
}

// Typechecking props for the DefaultStatisticsCard
DefaultStatisticsCard.propTypes = {
  title: PropTypes.string.isRequired,
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
      "softRad",
    ]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
      value: PropTypes.string,
    }),
  ]),
  backgroundColor: PropTypes.string,
  icon: PropTypes.string,
  iconComponent: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]),
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconColor: PropTypes.string,
};

export default DefaultStatisticsCard;
