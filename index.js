/*jshint esversion: 6 */ 

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const config = require('./config');

const app = express();

//configuracion para Bobdy-parser
app.use(express.urlencoded({extended : false}));
app.use(express.json());

// $ npm i -S method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


//Motor de vistas HBS
app.engine('.hbs', hbs ({
    defaultLayout : 'index',
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

// Declaracion de carpeta STATIC
app.use('/static',express.static('public'));

// route our app
const router = require('./routes/routes');
app.use('/', router);

//Conexion a BD y levantar Servidor
mongoose.connect ( config.db , config.urlParser , ( err, res ) => {
    if(err){
        return console.log(`Error al conectar la bd  ${err}`);
    }
    console.log('Conexión a la BD exitosa');
    app.listen(config.port, () => {
        console.log(`API-REST  yeiii ejecutando en localhost: ${config.port}`)
    });
});