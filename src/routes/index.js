import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { bindActionCreators }  from 'redux';
import { doLogin, doLogout, setUsuario, setCarteiraCorrente, setMovimentacaoCarteiraCorrente} from '../store/actions'
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';

const Stack = createStackNavigator();

function AppNavigation(props){
    const {
        doLogin,
        globalState
    } = props
    
    return (
        <>
            <Stack.Navigator >
                <Stack.Screen name='Login' component={Login} options={{
                    title: 'Login',
                    headerShown: false,
                }}/>

                <Stack.Screen name='Increvendo' component={Cadastro} options={{
                    title: 'Realizar Cadastro',
                    headerStyle: {
                        backgroundColor: '#515151'
                    },
                    headerTintColor: '#E7E7E7'
                }}/>
            </Stack.Navigator>
        </>
    )

}

const mapStateToProps = store => ({
    globalState: store.globalState
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        doLogin,
        doLogout,
        setUsuario,
        setCarteiraCorrente,
        setMovimentacaoCarteiraCorrente
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation)