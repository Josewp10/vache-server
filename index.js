//Importar express y cors
const express = require('express');
const cors = require('cors');

//Inicializar librería
const app = express();


app.use(express.json());
app.use(cors());


//Endpoint
app.get('/', (req,res) =>{
    res.send('Bienvenido a PIG Plataforma de gestión ganadera');
});

const vs = '/api/v1';

//Rutas importadas

const ruta_autenticacion= require("./routes/autenticacion");
app.use(ruta_autenticacion);

const bovinos = require("./routes/bovinos");
app.use(bovinos);

const ruta_controlRetiros = require("./routes/controlRetiros");
app.use(ruta_controlRetiros);

const ruta_controlTratamientos = require("./routes/controlTratamientos");
app.use(ruta_controlTratamientos);

const ruta_controlCelo= require("./routes/celo");
app.use(ruta_controlCelo);

const ruta_usuarios= require("./routes/usuarios");
app.use(ruta_usuarios);

const ruta_dosis= require("./routes/tipoDosis");
app.use(ruta_dosis);

const ruta_tareas= require("./routes/registroTareas");
app.use(ruta_tareas);

const ruta_genealogicos= require("./routes/genealogicos");
app.use(ruta_genealogicos);

const ruta_razas= require("./routes/registroRazas");
app.use(ruta_razas);

const ruta_tipos= require("./routes/registroTipos");
app.use(ruta_tipos);

const ruta_medicamentos= require("./routes/medicamentos");
app.use(ruta_medicamentos);

const ruta_controlPrenez= require("./routes/controlPrenez");
app.use(ruta_controlPrenez);

const ruta_produccion_leche= require("./routes/produccion_leche");
app.use(ruta_produccion_leche);

const ruta_pajillas= require("./routes/pajillas");
app.use(ruta_pajillas);

const ruta_termo= require("./routes/termos");
app.use(ruta_termo);

const ruta_lecherias= require("./routes/lecherias");
app.use(ruta_lecherias);

const ruta_controlPartos= require("./routes/controlPartos");
app.use(ruta_controlPartos);


const ruta_sms= require("./routes/notificacionSMS");
app.use(ruta_sms);

 //Puerto
 const port = 3001;

 //Levantamiento
 
 app.listen(process.env.PORT || port, () => {
    console.log(`Escuchando API en http://localhost:${process.env.PORT}`);
 });