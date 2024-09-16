function fSoma(num1,num2){
    return num1 + num2;
}

function fSub(num1,num2){
    return num1 - num2;
}

function fDiv(num1,num2){
    return num1 / num2;
}

function fMult(num1,num2){
    return num1 * num2;
}

const fCalc = (request, res) => (async () => {
    const { num1, num2, operacao } = request.body;

    if(operacao == '+'){
        var resultado = fSoma(num1,num2);
    }else if(operacao == '-'){
        var resultado = fSub(num1,num2);
    }else if(operacao == '/'){
        var resultado = fDiv(num1,num2);
    }else if(operacao == '*'){
        var resultado = fMult(num1,num2);
    }else{
        var resultado = "Operação inválida";
    }

    res.json({"resultado": resultado });
})();

module.exports = {
    fCalc,
}