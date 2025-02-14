import { Link } from 'react-router-dom';


const Navbar = () => {
    


    return ( 
        <nav className="navbar p-5 flex items-center max-w-4xl mx-auto border-b border-gray-200">
            <h1><Link to="/"><img src="/images/logo.png" alt="logo" 
            className='max-w-[120px] max-h-[120px] rounded-xl shadow-[12px_12px_16px_rgba(0,0,0,0.1)]
             sm:max-w-[150px] sm:max-h-[150px]'/></Link></h1>

            <div className="links ml-auto flex space-x-3">
                <span className="nav-link">
                    <Link to="/" className='hover:text-canon-red text-sm py-3 px-5 sm:px-8 sm:text-lg'> Koti </Link>
                    
                </span>
                <span className="nav-link">
                    <Link to="/products"  className='hover:text-canon-red py-3 px-5 sm:px-8 text-sm sm:text-lg'> Tuotteet </Link>
                </span>
                <span className="nav-link">
                    <Link to="/order"  className='hover:text-canon-red py-3 px-5 sm:px-8 text-sm sm:text-lg'>Tilaa</Link>
                </span>
                
                
            </div>
        </nav>
     );
}

<script>

</script>
 
export default Navbar;

