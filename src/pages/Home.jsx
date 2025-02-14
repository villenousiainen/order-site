import printerPic from '../images/printer.jpg'

const Home = () => {

    return ( 
        <div className="home-container bg-[#e0e5ec] p-12 text-center max-w-2xl mx-auto rounded-lg shadow-md">
        <h1 className='text-4xl font-bold text-gray-800 mb-6'>
            Meidän firma - Tulostamisesta helppoa</h1>

        <div className='flex flex-wrap justify-center gap-1'>
            <span className='bg-[#f1f5fb] shadow-lg p-2 rounded-[8px] m-2 text-lg text-gray-600 leading-relaxed'> Myyntipointti 1</span>
            <span className='bg-[#f1f5fb] shadow-lg p-2 rounded-[8px] m-2 text-lg text-gray-600 leading-relaxed'>Myyntipointti 2</span>
            <span className='bg-[#f1f5fb] shadow-lg p-2 rounded-[8px] m-2 text-lg text-gray-600 leading-relaxed'>Myyntipointti 3</span>
        </div>
        
        <div className="features flex justify-evenly gap-8 flex-wrap">
            <div className="feature mt-10">
            <img src={printerPic} alt="Canon tulostin" className='w-[85%] rounded-lg mb-5 mx-auto'/>
            <h2 className='text-xl text-gray-800 mb-4'>
                Huipputason tulostimet</h2>
            <p className="text-base text-gray-600 leading-relaxed">
                Modernit ja energiatehokkaat.</p>
            </div>
            <div className="feature">
            
            <h2 className="text-xl text-gray-800 mb-4">
                Myyntipuhe pointti räppi 1</h2>
            <p className="text-base text-gray-600 leading-relaxed">
            Myyntipuhe pointti räppi 2.</p>
            </div>
            <div className="feature">
            
            <h2 className="text-xl text-gray-800 mb-4">
                Myyntipuhe pointti räppi 3</h2>
            <p className="text-base text-gray-600 leading-relaxed">
                Liirumlaarun tämä on hyvä palvelu osta osta osta osta osta osta.</p>
            </div>
        </div>
    </div>
        );
    }
    
export default Home;