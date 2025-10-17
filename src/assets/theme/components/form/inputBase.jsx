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

// Soft UI Dashboard PRO React Base Styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

// Soft UI Dashboard PRO helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { dark, white, light, inputColors, text, background } = colors;
const { size, fontWeightRegular } = typography;
const { borderWidth, borderRadius } = borders;

const inputBase = {
  styleOverrides: {
    root: {
      display: "grid !important",
      placeItems: "center !important",
      width: "100% !important",
      height: "auto !important",
      padding: `${pxToRem(8)} ${pxToRem(12)}`,
      fontSize: `${size.sm} !important`,
      fontWeight: `${fontWeightRegular} !important`,
      lineHeight: "1.4 !important",
      color: `${text.main} !important`,
      backgroundColor: `${background.default} !important`,
      backgroundClip: "padding-box !important",
      border: `${borderWidth[1]} solid ${light.main}`,
      appearance: "none !important",
      borderRadius: borderRadius.md,
      transition: "box-shadow 150ms ease, border-color 150ms ease, padding 150ms ease !important",
    },

    input: {
      width: "100% !important",
      height: `${pxToRem(22)}`,
      padding: "0 !important",

      "&::-webkit-input-placeholder": {
        color: `${text.main} !important`,
        opacity: 0.7,
      },
    },
  },
};

export default inputBase;
