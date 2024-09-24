// Add middleware / dependencies
const express = require('express');
const db = require('./config/dbinfo');
const app = express();
const port = 5500;
const quoteRouter = require('./apiserver'); 
const cors = require('cors');

app.use(express.json());
app.use(express.static(__dirname));
app.use(cors()); 
// Use API routes
app.use('/qapi', quoteRouter); 

// Entry point for the web app
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// 404 route
app.use((req, res) => {
  res.status(404).send(`
    <html>
      <head>
        <title>Page Not Found</title>
      </head>
      <body>
        <h1>The page you are trying to access does not exist.</h1>
        <p>Enjoy some quotes by going to the:</p>
        <p>Quotes for life<a href="/">HOME</a>.</p> 
      </body>
    </html>
  `);
});

// Start the Server
app.listen(port, () => {
    console.log('Server started on port 5500');
});

// npm install should be run for the first time to ensure all dependencies are installed for node.js before starting the app.
// To start the app using the standard method from the start script in the project's package.json file run:
// npm start
// Starts the nodeman tool from the dev script defined in the project’s package.json file run:
// npm run dev
