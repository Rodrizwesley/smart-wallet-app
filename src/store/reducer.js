import { combineReducers } from "redux";

const { SIGN_IN, SIGN_OUT, USUARIO, CARTEIRA_CORRENTE,MOVIMENTACAO_CARTEIRA_CORRENTE, LOADING } = require("./actionTypes");

const INITIAL_STATE = {
    isLoading: true,
    isSignout: false,
    usuario: null,
    carteiraCorrente: [],
    movimentacaoCarteiraCorrente: [],
    isAuthenticate: false
}

const stateReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                isSignout: false,
                isAuthenticate: action.isAuthenticate,
                isLoading: false
            };

        case SIGN_OUT:
            return {
                ...state,
                isSignout: true,
                isAuthenticate: action.isAuthenticate,
                isLoading: false
            };

        case USUARIO:
            return {
                ...state,
                usuario: action.usuario,
            };

        case CARTEIRA_CORRENTE:
            return {
                ...state,
                carteiraCorrente: action.carteiraCorrente
            }

        case MOVIMENTACAO_CARTEIRA_CORRENTE: 
            return {
                ...state,
               movimentacaoCarteiraCorrente: action.movimentacaoCarteiraCorrente 
            }

        case LOADING: 
            return {
                ...state,
               isLoading: action.isLoading 
            }
    
        default:
            return state;
    }
}

export const Reducer = combineReducers({
    globalState: stateReducer
});

