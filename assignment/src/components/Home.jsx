import React, { useState, useEffect, useContext } from 'react';
import './Home.css'
import { IoCart } from "react-icons/io5";
import AppContext from './AppContext';
import Products from './Products';
import Footer from './Footer';
<link href="https://fonts.googleapis.com/css?family=Arvo&display=swap" rel="stylesheet"></link>
// Import your logo image file

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [cart, setCart] = useState([]);
  const [userdata, setUserdata] = useState("");

  const { jstoken, logout, isAuthenticated ,login} = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page
  const [totalPrice, setTotalPrice] = useState(0);




  const fetchProducts = async (currentPage,searchTerm) => {
    try {
      let Apiurl = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;
      if(searchTerm){
        // Apiurl = `https://dummyjson.com/products/search?q=${searchTerm}`
        Apiurl = `https://dummyjson.com/products/search?q=${searchTerm}`
      }
      const response = await fetch(Apiurl);
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
      let  response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jstoken}`,
        },
      });
      const data = await response.json();
      setUserdata(data);
   login(jstoken);
   
      // console.log(data);

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlelogout = () => {
    logout();
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  
    // filterProducts(event.target.value);
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
     setCart((prevCart) => [...prevCart, product]);
     // Update total price
     setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);

  };
  const removeFromCart = (productToRemove) => {
    setCart((prevCart) => prevCart.filter((product) => product !== productToRemove));
    // Update total price
    setTotalPrice((prevTotalPrice) => prevTotalPrice - productToRemove.price);
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
    fetchProducts(currentPage,searchTerm);
  }, [currentPage,searchTerm]);
 

  return (
    <div>
      <div className='navdiv '>

        <img src="https://buildwithinnovation.com/wp-content/uploads/2022/10/retina-logo.png"
          alt="Logo" style={{ width: '100px', marginRight: '10px' }} />


        <div style={{ width: '40%' }}>
          <input
            type="text"
            placeholder="Search products by name"
            value={searchTerm}
            onChange={handleSearch}
            style={{ borderRadius: '18px', width: '100%' }}
          />

        </div>


        <div style={{display:'flex',justifyContent:"center",alignItems:"center",gap:"5px"}}>
          <p style={{ position: 'relative', display: 'inline-block' }}>
            <IoCart style={{ fontSize: '30px' }} />
            <span style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'blue', borderRadius: '50%', padding: '3px', color: 'white' }}>{cart.length}</span>
       
          </p>
          <span>Total Price: {totalPrice}
</span>
          {/* Display total amount of the cart */}
        </div>

        {/* user profile section */}
<div role="navigation" class="primary-navigation">

  <ul>
    <li>
      <img src={userdata.image} alt="User" style={{ width: '50px', borderRadius: '50%', marginBottom: '5px' }} />

      <ul class="dropdown">
        <li><a href="#">Hi, {userdata.firstName}</a></li>
        <li onClick={handlelogout}><a href="#">Sign Out</a></li>
        
      </ul>
    </li>
  
  </ul>
</div>

      </div>

<br />
<br />
<br />

      <div style={{ display: "flex", paddingTop: "20px" ,width:'90%',margin:'auto' ,gap:'2%'}}>
        <div style={{width:'20%'}}>
          {/* Price range filter component */}
          <h3>Price Filter</h3>

 <div style={{display:'flex',paddingBottom:'10px',justifyContent:'center',alignItems:'center'}}>         <input type="number" value={minPrice} onChange={handleMinPriceChange} placeholder='Min' style={{width:'30%'}}/>

<input type="number" value={maxPrice} onChange={handleMaxPriceChange} placeholder='Max' style={{width:'30%'}}/>

 </div>
          <button onClick={filterProductsByPrice}>Apply Filter</button>
        </div>
        <div style={{width:"78%"}}>

        
          <div className="product-card-container">
            {filteredProducts.map((product) => (
              <Products key={product.id} product={product} addToCart={addToCart} cart={cart} removeFromCart={removeFromCart}/>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0 ' }}>

        <button onClick={goToPrevPage} disabled={currentPage === 1} style={{ width: '50px', borderRadius: '50%' ,textAlign:"left",margin:"0 5px"}}>Prev</button>
        <span style={{border:"1px solid grey",borderRadius:'50%',width:"20px",background:'light-grey'}}>{currentPage}</span>
        <button onClick={goToNextPage} style={{ width: '50px', borderRadius: '50%' ,margin:"0 5px"}}>Next</button>
      </div>

<div>
<Footer/>
</div>
    </div>
  );
};

export default Home;
