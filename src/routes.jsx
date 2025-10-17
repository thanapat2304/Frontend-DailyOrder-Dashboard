import Overview from "layouts/dashboards";
import DeliveryOperations from "layouts/analytics/delivery-operations";
import ProductDelivery from "layouts/analytics/product-delivery";
import ProductDetail from "layouts/analytics/product-detail";

// Soft UI Dashboard PRO React icons
import Dashboard from "examples/Icons/Dashboard";
import Truck from "examples/Icons/Truck";
import Box from "examples/Icons/Box";
import FrameInspect from "examples/Icons/FrameInspect";

const routes = [
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    route: "/dashboards",
    component: <Overview />,
    icon: <Dashboard />,
    noCollapse: true,
  },
  { type: "title", title: "ANALYTICS", key: "title-analytics" },
  {
    type: "collapse",
    name: "Delivery Operations",
    key: "delivery-operations",
    route: "/delivery-operations",
    component: <DeliveryOperations />,
    icon: <Truck />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Product Delivery",
    key: "product-delivery",
    route: "/product-delivery",
    component: <ProductDelivery />,
    icon: <Box />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Product Detail",
    key: "product-detail",
    route: "/product-detail",
    component: <ProductDetail />,
    icon: <FrameInspect />,
    noCollapse: true,
  },
];

export default routes;
