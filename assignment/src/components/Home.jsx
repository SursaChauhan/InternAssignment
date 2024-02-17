import React, { useState, useEffect, useContext } from 'react';
import './Home.css'
import { IoCart } from "react-icons/io5";
import  AppContext from './AppContext';
import Products from './Products';
// Import your logo image file

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
    const [cart, setCart] = useState([]);
  const [userdata,setUserdata] =useState("");
const {jstoken,logout,isAuthenticated} =useContext(AppContext);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10; // Set the number of items per page



  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`);
      const data = await response.json();
      console.log(data);
      setProducts(data.products);
      setFilteredProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const fetchUser = async (jstoken) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/me',{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jstoken}` , 
        },
      });
      const data = await response.json();
      setUserdata(data);
      // console.log(data);
   
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlelogout =()=>{
    logout();
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterProducts(event.target.value);
  };

  const filterProducts = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handlePriceRangeChange = (event) => {
    // Update the price range state
  };

  const addToCart = (product) => {
    // Add product to the cart
    setCart(prev=> prev + 1);

  };

  const handleMinPriceChange = (event) => {
    setMinPrice(parseInt(event.target.value));
};

const handleMaxPriceChange = (event) => {
    setMaxPrice(parseInt(event.target.value));
};

const filterProductsByPrice = () => {
  const filtered = products.filter((product) => {
      return product.price >= minPrice && product.price <= maxPrice;
  });
  setFilteredProducts(filtered);
};
const goToNextPage = () => {
  setCurrentPage((prevPage) => prevPage + 1);
};

const goToPrevPage = () => {
  setCurrentPage((prevPage) => prevPage - 1);
};


  useEffect(() => {
    // Fetch products when the component mounts
    fetchUser(jstoken);
  }, []);
  useEffect(() => {
    // Fetch products when the component mounts
    fetchProducts();
  }, [currentPage]);

  return (
    <div>
      <div className='navdiv hover'
       >
    
        <img     src="https://buildwithinnovation.com/wp-content/uploads/2022/10/retina-logo.png"
 alt="Logo" style={{ width: '100px', marginRight: '10px' }} />
        
      
      <div style={{width:'40%'}}>
        <input
          type="text"
          placeholder="Search products by name"
          value={searchTerm}
          onChange={handleSearch}
          style={{borderRadius:'18px',width:'100%'}}
        />
      
      </div>
    

      <div>
      <p style={{ position: 'relative', display: 'inline-block' }}>
  <IoCart style={{ fontSize: '30px' }} />
  <span style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'blue', borderRadius: '50%', padding: '3px', color: 'white' }}>{cart.length}</span>
</p>
        {/* Display total amount of the cart */}
      </div>

      {/* user profile section */}
      <div className='navhover' style={{ position: 'relative', top: '0', width: '60px', textAlign: 'center' }}>
    <img src="https://robohash.org/Jeanne.png?set=set4" alt="User" style={{ width: '50px', borderRadius: '50%', marginBottom: '5px' }} />
    {/* Dropdown menu */}
    <div className='dropdown-menu' style={{ position: 'absolute', top: '100%', right: '0', background: '#fff', border: '1px solid #ccc', borderRadius: '5px', textAlign: 'left', display: 'block' }}>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        <li>Hi {userdata.firstName}</li>
        <li>
          <button onClick={handlelogout}>
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  </div>



      </div>

    

      <div style={{display:"flex", paddingTop:"20px"}}>
      <div>
          {/* Price range filter component */}
       
    <input type="number" value={minPrice} onChange={handleMinPriceChange} placeholder='Min'/>
  
    <input type="number" value={maxPrice} onChange={handleMaxPriceChange} placeholder='Max'/>
    <button onClick={filterProductsByPrice}>Apply Filter</button>
        </div>
      <div>

        {/* <h1>
          products
        </h1> */}
        <div className="product-card-container">
        {filteredProducts.map((product) => (
          <Products key={product.id} product={product} addToCart={addToCart}/>
        ))}
      </div>
      </div>
      </div>
      <div style={{display:'flex', justifyContent:'center',alignItems:'center',margin:'10px'}}>

    <button onClick={goToPrevPage} disabled={currentPage === 1} style={{width:'40px',borderRadius:'50%'}}>Prev</button>
    <span>{currentPage}</span>
    <button onClick={goToNextPage} style={{width:'40px',borderRadius:'50%'}}>Next</button>
</div>

    </div>
  );
};

export default Home;
