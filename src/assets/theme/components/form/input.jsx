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
import borders from "assets/theme/base/borders";

// Soft UI Dashboard PRO helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { inputColors, dark, text, background } = colors;
const { borderWidth, borderRadius } = borders;

const input = {
  styleOverrides: {
    root: {
      display: "flex !important",
      padding: `${pxToRem(8)} ${pxToRem(28)} ${pxToRem(8)} ${pxToRem(12)} !important`,
      borderRadius: `${borderRadius.md} !important`,
      background: `${background.default} !important`,
      color: `${text.main} !important`,
      boxShadow: "none !important",
      outline: "none !important",

      "& fieldset": {
        border: "none",
      },
    },

    input: {
      height: pxToRem(22),
      width: "max-content !important",
      background: `${background.default} !important`,
      color: `${text.main} !important`,
      boxShadow: "none !important",
      outline: "none !important",
    },

    inputSizeSmall: {
      height: pxToRem(14),
    },
  },
};

export default input;
