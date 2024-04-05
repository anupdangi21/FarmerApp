//importing all the necessary things
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb+srv://anupdangi28:farmers123@localfarmersapp.8bbteeb.mongodb.net/users');
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

//schema for admin
const  AdminSchema = new mongoose.Schema({
    username : String,
    password : String
});

//schema for the login data
const loginDataSchema = new mongoose.Schema({
    username: String,
    password: String
});

//schema for the register data
const registerUserSchema = new mongoose.Schema({
    name: String,
    email:String,
    username:String,
    password:String
})

const amdin = mongoose.model('admin', AdminSchema); //for admin
const LoginData = mongoose.model('LoginData', loginDataSchema); //for login
const RegisterLoginData = mongoose.model('userRegister', registerUserSchema); //for registration

app.get("/", function(req, res){
    // if("/"){
    res.sendFile(__dirname + '/customer/customer.html');
    // }else{
    //     res.sendFile(__dirname + '/admin/admin.html');
    // };`
});

app.post('/submit', async function(req, res) {
    const { username, password, name, email } = req.body;
    try {
        if (username && password) {
            // This is a submission from signin.html
            // const userAdmin = await amdin.findOne({ username, password }).exec();
            // if (userAdmin) {
            //     return res.redirect('./admin/admin.html'); // Redirect if user is admin
            // }
            const user = await LoginData.findOne({ username, password }).exec();
            if (user) {
                console.log("Login successful");
                return res.redirect("/customer.html"); // Redirect if user is regular customer
            } 
        } 
        if (name && email && username && password) {
            // This is a submission from register.html
            const newUser = new RegisterLoginData({
                name: name,
                email: email,
                username: username,
                password: password
            });
            await newUser.save();
            console.log("User registered successfully");
            return res.redirect("/customer.html");
        } 

        // Invalid form submission
        res.status(400).send('Invalid form submission');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

// app.use(express.static(__dirname + '/customer'));

let publicPath = path.join(__dirname ,  'customer');
console.log(publicPath);

// Serve static files from the 'public' directory
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(`${publicPath}/customer.html`);
}); 

app.get('/catagories ', (req, res) => {
    res.sendFile(`${publicPath}/catagories.html`);
});
app.get('/about ', (req, res) => {
    res.sendFile(`${publicPath}/about.html`);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));