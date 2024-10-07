const mdlEscolas = require("../model/mdlEscolas");

const getAllEscolas = (req, res) =>
  (async () => {
    let registro = await mdlEscolas.getAllEscolas();
    res.json({ status: "ok", registro });
  })();

const getEscolaByID = (req, res) =>
  (async () => {
    const escolaID = parseInt(req.body.escolaid);
    let registro = await mdlEscolas.getEscolaByID(escolaID);
    res.json({ status: "ok", registro });
  })();

const insertEscola = (request, res) =>
  (async () => {
    const escolaREG = request.body;
    let { msg, linhasAfetadas } = await mdlEscolas.insertEscola(escolaREG);
    res.json({ status: msg, linhasAfetadas });
  })();

const updateEscola = (request, res) =>
  (async () => {
    const escolaREG = request.body;
    let { msg, linhasAfetadas } = await mdlEscolas.updateEscola(escolaREG);
    res.json({ status: msg, linhasAfetadas });
  })();

const deleteEscola = (request, res) =>
  (async () => {
    const escolaREG = request.body;
    let { msg, linhasAfetadas } = await mdlEscolas.deleteEscola(escolaREG);
    res.json({ status: msg, linhasAfetadas });
  })();

module.exports = {
  getAllEscolas,
  getEscolaByID,
  insertEscola,
  updateEscola,
  deleteEscola,
};
