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

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @fullcalendar components
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Custom styles for Calendar
import CalendarRoot from "examples/Calendar/CalendarRoot";

function Calendar({ header = { title: "", date: "" }, ...rest }) {
  // ฟังก์ชันสร้าง events สำหรับเดือนปัจจุบัน
  const getCurrentMonthEvents = (events) => {
    if (!events) return [];
    
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0');
    
    return events.map((el) => ({
      ...el,
      start: el.start.replace(/^\d{4}-\d{2}/, `${currentYear}-${currentMonth}`),
      end: el.end.replace(/^\d{4}-\d{2}/, `${currentYear}-${currentMonth}`),
      className: validClassNames.find((item) => item === el.className)
        ? `event-${el.className}`
        : "event-info",
    }));
  };

  const validClassNames = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "blue",
  ];

  const events = getCurrentMonthEvents(rest.events);

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2} lineHeight={1}>
        {header.title ? (
          <SoftTypography variant="h6" textTransform="capitalize" color="light">
            {header.title}
          </SoftTypography>
        ) : null}
        {header.date ? (
          <SoftTypography component="p" variant="button" color="text" fontWeight="medium">
            {header.date}
          </SoftTypography>
        ) : null}
      </SoftBox>
      <CalendarRoot p={2}>
        <FullCalendar
          {...rest}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          events={events}
          height="100%"
        />
      </CalendarRoot>
    </Card>
  );
}
// Typechecking props for the Calendar
Calendar.propTypes = {
  header: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
  }),
};

export default Calendar;
