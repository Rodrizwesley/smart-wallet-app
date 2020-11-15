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

async function findCPFandEmail(cpf, email){
    console.log(cpf, email);

    let obj = {
        "email": email,
        "cpf": cpf
    }

    let objStr = JSON.stringify(obj) ;

    console.log(objStr) 
    return await fetch(API + 'usuario/findCpfEmail', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: objStr
    }).then(res => {    
        console.log(res)
        return res.json();
    }).then(resJson => {
        console.log(resJson)
        return resJson
    })
}

async function trocarSenha(idUsuario, novaSenha){
    console.log(idUsuario, novaSenha);

    let obj = {
        "idUsuario": idUsuario,
        "novaSenha": novaSenha
    }

    let objStr = JSON.stringify(obj) ;

    console.log(objStr) 
    return await fetch(API + 'usuario/trocarSenha', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: objStr
    }).then(res => {    
        console.log(res)
        return res.json();
    }).then(resJson => {
        console.log(resJson)
        return resJson
    })
}

async function login(email, senha){
        console.log(email, senha);

    let obj = {
        "email":email,
        "senha": senha
    }

    let objStr = JSON.stringify(obj) ;

    console.log(objStr) 
    return await fetch(API + 'usuario/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: objStr
    }).then(res => {    
        console.log(res)
        return res.json();
    }).then(resJson => {
        console.log(resJson)
        return resJson
    })
}


export {
    cadastraUsuario,
    findCPFandEmail,
    trocarSenha,
    login
}