import { API } from "../configs/constants";

async function createMovimentacaoCarteiraCorrente(objCarteiraCorrente){
// 
    
    return await fetch(API + 'movimentacaoCorrente/create', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objCarteiraCorrente)
    }).then(res => {    
        console.log(res)
        return res.json();
    }).then(resJson => {
        console.log(resJson)
        return resJson
    })

}

async function updateMovimentacaoCarteiraCorrente(objCarteiraCorrente){

    return await fetch(API + 'movimentacaoCorrente/update', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objCarteiraCorrente)
    }).then(res => {    
        console.log(res)
        return res.json();
    }).then(resJson => {
        console.log(resJson)
        return resJson
    })

}

async function getAllMovimentacaoCarteiraCorrenteByUsuario(idUsuario){
    return await fetch(API + 'movimentacaoCorrente/findIdUsuario/' + idUsuario, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {    
        // console.log(res)
        return res.json();
    }).then(resJson => {
        // console.log(resJson)
        return resJson
    })
}

async function deleteMovimentacaoCarteiraCorrente(idMovimentacaoCarteiraCorrente){

    return await fetch(API + 'movimentacaoCorrente/delete/'+ idMovimentacaoCarteiraCorrente, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {    
        console.log(res)
        return res.ok;
    }).then(resJson => {
        console.log(resJson)
        return resJson
    })

}

export {
    createMovimentacaoCarteiraCorrente,
    getAllMovimentacaoCarteiraCorrenteByUsuario,
    deleteMovimentacaoCarteiraCorrente,
    updateMovimentacaoCarteiraCorrente
}