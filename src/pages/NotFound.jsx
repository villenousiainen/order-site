import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    
    return ( 
        <div className="not-found-container mx-auto text-center mt-[100px] p-[30px] bg-gradient-to-br from-white to-[#f1f1f1] 
        rounded-xl shadow-lg max-w-[700px]">
            <h1 className='text-[3rem] text-canon-red mb-5'>404 - Sivua ei löydy</h1>
            <p className='text-[1.2rem] text-[#555] mb-[15px]'>Valitettavasti etsimääsi sivua ei löytynyt.</p>
            <p className='text-[1.2rem] text-[#555] mb-[15px]'>Tarkista URL-osoite tai mene takaisin etusivulle.</p>
            <button className="go-home bg-canon-red text-white py-2 px-5 cursor-pointer rounded-[5px]
            transition-colors duration-300 ease-in-ou hover:bg-[#A6281A]" 
            onClick={() => navigate("/")}>Palaa Etusivulle</button>
        </div>
    );
}
 
export default NotFound;