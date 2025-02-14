import { httpsCallable } from "firebase/functions";
import { functions } from "../config/firebase";

const TestResendButton = () => {
    const processOrder = httpsCallable(functions, 'processOrder')

    const testResend = async () => {
        try {
            const response = await processOrder({
                orderDetails: {
                item: "Test Product",
                quantity: 1,
                price: 49.99
            }
            });
    
            console.log("Function response", response.data)
            alert("Function executed! Check console for response.")
        } catch (error) {
            console.log("Error calling function: ", error)
            alert("Error occurred. Check console.");
        }
    }
    
    return ( 
        <div>
            <button className="mt-5 px-[40px] rounded-[4px] cursor-pointer text-[20px] bg-canon-red text-[#f4f4f4] hover:bg-[#A6281A]"
            onClick={testResend}> Test Resend Function</button>
        </div>      
     );
}
 
export default TestResendButton;