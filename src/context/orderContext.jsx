import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";



const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [formData, setFormData] = useState({
    companyName: "",
    businessId: "",
    customerName: "",
    address: "",
    city: "",
    postalCode: "",
    email: "",
    phone: "",
    extra_field: "",
    printerPackage: "tulostin1",
    printerPrice: 0,
    orderPrice: 0,
    printerQuantity: 1,
    contractLength: "",
    ipAddress: "",
    mask: "",
    gateway: "",
    dnsAddress: "",
    hostName: "",
    emailServerAddress: "",
    proxyServerAddress: "",
    proxyPort: "",
  });

  // Timer for preventing automated submissions
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    // Set the start time when the component is mounted = when user visits the site for the first time
    setStartTime(new Date());
  }, []);

  const [honeypotName, setHoneypotName] = useState("");

  useEffect(() => {
      const randomName = "field_" + Math.random().toString(36).substring(7);
      setHoneypotName(randomName); // Set the random field name
    }, []);

  return (
    <OrderContext.Provider value={{ formData, setFormData, startTime, setStartTime, honeypotName }}>
      {children}
    </OrderContext.Provider>
  );
}
// Define the expected types for props
OrderProvider.propTypes = {
  children: PropTypes.node.isRequired, 
};

export function useOrder() {
  return useContext(OrderContext);
}