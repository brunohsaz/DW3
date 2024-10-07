const express = require("express");
const routerApp = express.Router();

const appAlunos = require("../apps/alunos/controller/ctlAlunos");
const appCursos = require("../apps/cursos/controller/ctlCursos");
const appEscolas = require("../apps/escolas/controller/ctlEscolas"); // Novo controller de escolas
const appLogin = require("../apps/login/controller/ctlLogin");

// middleware que é específico para este router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

// Rotas de Alunos
routerApp.get("/getAllAlunos", appAlunos.getAllAlunos);
routerApp.post("/getAlunoByID", appLogin.AutenticaJWT, appAlunos.getAlunoByID);
routerApp.post("/insertAlunos", appLogin.AutenticaJWT, appAlunos.insertAlunos);
routerApp.post("/updateAlunos", appAlunos.updateAlunos);
routerApp.post("/DeleteAlunos", appAlunos.DeleteAlunos);

// Rotas de Cursos
routerApp.get("/GetAllCursos", appCursos.GetAllCursos);
routerApp.post("/GetCursoByID", appCursos.GetCursoByID);
routerApp.post("/InsertCursos", appCursos.InsertCursos);
routerApp.post("/UpdateCursos", appCursos.UpdateCursos);
routerApp.post("/DeleteCursos", appCursos.DeleteCursos);

// Rotas de Escolas
routerApp.get("/getAllEscolas", appEscolas.getAllEscolas);
routerApp.post("/getEscolaByID", appLogin.AutenticaJWT, appEscolas.getEscolaByID);
routerApp.post("/insertEscola", appLogin.AutenticaJWT, appEscolas.insertEscola);
routerApp.post("/updateEscola", appEscolas.updateEscola);
routerApp.post("/deleteEscola", appEscolas.deleteEscola);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;
