import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import DscriptionBox from '../Components/DscriptionBox/DscriptionBox';
import Relatedproducts from '../Components/Relatedproducts/Relatedproducts';
import Search from '../Components/Search/Search';

function SearchPage() {
    const { searchResults } = useContext(ShopContext);
    const { productid } = useParams(); // Get product ID from URL
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        // console.log("Search Results:", searchResults);
        // console.log("Product ID from URL:", productid);
        if (Array.isArray(searchResults) && searchResults.length > 0) {
            setSelectedProduct(searchResults[0]); // Extract the first product from the array
            localStorage.setItem("product", JSON.stringify(searchResults[0])); 
        } else {
            const savedProduct = JSON.parse(localStorage.getItem("product"));
            if (savedProduct) {
                setSelectedProduct(savedProduct);
            }
            
            if (savedProduct) {
                setSelectedProduct(savedProduct);
            }
        }
    }, [searchResults, productid]);

    if (!selectedProduct) { 
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Breadcrum product={selectedProduct} />
            <Search searchResults={[selectedProduct]} /> {/* Pass as an array */}
            <DscriptionBox />
            <Relatedproducts product={selectedProduct} />
        </div>
    );
}

export default SearchPage;
