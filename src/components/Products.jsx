import products from "../products.json"
import { useNavigate } from "react-router-dom";

const Products = () => {
    const navigate = useNavigate();

    return ( 
        <div className="products-container grid gap-5 max-w-6xl mx-auto my-10 p-5 sm:grid-cols-1 md:grid-cols-2">
            
            {products.map((products) => (
                <div key={products.id} className="product-card w-full max-w-s mx-auto bg-white p-4 rounded-lg shadow-md text-center
                transition-transform duration-300 ease-in-out flex flex-col justify-between 
                hover:transform hover:translate-y-[-5px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)]">
                    <div className="pic-name-features">
                        <img src={products.image} alt={products.alt} className="product-image w-48 mx-auto mb-2 p-1 rounded-xl text-sm font-normal h-auto roudned-xl" />
                        <div className="printer-name text-lg font-bold mb-2">{products.alt}</div>
                        <ul className="list-none p-0 m-2">
                            {products.details.map((detail, index) => (
                            <li key={index} className="mb-2 p-1 rounded-md text-lg font-normal hover:bg-[#eaf5ff] cursor-pointer">{detail}</li>
                            ))}
                        </ul>
                    </div>                          

                <div className="price-button">
                    <div className="price text-lg font-bold mb-2">{products.price} €/kk</div>
                    <button className="bg-canon-red text-[#f4f4f4] w-full py-2 rounded-md font-bold cursor-pointer hover:bg-[#A6281A]" 
                    onClick={() => navigate("/order", {state: {products}})}>Tilaa nyt</button>
                </div>
                
                </div>
            ))}
    </div>
     );
}
 
export default Products;