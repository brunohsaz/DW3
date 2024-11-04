const axios = require("axios");

const manutCursos = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;
  
  try {
    const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllCursos", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // Set JWT token in the header
      }
    });

    res.render("cursos/view/vwManutCursos.njk", {
      title: "Manutenção de cursos",
      data: resp.data.registro,
      erro: null,
      userName: userName,
    });
  } catch (error) {
    let remoteMSG;
    if (error.code === "ECONNREFUSED") {
      remoteMSG = "Servidor indisponível";
    } else if (error.code === "ERR_BAD_REQUEST") {
      remoteMSG = "Usuário não autenticado";
    } else {
      remoteMSG = error;
    }

    res.render("cursos/view/vwManutCursos.njk", {
      title: "Manutenção de cursos",
      data: null,
      erro: remoteMSG,
      userName: userName,
    });
  }
};

const insertCursos = async (req, res) => {
  if (req.method === "GET") {
    const userName = req.session.userName;
    res.render("cursos/view/vwFCrCursos.njk", {
      title: "Cadastro de cursos",
      data: null,
      erro: null,
      userName: userName,
    });
  } else {
    const regData = req.body;
    const token = req.session.token;

    try {
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/InsertCursos", regData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        timeout: 5000, // 5 segundos de timeout
      });

      res.json({
        status: response.data.status,
        msg: response.data.msg,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error('Erro ao inserir dados no servidor backend:', error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: null,
        erro: null,
      });
    }
  }
};

const ViewCursos = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;

  try {
    if (req.method === "GET") {
      const id = req.params.id;

      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/GetCursoByID", {
        cursoid: id,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === "ok") {
        res.render("cursos/view/vwFRUDrCursos.njk", {
          title: "Visualização de cursos",
          data: response.data.registro[0],
          userName: userName,
        });
      } else {
        console.log("[ctlCursos|ViewCursos] ID de curso não localizado!");
      }
    }
  } catch (erro) {
    res.json({ status: "[ctlCursos.js|ViewCursos] Curso não localizado!" });
    console.log("[ctlCursos.js|ViewCursos] Erro não identificado", erro);
  }
};

const UpdateCurso = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;

  try {
    if (req.method === "GET") {
      const id = req.params.id;

      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/GetCursoByID", {
        cursoid: id,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === "ok") {
        res.render("cursos/view/vwFRUDrCursos.njk", {
          title: "Atualização de dados de cursos",
          data: response.data.registro[0],
          disabled: false,
          userName: userName,
        });
      } else {
        console.log("[ctlCursos|UpdateCurso] Dados não localizados");
      }
    } else {
      const regData = req.body;

      try {
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/UpdateCursos", regData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000, // 5 segundos de timeout
        });

        res.json({
          status: response.data.status,
          msg: response.data.msg,
          data: response.data,
          erro: null,
        });
      } catch (error) {
        console.error('[ctlCursos.js|UpdateCurso] Erro ao atualizar dados de cursos no servidor backend:', error.message);
        res.json({
          status: "Error",
          msg: error.message,
          data: null,
          erro: null,
        });
      }
    }
  } catch (erro) {
    res.json({ status: "[ctlCursos.js|UpdateCurso] Curso não localizado!" });
    console.log("[ctlCursos.js|UpdateCurso] Erro não identificado", erro);
  }
};

const DeleteCurso = async (req, res) => {
  const regData = req.body;
  const token = req.session.token;

  try {
    const response = await axios.post(process.env.SERVIDOR_DW3Back + "/DeleteCursos", regData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      timeout: 5000, // 5 segundos de timeout
    });

    res.json({
      status: response.data.status,
      msg: response.data.msg,
      data: response.data,
      erro: null,
    });
  } catch (error) {
    console.error('[ctlCursos.js|DeleteCurso] Erro ao deletar dados de cursos no servidor backend:', error.message);
    res.json({
      status: "Error",
      msg: error.message,
      data: null,
      erro: null,
    });
  }
};

module.exports = {
  manutCursos,
  insertCursos,
  ViewCursos,
  UpdateCurso,
  DeleteCurso
};
