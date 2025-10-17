// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";

function Footer({ company = { href: "https://www.aepthailand.com/", name: "American-European Products (AEP)." } }) {
  const { href, name } = company;
  const { size } = typography;

  return (
    <SoftBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
      py={-1}
      mt="auto"   
    >
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}
        <Link href={href} target="_blank">
          <SoftTypography variant="button" fontWeight="medium" sx={{ color: "#2092ec" }}>
            &nbsp;{name}&nbsp;
          </SoftTypography>
        </Link>
        All rights reserved.
      </SoftBox>
    </SoftBox>
  );
}


// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
};

export default Footer;
