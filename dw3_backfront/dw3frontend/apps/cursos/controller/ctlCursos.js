const axios = require("axios");
// const validate = require("../validate/vldCourse"); // Caso você tenha uma validação específica

const ManutCursos = async (req, res) => {
  if (req.method === "POST") {
    const formData = req.body;

    // Validação (se necessário)
    if (!validate.Validar(formData)) {
      return res.status(400).json({ status: "error", msg: "Dados inválidos" });
    }

    try {
      const resp = await axios.post(`${process.env.SERVIDOR_SIADBack}/courses`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.json({ status: "ok", msg: "Curso adicionado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ status: "error", msg: error.response.data.msg });
    }
  } else {
    const parametros = { title: "SIAD - Manutenção de cursos" };
    res.render("30100admin/30120courses/view/vwCursos.njk", { parametros });
  }
};

const insertCursos = (req, res) => {
  const parametros = { title: "SIAD - Inserir Curso" };
  res.render("30100admin/30120courses/view/vwInsertCurso.njk", { parametros });
};

const viewCurso = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${process.env.SERVIDOR_SIADBack}/courses/${id}`);
    const curso = response.data;
    const parametros = { title: "SIAD - Visualizar Curso", curso };
    res.render("30100admin/30120courses/view/vwViewCurso.njk", { parametros });
  } catch (error) {
    res.status(400).json({ status: "error", msg: "Erro ao visualizar curso" });
  }
};

const updateCurso = async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    await axios.put(`${process.env.SERVIDOR_SIADBack}/courses/${id}`, formData, {
      headers: { "Content-Type": "application/json" },
    });

    res.json({ status: "ok", msg: "Curso atualizado com sucesso!" });
  } catch (error) {
    res.status(400).json({ status: "error", msg: "Erro ao atualizar curso" });
  }
};

const deleteCurso = async (req, res) => {
  const { id } = req.body;

  try {
    await axios.delete(`${process.env.SERVIDOR_SIADBack}/courses/${id}`);
    res.json({ status: "ok", msg: "Curso deletado com sucesso!" });
  } catch (error) {
    res.status(400).json({ status: "error", msg: "Erro ao deletar curso" });
  }
};

module.exports = {
  ManutCursos,
  insertCursos,
  viewCurso,
  updateCurso,
  deleteCurso,
};
