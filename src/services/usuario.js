import { API } from "../configs/constants"

async function cadastraUsuario(cpf, nomeCompleto, telefone, email1, senha1){
    console.log(cpf, nomeCompleto, telefone, email1, senha1);

    let usuarioOBJ = {
        "cpfUsuario": cpf,
        "nomeUsuario": nomeCompleto,
        "telefoneUsuario": telefone,
        "emailUsuario": email1,
        "senhaUsuario": senha1
    }

    let usuarioOBJSTR = JSON.stringify(usuarioOBJ) ;

    console.log(usuarioOBJSTR) 
    return await fetch(API + 'usuario', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: usuarioOBJSTR
    }).then(res => {    
        console.log(res)
        return res.json();
    }).then(resJson => {
        console.log(resJson)
        return resJson
    })
}


export {
    cadastraUsuario
}