

const ServiceDescription = () => {
    return ( 
        <div className="serviceDescription bg-gradient-to-br from-white 
        to-gray-100 p-8 rounded-xl shadow-lg max-w-xl mx-auto transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105">
            <h1 className='font-poppins text-4xl mb-5 text-center'>Palvelukuvaus</h1>
            <ul className='list-none p-0'>
                <li className='text-xl flex items-center mb-3 hover:bg-[#eaf5ff] cursor-pointer'>
                    Myyntipuheteksti joka kuulostaa hyvältä</li>
                <li className='text-xl flex items-center mb-3 hover:bg-[#eaf5ff] cursor-pointer'>
                    Meidän tuote paras osta osta osta</li>
                <li className='text-xl flex items-center mb-3 hover:bg-[#eaf5ff] cursor-pointer'>
                    Et lue tätä kuitenkaan mene jo tilaamaan haluut tulostimen</li>
                <li className='text-xl flex items-center mb-3 hover:bg-[#eaf5ff] cursor-pointer'>
                    Tekee mieli kuitenkin vähän tuhlata rahaa, noh, mene jo</li>
                <li className='text-xl items-center mb-3 hover:bg-[#eaf5ff] cursor-pointer'>
                    Olisit sinäkin tyytyväisempi jos ostat tulostimen</li>
            </ul>
        </div>

     );
}
 
export default ServiceDescription;