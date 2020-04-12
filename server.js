var express = require('express');
var bodyParser = require('body-parser');
const crypto = require("crypto");

const app = express();
const router = express.Router();



app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use(function(req, res, next){
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
 res.setHeader("Access-Control-Allow-Headers", "content-type");
 res.setHeader("Content-Type", "application/json");
 res.setHeader("Access-Control-Allow-Credentials", true);
 next();
});


var json_response = "{ “usuarios”:[ { “nome”:”Primeiro usuário”, “site”:”www.primeirousuario.com.br”, “usuario_id”:1 }, { “nome”:”Segundo usuário”, “site”:”www.segundousuario.com.br”, “usuario_id”:2 }, { “nome”:”Terceiro usuário”, “site”:”www.terceirousuario.com.br”, “usuario_id”:3 } ] }";



router.get('/100', (req,res) => {
  res.status(100).send("Response Body - 100 OK -"); // Sends HTTP status code 200 back to browser
});


router.get('/200', (req,res) => {
    res.status(200).send("Response Body - 200 OK -"); // Sends HTTP status code 200 back to browser
});


router.get('/201', (req,res) => {
  res.status(201).send("Response Body - 201 OK -"); // Sends HTTP status code 200 back to browser
});

router.get('/202', (req,res) => {
  res.status(202).send("Response Body - 202 OK -"); // Sends HTTP status code 200 back to browser
});


router.get('/204', (req,res) => {
  res.setHeader("Application-Header", criptografar("{ \"teste\": [{\"nome\":\"asdas\"}] }"));
  res.status(204).send("Response Body - 204 OK -"); // Sends HTTP status code 200 back to browser
});


router.get('/404', (req,res) => {
  res.status(404).send("Response Body - 404  -"); // Sends HTTP status code 200 back to browser
});


router.get('/417', (req,res) => {
  res.status(417).send(json_response); // Sends HTTP status code 200 back to browser
});


// router.get('/200', (req,res) => {
//   res.send('OK'); // Sends HTTP status code 200 back to browser
// });


const DADOS_CRIPTOGRAFAR = {
  algoritmo : "aes256",
  segredo : "chaves",
  tipo : "hex"
};

function criptografar(senha) {
const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
cipher.update(senha);
return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
};
  


router.all('*',(req,res) => {
    res.status(404).send('404 Invalid Request');
});

app.use('/', router);

app.listen(process.env.port || 3000)