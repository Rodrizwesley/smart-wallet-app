import React, { useEffect }  from 'react';
import { Image, Text, TouchableOpacity, View} from 'react-native';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TabNavigationCorrente from '../TabNavigationCorrente';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { doLogout } from '../../store/actions';
import DadosPessoais from '../../pages/DadosPessoais';
import MenuContent from '../../components/MenuContent';


const Drawer = createDrawerNavigator();

function MenuLateral(props) {
  useEffect(() => {
    console.log(props)
  }, [])
  return (
    <Drawer.Navigator 
      drawerPosition='right' 
      screenOptions={{
        headerShown: false
      }}
      drawerContentOptions={{
        activeBackgroundColor: '#03DAC5',
        activeTintColor: '#515151',
        inactiveTintColor: '#D0D0D0',
        style: {
          backgroundColor: '#515151'
        },
      }}
     drawerContent={props => <MenuContent {...props}/>} 
    >
      <Drawer.Screen name="CarteiraCorrente" component={TabNavigationCorrente} options={{
        headerTitle: '',
        headerStyle: {
            backgroundColor: '#7445FF',
        },
        drawerLabel: 'Minha Carteira Pessoal',
        drawerIcon: ({ size, color }) => <Icon name='account-balance' size={size} color={color} />
        }} />
      <Drawer.Screen name="DadosPessoais" component={DadosPessoais} options={{
        headerShown: true,
        drawerIcon: ({ size, color }) => <Icon name='account-box' size={size} color={color} />,
        headerTitle: 'Minha Conta',
        headerTintColor: '#D0D0D0',
        headerStyle: {
            backgroundColor: '#7445FF',
        },
        drawerLabel: 'Minha Conta',
        headerLeft: () =>  (<Image style={{marginHorizontal: 10, width: 30, height: '100%', resizeMode: "contain"}} source={require('../../assets/LOGO.png')}/>),
        headerRight:() => (<TouchableOpacity style={{marginHorizontal: 10}} onPress={() =>  props.navigation.dispatch(DrawerActions.toggleDrawer())}><Icon name='menu' size={40} color='#D0D0D0' /></TouchableOpacity>)
      }} />
    </Drawer.Navigator>
  );
}

const mapStateToProps = store => ({
    globalState: store.globalState
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        doLogout
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(MenuLateral);