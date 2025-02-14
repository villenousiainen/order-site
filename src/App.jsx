import Navbar from './components/Navbar';
import Home from './pages/Home';
import OrderPage1 from './pages/OrderPage1';
import ProductServicePage from './pages/ProductServicePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import OrderPage2 from './pages/OrderPage2';
import Confirmation from './pages/Confirmation';
import { OrderProvider } from './context/orderContext';

function App() {
  return (
    <OrderProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content max-w-5xl  mx-auto my-10 p-5">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/products" element={<ProductServicePage />}/>
              <Route path="/order" element={<OrderPage1 />}/>
              <Route path="/order/2" element={<OrderPage2 />}/>
              <Route path="/confirmation" element={<Confirmation />}/>
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </div>
        </div>
      </Router>
    </OrderProvider>
  )
}

export default App
