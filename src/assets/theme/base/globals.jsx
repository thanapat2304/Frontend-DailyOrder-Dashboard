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

const { background, text, primary } = colors;

const globals = {
  html: {
    scrollBehavior: "smooth",
  },
  body: {
    backgroundColor: background.default,
    color: text.main,
  },
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
  },
  "a, a:link, a:visited": {
    textDecoration: "none !important",
  },
  "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
    color: `${text.main} !important`,
    transition: "color 150ms ease-in !important",
  },
  "a.link:hover, .link:hover, a.link:focus, .link:focus": {
    color: `${primary.main} !important`,
  },
  
  // Custom Scrollbar Styles
  "::-webkit-scrollbar": {
    width: "4px",  // บางมากเหมือนในภาพ
    height: "4px",
  },
  "::-webkit-scrollbar-track": {
    background: "transparent",  // ไม่เห็นราง
  },
  "::-webkit-scrollbar-thumb": {
    background: "#64748b",  // สีเทาอมน้ำเงินเหมือนในภาพ
    borderRadius: "2px",
    "&:hover": {
      background: "#94a3b8",  // hover เป็นสีที่สว่างขึ้นเล็กน้อย
    },
  },
  "::-webkit-scrollbar-corner": {
    background: "transparent",  // ไม่เห็นมุม
  },
  
  // Firefox Scrollbar
  "html": {
    scrollbarWidth: "thin",
    scrollbarColor: "#64748b transparent",
  },
};

export default globals;
