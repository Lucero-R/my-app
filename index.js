/*jshint esversion: 6 */ 
const dotenv = require('dotenv');
const express = require('express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
dotenv.config({ path: './config.env'});
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

const DB = process.env.DATABASE.replace
('<PASSWORD>', process.env.DATABASE_PASSWORD);

//Conexion a BD y levantar Servidor

mongoose.connect(DB,config.urlParser, config.port).then(con=>{
console.log('DB connection successful!');
app.listen(config.port, () => {
    console.log(`API-REST  yeiii ejecutando en localhost: ${config.port}`)
   });
});



//mongoose.connect (config.db , config.urlParser , ( err, res ) => {
    //if(err){
     //   return console.log(`Error al conectar la bd  ${err}`);
    //}
   // console.log('Conexión a la BD exitosa');
   // app.listen(config.port, () => {
    //    console.log(`API-REST  yeiii ejecutando en localhost: ${config.port}`)
   // });
//});

//mongoose.connect(DB,{
    //useNewUrlParser: true,
   // useCreateIndex: true,
   // useFindAndModify: false
//});


console.log(process.env);

// Middlewares
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static('$(_dirname)/public'));

app.use((req,res,next)=>{
    console.log('Hello from the middleware');
    next();
});

