import React, { useEffect }  from 'react';
import { Image, TouchableOpacity} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TabNavigationCorrente from '../TabNavigationCorrente';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { setCarteiraCorrente, setMovimentacaoCarteiraCorrente, doLogout } from '../../store/actions';

const Drawer = createDrawerNavigator();

function MenuLateral(props) {
  return (
    <Drawer.Navigator drawerPosition='right' screenOptions={{
        headerShown: false
    }}>
      <Drawer.Screen name="CarteiraCorrente" component={TabNavigationCorrente} options={{
        headerTitle: '',
        headerStyle: {
            backgroundColor: '#7D07F2',
        },
        // headerLeft: () =>  (<Image style={{marginHorizontal: 10, width: 30, height: '100%', resizeMode: "contain"}} source={require('../../assets/LOGO.png')}/>),
        // headerRight:() => (<TouchableOpacity onPress={() => props.navigation.toggleDrawer}><Icon name='menu' size={40} color='#D0D0D0' /></TouchableOpacity>)
      }} />
    </Drawer.Navigator>
  );
}

const mapStateToProps = store => ({
    globalState: store.globalState
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setCarteiraCorrente,
        setMovimentacaoCarteiraCorrente,
        doLogout
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(MenuLateral);