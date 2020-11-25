import { API } from "../configs/constants";

async function getAllInstituicaoFinanceira(){
    return await fetch(API + 'instituicaoFinanceira/findAll', {
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

async function createCarteiraCorrente(objCarteiraCorrente){
// 
    
    return await fetch(API + 'carteiraCorrente/create', {
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

async function updateCarteiraCorrente(objCarteiraCorrente){
// 
    
    return await fetch(API + 'carteiraCorrente/update', {
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

async function deleteCarteiraCorrente(idCarteiraCorrente){

    return await fetch(API + 'carteiraCorrente/delete/'+ idCarteiraCorrente, {
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

async function getAllCarteiraCorrenteByUsuario(idUsuario){
    return await fetch(API + 'carteiraCorrente/find/' + idUsuario, {
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

export {
    getAllInstituicaoFinanceira,
    createCarteiraCorrente,
    getAllCarteiraCorrenteByUsuario,
    updateCarteiraCorrente,
    deleteCarteiraCorrente
}
