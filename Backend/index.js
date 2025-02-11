const port =process.env.PORT || 4000;
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer' )
const path = require('path')
const cors =require('cors');
const { type } = require('os');
const { log, error } = require('console');

app.use(express.json());
app.use(cors());

//Database connection with mongoDB

mongoose.connect("mongodb+srv://rohithprakash19:rohithprakash@cluster0.jcxjypy.mongodb.net/e-commerce")

//Api creation

app.get("/",(req,res)=>{
    res.send('express app is running')
})

//Image storage engine

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
 
const upload = multer({storage:storage})

//creating upload endpoint for images
app.use('/images',express.static('./upload/images'))

app.post('/upload' ,upload.single('product'),(req , res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    
    })
})

//schema for creatong products
const Product = mongoose.model("product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    size:{
        type:[String],
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true,
    },

})

app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product= last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        size:req.body.size,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Seved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//creating api for deleting product
app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log("removed");
    res.json({
        success:true,
        name:req.body.name
    })
    
})
//craeting api for getting all product

app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log('All Product Fetched');
    res.send(products);
    
    
})
//Shema creationg for user model
const User = mongoose.model('Users',{
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//craeting endpoint for registering the user

app.post('/signup',async (req,res)=>{
    let Check = await User.findOne({email:req.body.email});
    if(Check){
        return res.status(400).json({success:false,error:"This email is already associated with an account"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;  
    }
    const user = new User({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();
    const data ={
        user:{
            id:user.id

        }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

//creating endpoint for user login
app.post('/login',async (req,res)=>{
    let user = await User.findOne({email:req.body.email})
    console.log(user.name);
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token,user})
        }
        else{
            res.json({success:false,error:"Wrong Password"})
        }
        
    }
    
    else{
        res.json({success:false,error:"Wrong Email Id"})
    }
})
//creating endpoint for newcollection data
app.get('/newcollection',async(req,res)=>{
    let product = await Product.find({});
    let newcollection =  product.slice(1).slice(-8);
    console.log('Newcollection Fetch');
    res.send(newcollection);
})

//creating endpoint for popular in women section
app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category:"Women"});
    let popular_in_women = products.slice(0,4);
    console.log('Popular In Women Fetched');
    res.send(popular_in_women)
    

})
// creating middelware to fetch user 
const fetchuser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:'Please authenticate using vaild token'})
    }
    else{
        try{
            const data = jwt.verify(token,'secret_ecom')
            req.user = data.user;
            next();
        }
        catch(error){
            res.status(401).send({errors:'Please authenticate using vaild token'})
        }
    }



}
app.post('/addtoCart', fetchuser, async (req, res) => {
    try {
        const { itemId, size, quantity = 1 } = req.body; // Extract values
        let userData = await User.findById(req.user.id);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!userData.cartData) {
            userData.cartData = {};
        }

        if (!userData.cartData[itemId]) {
            userData.cartData[itemId] = {}; 
        }

        // Ensure the size entry exists and update quantity
        userData.cartData[itemId][size] = (userData.cartData[itemId][size] || 0) + quantity;

        // Save updated cart data in MongoDB
        await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });

        res.json({ success: true, message: "Product added to cart", cartData: userData.cartData });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


//creating endpoint for remove products in cartdata
app.post("/removeFromCart", fetchuser, async (req, res) => {
    try {
        const { itemId, size } = req.body;
        let userData = await User.findById(req.user.id);
        if (!userData || !userData.cartData[itemId] || !userData.cartData[itemId][size]) {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        // Decrease quantity
        if (userData.cartData[itemId][size] > 1) {
            userData.cartData[itemId][size] -= 1;
        } else {
            delete userData.cartData[itemId][size]; // Remove size if 0
            if (Object.keys(userData.cartData[itemId]).length === 0) {
                delete userData.cartData[itemId]; // Remove product if empty
            }
        }

        await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
        res.json({ success: true, message: "Item removed", cartData: userData.cartData });
    } catch (error) {
        console.error("Error removing item:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

//creating endpoint for clear products in cartdata
app.post("/clearFromCart", fetchuser, async (req, res) => {
    try {
        const { itemId } = req.body;
        let userData = await User.findById(req.user.id);
        if (!userData || !userData.cartData[itemId]) {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        delete userData.cartData[itemId]; // Remove entire product
        await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });

        res.json({ success: true, message: "Item removed completely", cartData: userData.cartData });
    } catch (error) {
        console.error("Error clearing item:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

//creating endpoint for get user data
app.post('/getuser', fetchuser, async (req, res) => {
    try {
        console.log('Fetching user...');
        
        let userData = await User.findOne({ _id: req.user.id });

        if (!userData) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log(userData);
        res.json({ userData }); 

    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//creating endpoint for get cart data
app.post('/getcart',fetchuser,async(req,res)=>{
    console.log('getcart');
    let userData = await User.findOne({_id:req.user.id});     
    res.json(userData.cartData); 
})
app.post('/ProductDisplay',async(req,res)=>{
    console.log('ProductDisplay');
    let productData = await Product.findOne({id:req.body.id});
    // console.log(productData); 
    res.json(productData);
    
})

//creating endpoint for relatedproducts
app.post('/relatedproducts',async(req,res)=>{
    let products = await Product.find({category:req.body.category});
    let relatedproducts = products.slice(0,4);
    console.log('relatedproducts Fetched');
    // console.log(relatedproducts);
    
    res.send(relatedproducts)
})

//Shema creationg for order model
const Order = mongoose.model('Orders',{
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users", 
        required:true,
    },
    orderItems: [
        {
          product: {
            type: String,
            ref: "Products", // Links to Product model
            required: true,
          },
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
        },
      ],
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    paymentmethod:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})
//creating endpoint for Order The Products
app.post('/placeorder',fetchuser,async (req,res)=>{
    let Check = await User.findOne({user:req.body.user});
    if(Check){
        return res.status(400).json({success:false,error:"user not found"})
    }
    const order = new Order({
        user:req.body.user,
        orderItems:req.body.orderItems,
        name:req.body.name,
        email:req.body.email,
        number:req.body.number,
        address:req.body.address,
        paymentmethod:req.body.paymentmethod,
        date:req.body.date,
    });
    console.log(order);
    await order.save();
    console.log("Seved");
    res.json({
        success:true,
        name:req.body.name,
    })
})


// Search route
app.get("/search", async (req, res) => {
    console.log("hi");
    
    try {
        const { query } = req.query; 
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        // Search in product name and description (case insensitive)
        const results = await Product.find({
            $or: [
                { name: { $regex: query, $options: "i" } }, 
                { description: { $regex: query, $options: "i" } },
            ]
        });

        res.json(results);
        console.log(results);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/orders' ,async (req , res)=>{
    let Orders = await Order.find({});
    // console.log(Orders);
    // console.log('All Orders Fetched');
    res.send(Orders);
})

app.post('/removeorder', async (req, res) => {
    try {
        const deletedOrder = await Order.findOneAndDelete({ _id: req.body._id });

        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({
            success: true,
            name: deletedOrder.name, // Return deleted order name
        });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});



app.listen(port,(error)=>{
    if(!error){
        console.log('Server Running on Port' +port);
        
    }
    else{
        console.log("Error :" +error);
    }

})