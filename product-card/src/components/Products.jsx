import React,  {useState,useEffect}from 'react'
import ProductCard from './ProductCard';

const Products = () => {
  const [products,setProducts]=useState([]);
  const [filteredProducts,setFilterProducts]=useState([]);
  const[categories,setCategories]=useState([]);
  const[searchQuery,setSearchQuery]=useState([]);
  const [filters,setFilters]=useState({category:"", price:1000, rating: 0});
 
  useEffect(()=>{
    (async ()=>{
       try{
        const productsResponse=await fetch("https://fakestoreapi.com/products");
        const categoriesResponse=await fetch("https://fakestoreapi.com/products/categories");

        const productsData=await productsResponse.json();
        const categoriesData=await categoriesResponse.json()
        console.log('fetched products',productsData)
        setProducts(productsData);

        setFilterProducts(productsData);

        setCategories(categoriesData);
       }catch(error){
        console.error('Error fetched', error)
       }
        
        


    })()
  })


  useEffect(()=>{
    const applyFilters=()=>{
        const filtered=products.filter((p)=>{
            const productTitle=p.title ? p.title.toLowerCase():'';
            return(
                (!filters.category || p.category === filters.category) && p.price <= filters.price && p.rating.rate >= filters.rating &&
                productTitle.includes(searchQuery.toLowerCase())
            )
        })
        console.log('filtered products' , filtered);
        setFilterProducts(filtered)
    };
    applyFilters();

  },[products,filters,searchQuery])


 const clearFilters=()=>{
    setFilters({category: "" , price: 1000, rating: 0});
    setSearchQuery("");
    setFilterProducts(products)
 }

  return (
    <div>
      <div>
        <h3>Filters</h3>
        <input type="text"  placeholder='search by title' value={searchQuery} onChange={(e)=>setFilters({...filters,category:e.target.value})}/>
        <select name="" id="">
        <option value="">All Categories</option>
        {categories.map((cat)=>(
            <option key={cat} value={cat}>{cat}</option>
        ))}

       </select> 
            <label>Price: ${filters.price}</label>
            <input
             type="range"
             min="0"
             max="1000"
             value={filters.price}
             onChange={(e)=>{
                setFilters({...filters,price:+e.target.value})
             }}    
            />
            <label>Rating:{filters.rating}</label>
            <input
              type='number'
              min="0"
              max="5"
              step="0.5"
              value={filters.rating}
              onChange={(e)=>
                setFilters({...filters,rating:_e.target.value})
              }
            />
            <button 
               onClick={clearFilters}
            >Clear Filters</button>     
      </div>
      <div>
        <h3>All Products</h3>
        <div>
            {products.map((product)=>(
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
      <div>
       {filteredProducts.length>0 ? (
        filteredProducts.map((product)=>(
            <ProductCard key={product.id} product={product} />
        ))
       ):(
        <p>No Products</p>
       )}
      </div>
    </div>
  )
}

export default Products
