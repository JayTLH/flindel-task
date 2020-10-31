const express = require('express');
const app = express();
const path = require('path');

// moving the database import to a separate route file
// const db = require('./database/db');

// cors package to connect frontend and backend
const cors = require('cors');

// importing routes
const returnsRoute = require('./routes/returnsRoute');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// activating cors middleware
app.use(cors())

// server route that returns the available products for return in a transaction
app.use('/returns', returnsRoute);

// Handles any requests that don't match the ones above
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
