import { SIGN_IN, CARTEIRA_CORRENTE, SIGN_OUT, USUARIO, MOVIMENTACAO_CARTEIRA_CORRENTE, LOADING} from './actionTypes';

export const doLogin = value => ({
    type: SIGN_IN,
    isAuthenticate: value
})

export const doLogout = value => ({
    type: SIGN_OUT,
    isAuthenticate: value
})

export const setUsuario = value => ({
    type: USUARIO,
    usuario: value
})

export const setCarteiraCorrente = value => ({
    type: CARTEIRA_CORRENTE,
    carteiraCorrente: value
})

export const setMovimentacaoCarteiraCorrente = value => ({
    type: MOVIMENTACAO_CARTEIRA_CORRENTE,
    movimentacaoCarteiraCorrente: value
})

export const setLoading = value => ({
    type: LOADING,
    isLoading: value
})

