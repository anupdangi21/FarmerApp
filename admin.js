const express = require('express');
const path = require('path');

let app = express();

let publicPath = path.join(__dirname, 'admin');

// Serve static files from the 'public' directory
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(`${publicPath}/admin.html`);
});

app.get('/customer', (req, res) => {
    res.sendFile(`${publicPath}/customer.html`);
});

app.get('/farmer', (req, res) => {
    res.sendFile(`${publicPath}/farmer.html`);
});

app.listen(80);
