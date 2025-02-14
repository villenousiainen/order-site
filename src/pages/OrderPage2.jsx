import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/orderContext";
import { useEffect } from "react";
import {useForm, Controller} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
// Imports to handlle resending emails
import { httpsCallable } from "firebase/functions";
import { functions } from "../config/firebase";

import { useState } from "react";





const tooltips = {
    ipAddress: "tässä on viisas ohje joka kertoo sinulle elämän tarkoituksen",
    mask: "verkkomaskin näet kun otat silmän käteen ja katsot",
    gateway: "Yhdyskäytävän saatat löytää jos tarpeeksi kauan etsit",
    dnsAddress: "DNS palvelin on ihan harry potter magiaa potenssiin kolme en minä tiedä mikä se semmone on",
  };


// Validation Schema for second page
const schemaPage2 = Yup.object().shape({
    ipAddress: Yup.string().matches(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      'Virheellinen IP-osoite' 
    ).required('IP-osoite on pakollinen'),
    mask: Yup.string().required('Maski on pakollinen'),
    gateway: Yup.string().required('Yhdyskäytävä on pakollinen'),
    dnsAddress: Yup.string().required('DNS-osoite on pakollinen'),
  });

  
const helpText = [
    { name: "ipAddress", text: "IP osoitteen näet kohdassa IPv4 Address." },
    { name: "mask", text: "Verkkomaski näet kohdassa 'Subnet Mask', yleisimmiten se on 255.255.255.0 tai 255.255.254.0"},
    { name: "gateway", text: "Yhdyskäytävän näet kohdasta 'Default Gateway'. Tämä voi olla sama kuin IP osoite." },
    { name: "dnsAddress", text: "DNS-palvelimen näet kohdasta 'DNS Servers'. Tämä voi olla sama kuin IP osoite ja yhdyskäytävä" },
  ];

const OrderPage2 = () => {
    const { formData, setFormData, startTime, setStartTime, honeypotName } = useOrder();
    const navigate = useNavigate();
    const [showHelp, setShowHelp] = useState(false);

    const { control, handleSubmit, formState: { errors }, reset, register } = useForm({
        resolver: yupResolver(schemaPage2),
        defaultValues: formData,
      });
    
    useEffect(() => {
        reset(formData);

    }, [formData, reset]);


    const handleBack = () => navigate("/order");

    
    const handleSubmitPage2 = async (data) => {
        const currentTime = new Date();
        const timeDifference = (currentTime - startTime) / 1000; // Time difference in seconds
        console.log(timeDifference);
        // Define the threshold time in seconds (e.g., 20 seconds)
        const MINIMUM_TIME_THRESHOLD = 20;
    
        if (timeDifference < MINIMUM_TIME_THRESHOLD) {
            return; // Prevent submission if time threshold is not met
        }

        if (data[honeypotName]) {
            return;
        }

        if (formData.honeypot) {
            console.warn("Spam detected!");
            return;
          }
    
        
        const completeData = { ...formData, ...data };
        setFormData(completeData);
        
        const processOrder = httpsCallable(functions, "processOrder");
        try {
            const response = await processOrder({
                userEmail: completeData.email,
                userName: completeData.customerName,
                orderDetails: completeData,
                //billingInfo: formData.billingInfo,
            });

            // Check if the order was processed successfully
            console.log("Function response", response.data)
        
        } catch (error) {
            console.error("Error calling firebase function", error)
            alert("Something went wrong. Please try again.");
        } 
    
        /*
                setFormData({
            companyName: "",
            businessId: "",
            customerName: "",
            address: "",
            city: "",
            postalCode: "",
            email: "",
            phone: "",
            printerPackage: "C133i",
            printerQuantity: 1,
            contractLength: "",
            ipAddress: "",
            mask: "",
            gateway: "",
            dnsAddress: "",
            hostName: "",
            emailServerAddress: "",
            email2: "",
            proxyServerAddress: "",
            proxyPort: "",
          }); */
        reset();

        setStartTime(new Date());
        navigate("/confirmation");
    };
    
    const fields = [
        { label: "IP-Osoite", name: "ipAddress", type: "text", required: true, placeholder: "esim. 192.168.1.1" },
        { label: "Maski", name: "mask", type: "text", required: true, placeholder: "esim. 255.255.255.0"  },
        { label: "Yhdyskäytävä/ Gateway", name: "gateway", type: "text", required: true, placeholder: "esim. 192.168.1.1" },
        { label: "DNS-osoite", name: "dnsAddress", type: "text", required: true, placeholder: "esim. 192.168.1.1" },
        { label: "HOST-nimi", name: "hostName", type: "text", required: false },
        { label: "Sähköpostipalvelimen osoite", name: "emailServerAddress", type: "text", required: false },
        { label: "Sähköpostiosoite", name: "email2", type: "text", required: false },
        { label: "Proxy-palvelimen osoite", name: "proxyServerAddress", type: "text", required: false },
        { label: "Proxy-portti", name: "proxyPort", type: "text", required: false },
    ];

    return ( 
        <div className="order-page-2 max-w-[800px] mx-auto p-5 bg-[#f9f9f9] rounded-[30px] shadow-md">
            <h2 className="text-center text-gray-800 text-[28px] font-bold mb-2">
                Verkkoasennustiedot</h2>

            {/* Toggle Help Button */}
            <button
                onClick={() => setShowHelp(!showHelp)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 transition"
            >
                {showHelp ? "Piilota ohjeet" : "Mistä saan nämä tiedot?"}
            </button>

            {/* Help Card (Appears when button is clicked) */}
            {showHelp && (
                <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Miten löydän nämä tiedot?</h3>
                <h2 className="text-md font-semibold mb-1">Tapa 1: Paina windows näppäintä, kirjoita  hakuun 'cmd' ja avaa komentokehote</h2>
                <h2 className="text-md font-semibold mb-1">Kirjoita 'ipconfig /all' ja paina enter</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    {helpText.map(({ name, text }) => (
                    <li key={name} className="mb-2">{text}</li>
                    ))}
                </ul>
                </div>
            )}



            <form className="flex flex-col" onSubmit={handleSubmit(handleSubmitPage2)}>
                    {fields.map(({ label, name, type, required, placeholder }) => (
                    <div key={name} className="">
                        <label className="mt-[10px] font-bold text-[1.1rem] block w-full">
                            {label}
                            {required && <span className="text-red-500">*</span>} {/* Add red asterisk if required */}
                            {tooltips[name] && (
                                <span className="relative group ml-2">
                                <span className="cursor-pointer bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                                    ?
                                </span>
                                <div className="absolute left-4 mt-2 w-48 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    {tooltips[name]}
                                </div>
                                </span>
                            )}
                            </label>


                        <Controller name={name} control={control} render={({ field }) => (
                            <input
                            {...field} // Spread the controller's field props (value, onChange, etc.)
                            type={type}
                            required={required}
                            placeholder={placeholder || ''}
                            className="p-[10px] mt-[5px] block w-full border border-[#ccc] rounded-[4px]"
                            />
                        )}
                        />
                        {errors[name] && (<span className="text-red-500 text-sm">{errors[name].message}</span>)}
                    </div>
                ))}

                <div>{/* Dynamically named Hidden Honeypot Field */}
                {honeypotName && (
                    <input
                    type="text"
                    {...register(honeypotName)} // Use dynamically generated name for the honeypot field
                    style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0  }} // Keeps it hidden from users
                    />
                )}</div>
                

                {/* Add a note about required fields */}
                <div className="mt-5 text-sm text-gray-500">
                <p><span className="text-red-500">*</span> Pakollinen tieto</p>
                </div>

                <div className="flex justify-between py-2 px-1">
                <button className="mt-5 px-[25px] py-[12px] rounded-[4px] cursor-pointer text-[20px] bg-white border-4 border-solid text-[canon-red] hover:bg-[#f4f4f4]" type="button" onClick={handleBack}>Takaisin</button>
                <button className="mt-5 px-[40px] rounded-[4px] cursor-pointer text-[20px] bg-canon-red text-[#f4f4f4] hover:bg-[#A6281A]" type="submit">Tilaa</button>
                </div>
                
            </form>

            
        </div>
     );
}
 
export default OrderPage2;