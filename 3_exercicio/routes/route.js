const express = require("express");
const routerApp = express.Router();
const appCalc = require("../controller/ctlCalc");

//@ Configura as rotas
routerApp.post("/calculadora", appCalc.fCalc);

//@ Exporta a variável com as rotas
module.exports = routerApp;