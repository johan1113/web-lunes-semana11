const express = require('express');
const hbs = require('express-handlebars');

const app = express();

//para definir la carpeta publica
app.use(express.static('public'));
//para registrar el motor de render handlebars
app.engine('handlebars', hbs());
//para setear el motor de render a utilizar
app.set('view engine', 'handlebars');

//importar archivo personas.js
var personas = require('./personas.js');
console.log('personas: ',personas);

//defn¿inir ruta root o principal
app.get('/', function(request, response){
    var contexto = {
        texto: 'Mi texto de prueba',
        lista: personas
    };
    response.render('home', contexto);
});

//instalo body-parser para sacar deatos con post(convierte informacion del body a variables)
//importo body-parser
var bodyparser = require('body-parser');
app.use(bodyparser.json());                   //to support JSON-ecoded bodies
app.use(bodyparser.urlencoded({               //to suppport URL-encoded bodies
    extended: true
}))
//usar body-parser
app.use(express.json());

//definir ruta para agregar personas
app.post('/agregar', function(request, response){
    personas.push({
        nombre: request.body.nombre,
        edad: request.body.edad,
    });
    console.log(request.body);
    response.send('ok, agregado.');
});

//iniciar el servidor en el puerto especificado
app.listen(5500);

//npx nodemon index.js