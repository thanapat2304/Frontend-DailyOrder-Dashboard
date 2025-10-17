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

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";

// Soft UI Dashboard PRO React helper functions
import rgba from "assets/theme/functions/rgba";

const { info, white, gradients, dark, text, background } = colors;

const flatpickr = {
  // Dark background for the popup and its headers
  ".flatpickr-calendar": {
    background: background.default,
    color: text.main,
    border: "none",
  },
  ".flatpickr-months, .flatpickr-weekdays": {
    background: background.default,
    color: text.main,
  },
  ".flatpickr-weekdays .flatpickr-weekday": {
    color: `${text.main} !important`,
    opacity: 1,
    fontWeight: 600,
  },
  ".flatpickr-current-month, .flatpickr-current-month .cur-month, .flatpickr-current-month .numInputWrapper .numInput": {
    color: text.main,
  },
  // Month dropdown select and options (force dark background)
  ".flatpickr-current-month .flatpickr-monthDropdown-months": {
    background: `${background.default} !important`,
    color: `${text.main} !important`,
  },
  ".flatpickr-current-month .flatpickr-monthDropdown-months option": {
    background: `${background.default} !important`,
    color: `${text.main} !important`,
  },
  // Month navigation arrows - base and hover as text.main
  ".flatpickr-months .flatpickr-prev-month svg, .flatpickr-months .flatpickr-next-month svg": {
    color: `${text.main} !important`,
    fill: `${text.main} !important`,
  },
  ".flatpickr-months .flatpickr-prev-month:hover svg, .flatpickr-months .flatpickr-next-month:hover svg": {
    color: `${text.main} !important`,
    fill: `${text.main} !important`,
  },
  ".flatpickr-time, .flatpickr-time input, .flatpickr-time .numInputWrapper span.arrowUp:after, .flatpickr-time .numInputWrapper span.arrowDown:after": {
    background: background.default,
    color: text.main,
  },
  // Input field inside the calendar header/date inputs (when inline inputs are shown)
  ".flatpickr-input, input.flatpickr-input": {
    background: `${background.default} !important`,
    color: `${text.main} !important`,
  },
  ".flatpickr-day": {
    color: text.main,
  },
  ".flatpickr-day.prevMonthDay, .flatpickr-day.nextMonthDay, .flatpickr-day.flatpickr-disabled": {
    color: text.main,
  },

  ".flatpickr-day:hover, .flatpickr-day:focus, .flatpickr-day.nextMonthDay:hover, .flatpickr-day.nextMonthDay:focus":
  {
    background: rgba(info.main, 0.28),
    border: "none",
  },

  ".flatpickr-day.today": {
    background: info.main,
    color: white.main,
    border: "none",

    "&:hover, &:focus": {
      background: `${info.focus} !important`,
    },
  },

  ".flatpickr-day.selected, .flatpickr-day.selected:hover, .flatpickr-day.nextMonthDay.selected, .flatpickr-day.nextMonthDay.selected:hover, .flatpickr-day.nextMonthDay.selected:focus":
  {
    background: `${gradients.info.state} !important`,
    color: white.main,
    border: "none",
  },

  // keep accents for hover already defined above; selected/today styles below
};

export default flatpickr;
