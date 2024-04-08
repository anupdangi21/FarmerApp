//importing all the necessary modules 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


let publicPath = path.join(__dirname , 'farmer');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(`${publicPath}/farmer.html`);
});
app.get('/addProducts', (req, res)=>{
    res.sendFile(`${publicPath}/addProducts.html`)
})

//mongoodb connection for the addProduct
mongoose.connect('mongodb+srv://anupdangi28:farmers123@localfarmersapp.8bbteeb.mongodb.net/Products')
 const db = mongoose.connection;
 db.once('open', ()=> console.log('connected to db successfully for addproduct'))

 //creating the schema for the products
 const  productSchema= new mongoose.Schema ({
     name : String,
     quantity : Number,
     type:String
 });
 
const  Product = mongoose.model("products", productSchema);

app.post('/submit', async function(req, res) {
    const { name, quantity, type } = req.body;
    try {
        if (name && quantity && type) {
            const product = new Product({  
                name: name,
                quantity: quantity,
                type: type
            });
            await product.save();
            console.log(product);
            return res.redirect("/farmer.html");  
        }
    } catch(error) {
        console.log(error);
    }
});


 //connection prot
 const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));