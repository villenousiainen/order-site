import { useNavigate } from "react-router-dom";


const Confirmation = () => {
    const navigate = useNavigate();
    return ( 


        <div className="confirmation mx-auto text-poppins text-bold text-[32px] mt-20 p-3 bg-[#f4f4f4] max-w-[600px] rounded-[12px]">
            Kiitos tilauksestanne!
            <p>lipsum lapsum lorem kurkkaa spostis!</p>

            <button className="go-home bg-canon-red text-white py-2 px-5 cursor-pointer rounded-[5px]
            transition-colors duration-300 ease-in-ou hover:bg-[#A6281A]" 
            onClick={() => navigate("/")}>Palaa Etusivulle</button>
        </div>
     );
}
 
export default Confirmation;