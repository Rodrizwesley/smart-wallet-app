import React, { useEffect }  from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { setCarteiraCorrente, setMovimentacaoCarteiraCorrente } from '../../store/actions';
import HomeCarteiraCorrente from '../../pages/HomeCarteiraCorrente';

const Tab = createBottomTabNavigator();

function TabNavigationCorrente(props){

    return(
        <Tab.Navigator
            initialRouteName="Carteira"
            tabBarOptions={{
                showIcon: true,
                showLabel: false,
                indicatorStyle: {
                },
                labelStyle: { fontSize: 10 },
                style: { backgroundColor: '#515151' },
            }}
        >
            <Tab.Screen                     
                initialParams={props}
                name="Carteira"
                component={HomeCarteiraCorrente}
                options={{ 
                    tabBarIcon: ({focused}) => {
                        if(focused){
                            return <Icon name='account-balance-wallet' size={35} color='#23D9B7' />
                        }
                        else{
                            return <Icon name='account-balance-wallet' size={35} color='#D0D0D0' />
                        }
                    }}}
                />
                <Tab.Screen                     
                initialParams={props}
                name="Movimentacao"
                component={HomeCarteiraCorrente}
                options={{ 
                    tabBarIcon: ({focused}) => {
                        if(focused){
                            return <Icon name='receipt' size={35} color='#23D9B7' />
                        }
                        else{
                            return <Icon name='receipt' size={35} color='#D0D0D0' />
                        }
                    }}}
                />
                <Tab.Screen                     
                initialParams={props}
                name="Relatorio"
                component={HomeCarteiraCorrente}
                options={{ 
                    tabBarIcon: ({focused}) => {
                        if(focused){
                            return <Icon name='donut-small' size={35} color='#23D9B7' />
                        }
                        else{
                            return <Icon name='donut-small' size={35} color='#D0D0D0' />
                        }
                    }}}
                />
        </Tab.Navigator>
    )

}

const mapStateToProps = store => ({
    globalState: store.globalState
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setCarteiraCorrente,
        setMovimentacaoCarteiraCorrente
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigationCorrente);