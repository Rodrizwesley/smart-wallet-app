import React, { useEffect }  from 'react';
import { Image, View} from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doLogout } from '../../store/actions';
import { STYLE } from '../../configs';

function MenuContent(props){
    const {
        doLogout,
        globalState
    } = props;

    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <View style={STYLE.drawerContainer}>
            <View>
                <View style={STYLE.cadastroImageBox}>
                <Image style={STYLE.image} source={require('../../assets/CENTRO.png')}/>
                </View>
            
                <DrawerItem
                focused={props.state.index == 0 ? true : false}
                icon={({ size, color }) => <Icon name='account-balance' size={size} color={color} />}
                activeBackgroundColor='#03DAC5'
                activeTintColor='#515151'
                inactiveTintColor='#D0D0D0'
                label="Minha Carteira"
                onPress={() => {props.navigation.navigate('CarteiraCorrente')}}
                />
                <DrawerItem
                focused={props.state.index == 1 ? true : false}
                icon={({ size, color }) => <Icon name='account-box' size={size} color={color} />}
                activeBackgroundColor='#03DAC5'
                activeTintColor='#515151'
                inactiveTintColor='#D0D0D0'
                label="Meus Dados"
                onPress={() => {props.navigation.navigate('DadosPessoais')}}
                />
            </View>

            <View style={{marginVertical: 10}}>
                <DrawerItem
                icon={({ size, color }) => <Icon name='exit-to-app' size={size} color={color} />}
                activeBackgroundColor='#03DAC5'
                activeTintColor='#515151'
                inactiveTintColor='#D0D0D0'
                label="Sair"
                onPress={() => doLogout()}
                />
            </View>
        </View>

    )
}


const mapStateToProps = store => ({
    globalState: store.globalState
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        doLogout
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(MenuContent);