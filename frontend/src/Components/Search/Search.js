import React, { useContext, useState, useEffect } from "react";
import "./Search.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

function Search({ searchResults }) { // ✅ Correct destructuring
    // console.log("Received searchResults:", searchResults); // ✅ Debugging log
    const { addToCart } = useContext(ShopContext);
    const [size, setSize] = useState("xl");
    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate();
    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        if (storedUser) setUser(storedUser);
        if (searchResults.length > 0) {
            setTimeout(() => setLoading(false),3000); // Simulated delay for better UX
        } else {
            setLoading(false);
        }
    }, [searchResults]);
    
    if (loading) {
        return <div className="loader">Loading Products...</div>; // Show loader UI
    }

    // ✅ Handle case where no search results are found
    if (!searchResults || searchResults.length === 0) {
        return <div>No products found</div>;
    }

    return (
        <div className="ProductList">
            {searchResults.map((product) => (
                <div key={product.id} className="ProductDisplay">
                    <div className="ProductDisplay-left">
                        <div className="ProductDisplay-img-list">
                            <img src={product.image} alt={product.name} />
                            <img src={product.image} alt={product.name} />
                            <img src={product.image} alt={product.name} />
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="ProductDisplay-img">
                            <img className="ProductDisplay-main-img" src={product.image} alt={product.name} />
                        </div>
                    </div>
                    <div className="ProductDisplay-right">
                        <h1>{product.name}</h1>
                        <div className="ProductDisplay-right-stars">
                            <img src={star_icon} alt="star" />
                            <img src={star_icon} alt="star" />
                            <img src={star_icon} alt="star" />
                            <img src={star_icon} alt="star" />
                            <img src={star_dull_icon} alt="star" />
                            <p>(150)</p>
                        </div>
                        <div className="ProductDisplay-right-prices">
                            <div className="ProductDisplay-right-prices-old">${product.old_price}</div>
                            <div className="ProductDisplay-right-prices-new">${product.new_price}</div>
                        </div>
                        <div className="ProductDisplay-right-size">
                            <h1>Select Size</h1>
                            <div className="ProductDisplay-right-sizes">
                                {product.size?.map((s) => (
                                    <div key={s} onClick={() => setSize(s)}>{s}</div>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => (user ? addToCart(product.id, size) : navigate("/Login"))}>ADD TO CART</button>
                        <p className="ProductDisplay-right-category"><span>Category:</span> {product.category}</p>
                        <p className="ProductDisplay-right-category"><span>Tags:</span> {product.tags?.join(", ")}</p>
                    </div>
                </div>
            ))}
        </div>
     );
}

export default Search;
