import React, { useState, useEffect } from 'react'
import Product from './Product';



const Pagination = () => {
    const [products, setProducts] = React.useState([]);
    const [currentPage, setCurrentPage] = useState(0); // Current page number
    const pageSize = 10; // Number of products per page //it should take from user variable 
    
    const totalProducts = products.length; // Total number of products
    const totalPages = Math.ceil(products.length / pageSize);
    const startIndex = currentPage * pageSize; // Calculate the starting index for slicing
    const endIndex = startIndex + pageSize; // Calculate the ending index for slicing

    console.log("products", products);

    const fetchApiData = async () => {
        const data = await fetch(`https://dummyjson.com/products?limit=50`);
        const jsonData = await data.json();
        return jsonData.products;
    }

    useEffect(() => {
        (async () => {
            const products = await fetchApiData();
            setProducts(products);
        })()

    }, [])
    return (
        <>
            <div className='pagination'>
                <h1 className='page-tiltle'>Pagination</h1>
                <div className='pages'>
                    <button disabled={currentPage === 0} onClick={() => {
                        if (currentPage > 0) {
                            setCurrentPage(currentPage => currentPage - 1);
                        }
                    }}>Prev Page</button>
                    {
                        [...Array(totalPages).keys()].map((page) => {
                            return <span style={page === currentPage ? { backgroundColor: 'blue', color: 'white' } : { backgroundColor: 'white' }} key={page} className='page-number' onClick={() => {
                                setCurrentPage(page);
                            }}>{page + 1}</span>
                        })
                    }
                    <button disabled={currentPage === totalPages - 1} onClick={() => {
                        if (currentPage < totalPages - 1) {
                            setCurrentPage(currentPage => currentPage + 1);
                        }
                    }}>Next Page</button>
                </div>
                <div className='product-container'>
                    {products.length ? products.slice(startIndex, endIndex).map((product) => {
                        return <Product key={product.id} product={product} />
                    }) : <h1>No products founds</h1>
                    }
                </div>

            </div>
        </>
    )
}

export default Pagination