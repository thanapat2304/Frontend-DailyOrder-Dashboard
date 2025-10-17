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
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import { useState, useEffect } from "react";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";

// Custom styles for the SoftSnackbar
import SoftSnackbarIconRoot from "components/SoftSnackbar/SoftSnackbarIconRoot";

function SoftSnackbar({ 
  color = "info", 
  icon, 
  title, 
  dateTime, 
  content, 
  close, 
  bgWhite = false, 
  position = "bottom-right",
  autoHideDuration = 5000,
  titleVariant = "button",
  ...rest 
}) {
  const { size } = typography;
  const [countdown, setCountdown] = useState(Math.ceil(autoHideDuration / 1000));
  
  let titleColor;
  let dateTimeColor;
  let dividerColor;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = "dark";
    dividerColor = false;
  } else if (color === "light") {
    titleColor = "dark";
    dateTimeColor = "text";
    dividerColor = false;
  } else {
    titleColor = "white";
    dateTimeColor = "white";
    dividerColor = true;
  }

  // Countdown effect
  useEffect(() => {
    if (autoHideDuration === null) return;
    
    const initialSeconds = Math.ceil(autoHideDuration / 1000);
    setCountdown(initialSeconds);
    
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoHideDuration]);

  // Parse position prop to anchorOrigin
  const getAnchorOrigin = (pos) => {
    const positions = {
      "top-left": { vertical: "top", horizontal: "left" },
      "top-center": { vertical: "top", horizontal: "center" },
      "top-right": { vertical: "top", horizontal: "right" },
      "bottom-left": { vertical: "bottom", horizontal: "left" },
      "bottom-center": { vertical: "bottom", horizontal: "center" },
      "bottom-right": { vertical: "bottom", horizontal: "right" },
    };
    return positions[pos] || positions["bottom-right"];
  };

  return (
    <Snackbar
      TransitionComponent={Fade}
      autoHideDuration={autoHideDuration}
      anchorOrigin={getAnchorOrigin(position)}
      {...rest}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={close}>
          <Icon fontSize="small">close</Icon>
        </IconButton>
      }
    >
      <SoftBox
        variant={bgWhite ? "contained" : "gradient"}
        bgColor={bgWhite ? "white" : color}
        minWidth="21.875rem"
        maxWidth="100%"
        shadow="md"
        borderRadius="md"
        p={1}
      >
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          color="dark"
          p={1.5}
        >
          <SoftBox display="flex" alignItems="center" lineHeight={0}>
            <SoftSnackbarIconRoot fontSize="small" ownerState={{ color, bgWhite }}>
              {icon}
            </SoftSnackbarIconRoot>
            <SoftTypography
              variant={titleVariant}
              fontWeight="medium"
              color={titleColor}
              textGradient={bgWhite}
            >
              {title}
            </SoftTypography>
          </SoftBox>
          <SoftBox display="flex" alignItems="center" lineHeight={0}>
            <SoftTypography variant="caption" color={dateTimeColor}>
              {autoHideDuration === null ? dateTime : `ปิดใน ${countdown} วินาที`}
            </SoftTypography>
            <Icon
              sx={{
                color: ({ palette: { dark, white } }) =>
                  bgWhite || color === "light" ? dark.main : white.main,
                fontWeight: ({ typography: { fontWeightBold } }) => fontWeightBold,
                cursor: "pointer",
                marginLeft: 2,
                transform: "translateY(-1px)",
              }}
              onClick={close}
            >
              close
            </Icon>
          </SoftBox>
        </SoftBox>
        <Divider sx={{ margin: 0 }} light={dividerColor} />
        <SoftBox p={1.5} color={bgWhite || color === "light" ? "text" : "white"} fontSize={size.sm}>
          {typeof content === 'string' && content.includes('\n') ? (
            content.split('\n').map((line, index) => (
              <SoftTypography key={index} variant="body2" sx={{ mb: line.includes('\n') ? 0.5 : 0 }}>
                {line}
              </SoftTypography>
            ))
          ) : (
            content
          )}
        </SoftBox>
      </SoftBox>
    </Snackbar>
  );
}

// Typechecking props for SoftSnackbar
SoftSnackbar.propTypes = {
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
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  bgWhite: PropTypes.bool,
  position: PropTypes.oneOf([
    "top-left",
    "top-center", 
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ]),
  autoHideDuration: PropTypes.number,
  titleVariant: PropTypes.oneOf([
    "h1", "h2", "h3", "h4", "h5", "h6",
    "subtitle1", "subtitle2",
    "body1", "body2",
    "button", "caption", "overline"
  ]),
};

export default SoftSnackbar;
