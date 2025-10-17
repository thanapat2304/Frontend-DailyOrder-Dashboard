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
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export default styled(Box)(({ theme }) => {
  const { palette, typography, functions, boxShadows } = theme;

  const { white, dark, light, grey, gradients, secondary } = palette;
  const { size, fontWeightMedium, fontWeightBold } = typography;
  const { linearGradient, pxToRem } = functions;
  const { buttonBoxShadow } = boxShadows;

  return {
    height: "100%",

    "& .fc-media-screen": {
      height: "100%",
      color: dark.main,
    },

    "& .fc-theme-standard .fc-scrollgrid": {
      border: "none",
    },

    "& .fc-theme-standard thead tr th": {
      borderLeft: "none",
      borderRight: "none",
    },

    "& .fc-theme-standard td, .fc-theme-standard th": {
      borderColor: grey[700],
    },

    "& .fc th": {
      textAlign: "center",
    },

    "& .fc .fc-col-header-cell-cushion": {
      fontSize: size.sm,
      fontWeight: fontWeightMedium,
      color: grey[500],
    },

    "& .fc .fc-daygrid-day-number": {
      color: grey[400],
      fontSize: size.sm,
      fontWeight: fontWeightMedium,
      width: "100%",
      textAlign: "center",
    },

    "& .fc-scrollgrid-section.fc-scrollgrid-section-header > td": {
      border: "none",
    },

    "& .fc-scrollgrid-section.fc-scrollgrid-section-body.fc-scrollgrid-section-liquid > td": {
      border: "none",
    },

    "& .fc-scrollgrid-sync-table": {
      height: "auto !important",
    },

    "& .fc .fc-view-harness-active > .fc-view": {
      position: "static",
      height: "100%",
    },

    "& .fc .fc-scroller-liquid-absolute": {
      position: "static",
    },

    "& .fc-daygrid-event": {
      margin: `${pxToRem(0.5)} ${pxToRem(2)}`,
      border: "none",
      borderRadius: pxToRem(5.6),
      fontSize: size.sm,
      fontWeight: fontWeightMedium,
    },

    "& .fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events": {
      minHeight: pxToRem(32),
    },

    "& .fc-event-title": {
      padding: `${pxToRem(3)} ${pxToRem(4.8)} ${pxToRem(2.5)} !important`,
    },

    "& .fc-button, .fc-today-button, .fc-button:disabled": {
      backgroundColor: `${secondary.main} !important`,
      borderColor: `${secondary.main} !important`,
      fontSize: `${size.sm} !important`,
      boxShadow: `${buttonBoxShadow.main} !important`,
      opacity: "1 !important",
      transition: `all 150ms ease-in`,

      "&:hover, &:focus, &:active": {
        transform: "scale(1.02)",
        boxShadow: `${buttonBoxShadow.stateOf} !important`,
        backgroundColor: `${secondary.main} !important`,
        borderColor: `${secondary.main} !important`,
      },
    },

    "& .fc .fc-button .fc-icon": {
      fontSize: size.sm,
    },

    "& .fc-toolbar-title": {
      fontSize: `${size.lg} !important`,
      fontWeight: `${fontWeightBold} !important`,
    },

    "& .event-primary": {
      backgroundColor: palette.primary.main,
      "& *": { color: white.main },
    },

    "& .event-secondary": {
      backgroundColor: palette.secondary.main,
      "& *": { color: white.main },
    },

    "& .event-info": {
      backgroundColor: palette.info.main,
      "& *": { color: white.main },
    },

    "& .event-success": {
      backgroundColor: palette.success.main,
      "& *": { color: white.main },
    },

    "& .event-warning": {
      backgroundColor: palette.warning.main,
      "& *": { color: white.main },
    },

    "& .event-error": {
      backgroundColor: palette.error.main,
      "& *": { color: white.main },
    },

    "& .event-light": {
      backgroundColor: palette.light.main,
      "& *": { color: dark.main },
    },

    "& .event-dark": {
      backgroundColor: palette.dark.main,
      "& *": { color: white.main },
    },
  };
});
