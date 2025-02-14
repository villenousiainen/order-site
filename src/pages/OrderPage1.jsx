import { useState , useRef, useEffect} from "react";
import { useNavigate } from 'react-router-dom'
import "../styles/orderForm.css"
import printerPackages from "../products.json";
import { useOrder } from "../context/orderContext";

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Validation Schema using Yup
const schema = Yup.object().shape({
  companyName: Yup.string().required('Yrityksen nimi on pakollinen'),
  businessId: Yup.string().required('Y-tunnus on pakollinen'),
  customerName: Yup.string().required('Asiakkaan nimi on pakollinen'),
  address: Yup.string().required('Osoite on pakollinen'),
  city: Yup.string().required('Kaupunki on pakollinen'),
  postalCode: Yup.string().required('Postinumero on pakollinen'),
  email: Yup.string().email('Virheellinen sähköposti').required('Sähköposti on pakollinen'),
  phone: Yup.string().required('Puhelinnumero on pakollinen'),
  printerQuantity: Yup.number().required('Tulostimien määrä on pakollinen').min(1, 'Määrän täytyy olla vähintään 1'),
  contractLength: Yup.string().required('Sopimuksen kesto on pakollinen'),
});

const OrderPage1 = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {formData, setFormData} = useOrder();

  // Reference for dropdown container
  const dropdownRef = useRef(null);

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 
  const handleSubmitPage1 = (data) => {
    setFormData(data)
    navigate("/order/2");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  const fields = [
    { label: "Yrityksen nimi", name: "companyName", type: "text", required: true },
    { label: "Y-tunnus", name: "businessId", type: "text", required: true },
    { label: "Asiakkaan nimi", name: "customerName", type: "text", required: true },
    { label: "Katusoite", name: "address", type: "text", required: true },
    { label: "Paikkakunta", name: "city", type: "text", required: true },
    { label: "Postinumero", name: "postalCode", type: "text", required: true },
    { label: "Sähköposti", name: "email", type: "email", required: true },
    { label: "Puhelinnumero", name: "phone", type: "tel", required: true },
  ];
 
  return (
    <div className="order-form-container max-w-[800px] mx-auto p-5 bg-[#f9f9f9] rounded-[30px] shadow-md ">
      <h2 className="text-center text-gray-800 text-[36px] font-bold mb-2">Tilaa tulostinpaketti</h2>
      <form className="flex flex-col form" onSubmit={handleSubmit(handleSubmitPage1)}>
        {fields.map(({ label, name, type, required }) => (
            <div key={name} className="">
              <label className="mt-[10px] font-bold text-[1.1rem] block w-full">
                {label}
                {required && <span className="text-red-500">*</span>} {/* Add red asterisk if required */}
                </label>

              <Controller
                name={name}
                control={control}
                render={({ field }) => <input {...field} type={type} 
                className="p-[10px] mt-[5px] block w-full  border border-[#ccc] rounded-[4px]"/>}
              />
               {errors[name] && <span className="error text-red-500 text-sm">{errors[name].message}</span>}
            </div>
          ))}

          <Controller
          name="extra_field" control={control}
          render={({ field }) => <input {...field} type="text" className="absolute -left-[9999px] opacity-0 h-0 w-0"
          />}
          />


        <label className="mt-[10px] font-bold text-[1.1rem] block w-full">Valitse tulostinpaketti</label>

          <Controller
            name="printerPackage" control={control}
            render={({field}) => (
              <div className="dropdown-container flex relative justify-center"  ref={dropdownRef}>
                  <button className="bg-canon-red mt-5 text-[20px] focus:outline-none rounded text-[#f4f4f4] p-[10px] cursor-pointer w-full text-left hover:bg-[#A6281A]" 
                  type="button" onClick={toggleDropdown}> {printerPackages.find((pkg) => pkg.id === field.value)?.alt}
                     {" "} {printerPackages.find((pkg) => pkg.id === field.value)?.price} €/kk
                  </button>

                  {dropdownOpen && (
                    <div className="dropdown-menu absolute top-full left-0 right-0 bg-white border border-[#ccc] 
                     overflow-x-auto p-6 px-2 max-w-full z-10 gap-4 grid grid-cols-2 md:grid-cols-4" >
                      {printerPackages.map((pkg) => (
                        <div
                          key={pkg.id}
                          className="dropdown-item p-6 flex flex-col items-center cursor-pointer 
                          text-center font-medium transition-all duration-300 ease-in-out rounded-lg
                          hover:bg-[#f1f1f1] hover:transform hover:translate-y-[-3px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
                          onClick={() => {
                            field.onChange(pkg.id);
                            setValue("printerPrice", pkg.price);
                            setDropdownOpen(false);
                          }}
                        >
                          <img className="max-w-[80px] max-h-[80px] mb-2" src={pkg.image} alt={pkg.alt} />
                          <span className="text-[14px]">{pkg.alt}</span>
                          <div className="text-[14px]">{pkg.price} €/kk</div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>

            )}
          
          
          />

  

        <label className="mt-[10px] font-bold text-[1.1rem] block w-full">
          Tulostimien kappalemäärä
          <span className="text-red-500">*</span> {/* red asterisk - required */}
          </label>
        <Controller
          name="printerQuantity"
          control={control}
          render={({ field }) => <input {...field} type="number" className="p-[10px] mt-[5px] block w-full border border-[#ccc] rounded-[4px]" 
          />}
        />
         {errors.printerQuantity && <span className="error text-red-500 text-sm">{errors.printerQuantity.message}</span>}

        <div className="contract-length-select inline">
          <label className="block">
            Ylläpitosopimuksen kesto
            <span className="text-red-500">*</span> {/* red asterisk - required */}
            </label>

          <Controller
            name="contractLength" control={control}
            render={
              ({field}) => (
                <select {...field} className="block w-[220px]">
                    <option value="" >Valitse yksi..</option>
                    <option value="36">36 kk</option>
                    <option value="48">48 kk</option>
                    <option value="60">60 kk</option>
                </select>
                          )
                  }
          />
          {errors.contractLength && <span className="error text-red-500 text-sm">{errors.contractLength.message}</span>}
        </div>

        {/* Add a note about required fields */}
        <div className="mt-5 text-sm text-gray-500">
          <p><span className="text-red-500">*</span> Pakollinen tieto</p>
        </div>
        
        <button className="mt-10 p-[10px] rounded-[4px] cursor-pointer text-[20px] bg-canon-red text-[#f4f4f4] hover:bg-[#A6281A]" type="submit">
          Seuraava sivu
        </button>
      </form>
    </div>
  );
};

export default OrderPage1;