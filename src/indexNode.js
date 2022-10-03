const express = require('express');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares

// Global variables  -> colocar datos que queremos que toda al app tenga acceso

// Routes

//Static Files

// Server is listening
app.listen(app.get('port'), () => {
   console.log('Sever on port', app.get('port'));
});