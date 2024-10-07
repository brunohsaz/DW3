const db = require("../../../database/databaseconfig");

const getAllEscolas = async () => {
    return (await db.query("SELECT * FROM escolas WHERE deleted = false ORDER BY nome ASC")).rows;
};

const getEscolaByID = async (escolaIDPar) => {
    return (await db.query("SELECT * FROM escolas WHERE escolaid = $1 AND deleted = false", [escolaIDPar])).rows;
};

const insertEscola = async (escolaREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO escolas (codigo, nome, dataabertura, deleted) VALUES ($1, $2, $3, $4)",
                [escolaREGPar.codigo, escolaREGPar.nome, escolaREGPar.dataabertura, false]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlEscolas|insertEscola] " + error.detail;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

const updateEscola = async (escolaREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE escolas SET codigo = $2, nome = $3, dataabertura = $4 WHERE escolaid = $1",
                [escolaREGPar.escolaid, escolaREGPar.codigo, escolaREGPar.nome, escolaREGPar.dataabertura]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlEscolas|updateEscola] " + error.detail;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

const deleteEscola = async (escolaREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query("UPDATE escolas SET deleted = true WHERE escolaid = $1", [escolaREGPar.escolaid])
        ).rowCount;
    } catch (error) {
        msg = "[mdlEscolas|deleteEscola] " + error.detail;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

module.exports = {
    getAllEscolas,
    getEscolaByID,
    insertEscola,
    updateEscola,
    deleteEscola,
};
