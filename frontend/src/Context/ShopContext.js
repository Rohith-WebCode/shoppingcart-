import React, { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);
const getDefaultCart = ()=>{
    let Cart = {};
    for (let index = 0; index < 300+1; index++) {
        Cart[index]=0; 
    }
    return Cart;
}

const ShopContextProvider = (props)=>{
    const [all_product,setall_product]=useState([]);
    const [cartItems,setCartItems] = useState(getDefaultCart());
    const [searchResults, setSearchResults] = useState(() => {
        const savedUser = localStorage.getItem("product");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [user,setUser] = useState();
    const [userID, setUserID] = useState(() => {
        const savedUser = localStorage.getItem("userData");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>setall_product(data))
        
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                   'Content-Type': 'application/json',
                    
                },
               
                body:"",
            })
            .then((res)=>res.json())
            .then((data)=>setCartItems(data))
           
        }
        const fetchUser = async () => {
            const token = localStorage.getItem("auth-token");
    
            if (token) {
                try {
                    // console.log("Fetching user with token:", token);
                    const response = await fetch("http://localhost:4000/getuser", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "auth-token": token,
                            "Content-Type": "application/json",
                        },
                    });
    
                    if (!response.ok) {
                        throw new Error("Failed to fetch user");
                    }
    
                    const data = await response.json();
                    // console.log("User Data:", data);
                    localStorage.setItem("userData", JSON.stringify(data.userData._id));
                    setUser(data);
                    setUserID(data.userData._id);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            } else {
                console.warn("No auth token found. User not logged in.");
            }
        };
         
        fetchUser();
    },[])
    
    // console.log("User ID:", userID?.userData?._id);
    // setUserID(userID?.userData?._id)
    // console.log("User ID:", userID);
    // console.log("dada",user);
    // console.log(all_product);
    const addToCart = (itemId, size) => {  
        setCartItems(prev => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                [size]: (prev[itemId]?.[size] || 0) + 1
            }
        }));
    
        if (localStorage.getItem("auth-token")) {
            fetch("http://localhost:4000/addtoCart", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                },
                body: JSON.stringify({ itemId: itemId, size: size, quantity: 1 }), // ✅ Send size & quantity
            })
            .then((res) => res.json())
        } else {
            console.log("User is not logged in!");
        }
    };
    
    const removeFromCart = (itemId, size) => {
        setCartItems((prev) => {
            let updatedCart = { ...prev };
            if (updatedCart[itemId] && updatedCart[itemId][size] > 1) {
                updatedCart[itemId][size] -= 1;
            } else {
                delete updatedCart[itemId][size];  // Remove size entry if zero
                if (Object.keys(updatedCart[itemId]).length === 0) {
                    delete updatedCart[itemId]; // Remove product if all sizes are removed
                }
            }
            return updatedCart;
        });
    
        fetch("http://localhost:4000/removeFromCart", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "auth-token": `${localStorage.getItem("auth-token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemId, size }),
        })
        .then((res) => res.json())
        .then((data) => console.log("Cart updated:", data));
    };
    
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
    
        for (const item in cartItems) {
            let itemInfo = all_product.find((product) => product.id === Number(item));
            if (itemInfo) {
                for (const size in cartItems[item]) {
                    totalAmount += itemInfo.new_price * cartItems[item][size];
                }
            }
        }
    
        return totalAmount;
    };
    const clearFromCart = (itemId) => {
        setCartItems((prev) => {
            let updatedCart = { ...prev };
            delete updatedCart[itemId]; // Remove entire product
            return updatedCart;
        });
    
        fetch("http://localhost:4000/clearFromCart", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "auth-token": `${localStorage.getItem("auth-token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemId }),
        })
        .then((res) => res.json())
        .then((data) => console.log("Cart cleared:", data));
    };
    const getTotelCartitem = () => {
        let totalItem = 0;
    
        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                totalItem += cartItems[item][size]; // Sum up all sizes
            }
        }
    
        return totalItem;
    };


    const search = async (query) => {
        if (!query.trim()) return; // Prevent empty searches
    
        try {
            const response = await fetch(`http://localhost:4000/search?query=${query}`);
            const data = await response.json();
    
            if (response.ok) {
                setSearchResults(data); // ✅ Store results
                localStorage.setItem("product", JSON.stringify(data));
                window.location.href = `/search`           
            } else {
                setSearchResults(); // ❌ Reset if no data found
                alert("No matching products found.");
            }
        } catch (error) {
            // console.error("Search failed:", error);
            alert("Something went wrong. Please try again.");
        }
    };
    
    // ✅ Log updated search results correctly
    useEffect(() => {
        // console.log("Updated Search Results:", searchResults);
    }, [searchResults]);
    
    
    



    const contextValue = {all_product,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotelCartitem,clearFromCart,user,userID,search,searchResults};
    // console.log(contextValue);
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
        
    )

}
export default ShopContextProvider