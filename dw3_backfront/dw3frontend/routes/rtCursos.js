var express = require("express");
var router = express.Router();
var cursosApp = require("../apps/cursos/controller/ctlCursos");

function authenticationMiddleware(req, res, next) {
  if (!req.session.isLogged) {
    return res.redirect("/Login");
  }
  next();
}

router.get("/ManutCursos", authenticationMiddleware, cursosApp.ManutCursos);
router.get("/InsertCursos", authenticationMiddleware, cursosApp.insertCursos);
router.get("/ViewCursos/:id", authenticationMiddleware, cursosApp.viewCurso);
router.get("/UpdateCursos/:id", authenticationMiddleware, cursosApp.updateCurso);

router.post("/InsertCursos", authenticationMiddleware, cursosApp.insertCursos);
router.post("/UpdateCursos", authenticationMiddleware, cursosApp.updateCurso);
router.post("/DeleteCursos", authenticationMiddleware, cursosApp.deleteCurso);

module.exports = router;
