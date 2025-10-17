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

/**
 * The base colors for the Soft UI Dashboard PRO React.
 * You can add new color using this file.
 * You can customized the colors for the entire Soft UI Dashboard PRO React using thie file.
 */

const colors = {
  background: {
    default: "#232333",
  },

  text: {
    main: "#c9cfd6",
    focus: "#dadae2ff",
  },

  transparent: {
    main: "transparent",
  },

  white: {
    main: "#ffffff",
    focus: "#ffffff",
  },

  black: {
    light: "#141414",
    main: "#1d1e24ff",
    focus: "#000000",
  },

  primary: {
    main: "#8074da",
    focus: "#938ad6ff",
  },

  secondary: {
    main: "#8392ab",
    focus: "#96a2b8",
  },

  info: {
    main: "#03c3ec",
    focus: "#3acaeb",
  },

  blue: {
    main: "#3791e7",
    focus: "#3acaeb",
  },

  success: {
    main: "#82d616",
    focus: "#95dc39",
  },

  warning: {
    main: "#fbcf33",
    focus: "#fcd652",
  },

  error: {
    main: "#ea0606",
    focus: "#c70505",
  },

  light: {
    main: "#e9ecef",
    focus: "#e9ecef",
  },

  dark: {
    main: "#2b2c40",
    focus: "#344767",
    line: "#414254ff",
  },

  softGreen: {
    main: "#28dac6",
    focus: "#20c4b0",
  },

  pink: {
    main: "#f36147ff",
    focus: "#db8f9fff",
  },

  softRad: {
    main: "#fa846fff",
    focus: "#f36147ff",
  },

  orange: {
    main: "#e07b4b",
    focus: "#f36147ff",
  },

  grey: {
    100: "#f8f9fa",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#6c757d",
    700: "#495057",
    800: "#343a40",
    900: "#212529",
  },

  gradients: {
    primary: {
      main: "#8074da",
      state: "#938ad6ff",
    },

    secondary: {
      main: "#627594",
      state: "#a8b8d8",
    },

    info: {
      main: "#2b9aff",
      state: "#21d4fd",
    },

    success: {
      main: "#17ad37",
      state: "#98ec2d",
    },

    warning: {
      main: "#f53939",
      state: "#fbcf33",
    },

    error: {
      main: "#ea0606",
      state: "#ff667c",
    },

    light: {
      main: "#b2b2c4",
      state: "#ebeff4",
    },

    dark: {
      main: "#141727",
      state: "#3a416f",
    },

    softGreen: {
      main: "#28dac6",
      state: "#20c4b0",
    },

    pink: {
      main: "#f36147ff",
      state: "#db8f9fff",
    },
    
    softRad: {
      main: "#ff3e1d",
      state: "#f36147ff",
    },

    blue: {
      main: "#3791e7",
      state: "#3791e7",
    },
  },

  socialMediaColors: {
    facebook: {
      main: "#3b5998",
      dark: "#344e86",
    },

    twitter: {
      main: "#55acee",
      dark: "#3ea1ec",
    },

    instagram: {
      main: "#125688",
      dark: "#0e456d",
    },

    linkedin: {
      main: "#0077b5",
      dark: "#00669c",
    },

    pinterest: {
      main: "#cc2127",
      dark: "#b21d22",
    },

    youtube: {
      main: "#e52d27",
      dark: "#d41f1a",
    },

    vimeo: {
      main: "#1ab7ea",
      dark: "#13a3d2",
    },

    slack: {
      main: "#3aaf85",
      dark: "#329874",
    },

    dribbble: {
      main: "#ea4c89",
      dark: "#e73177",
    },

    github: {
      main: "#24292e",
      dark: "#171a1d",
    },

    reddit: {
      main: "#ff4500",
      dark: "#e03d00",
    },

    tumblr: {
      main: "#35465c",
      dark: "#2a3749",
    },
  },

  alertColors: {
    primary: {
      main: "#8074da",
      state: "#938ad6ff",
      border: "#efb6e2",
    },

    secondary: {
      main: "#627594",
      state: "#8ca1cb",
      border: "#dadee6",
    },

    info: {
      main: "#2152ff",
      state: "#02c6f3",
      border: "#b9ecf8",
    },

    success: {
      main: "#17ad37",
      state: "#84dc14",
      border: "#daf3b9",
    },

    warning: {
      main: "#f53939",
      state: "#fac60b",
      border: "#fef1c2",
    },

    error: {
      main: "#ea0606",
      state: "#ff3d59",
      border: "#f9b4b4",
    },

    light: {
      main: "#ced4da",
      state: "#d1dae6",
      border: "#f8f9fa",
    },

    dark: {
      main: "#141727",
      state: "#2c3154",
      border: "#c2c8d1",
    },

    softGreen: {
      main: "#28dac6",
      state: "#20c4b0",
      border: "#a8f5e8",
    },

    blue: {
      main: "#3791e7",
      state: "#3acaeb",
    },
  },

  badgeColors: {
    primary: {
      background: "#8074da",
      text: "#a3017e",
    },

    secondary: {
      background: "#e4e8ed",
      text: "#5974a2",
    },

    info: {
      background: "#abe9f7",
      text: "#08a1c4",
    },

    success: {
      background: "#cdf59b",
      text: "#67b108",
    },

    warning: {
      background: "#fef5d3",
      text: "#fbc400",
    },

    error: {
      background: "#fc9797",
      text: "#bd0000",
    },

    light: {
      background: "#ffffff",
      text: "#c7d3de",
    },

    dark: {
      background: "#8097bf",
      text: "#1e2e4a",
    },

    softGreen: {
      background: "#a8f5e8",
      text: "#1a9b8a",
    },

    blue: {
      background: "#3791e7",
      text: "#3acaeb",
    },
  },

  inputColors: {
    borderColor: { main: "#d2d6da", focus: "#35d1f5" },
    boxShadow: "#81e3f9",
    error: "#fd5c70",
    success: "#66d432",
  },

  sliderColors: {
    thumb: { borderColor: "#d9d9d9" },
  },

  circleSliderColors: {
    background: "#d3d3d3",
  },

  tabs: {
    indicator: { boxShadow: "#ddd" },
  },
};

export default colors;
