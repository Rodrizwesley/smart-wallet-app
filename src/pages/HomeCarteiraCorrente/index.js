import React, { useEffect }  from 'react';
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, Alert, Dimensions } from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { setCarteiraCorrente, setMovimentacaoCarteiraCorrente, setLoading } from '../../store/actions';
import { STYLE } from '../../configs';
import { UsuarioService, Util } from '../../services';

const { width, height } = Dimensions.get('window');

const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ];

function HomeCarteiraCorrente(props) {

    const {
        setCarteiraCorrente,
        setMovimentacaoCarteiraCorrente,
        globalState,
        setLoading,
        navigation
    } = props;

    useEffect(() => {
        if(globalState.usuario != null){
            setEmail(globalState.usuario.email_usuario);
            setPassword(globalState.usuario.senha)
        }

        setLoading(false);
    },[])

    return(
        <View style={STYLE.containerInternal}>
            <View style={{position: 'absolute', top: 0, left: 0, height: '35%', backgroundColor: '#7D07F2', width: '100%', borderBottomEndRadius: 35, borderBottomStartRadius: 35}}>
                <View style={{ marginVertical: 10, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#7D07F2', zIndex: 3}}>
                    <Image style={{width: '10%', height: '100%', resizeMode: "contain"}} source={require('../../assets/LOGO.png')}/>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Icon name='menu' size={40} color='#D0D0D0' />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{flex: 1, marginTop: 50}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>

                <View style={{marginHorizontal: 30, marginVertical:20}}>
                    <Text style={{color: '#D0D0D0', fontSize: 36, fontFamily: ''}}>Resumo</Text>
                </View>

                <View style={{marginHorizontal: 30, marginVertical:10, backgroundColor: '#D0D0D0', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10}}>
                    <Text>NESTE MÊS</Text>
                    <Text style={{fontSize: 30}}>R$ 3.578,00</Text>

                    <LineChart
                        style={{ height: 150 }}
                        data={ data }
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={{ top: 20, bottom: 20 }}
                        curve={shape.curveNatural}
                    >
                    {/* <Grid/> */}
                    </LineChart>
                </View>

                <View style={{marginHorizontal: 30, marginVertical:10}}>
                    <Text style={{color: '#D0D0D0', fontSize: 26, fontFamily: ''}}>Minhas carteiras</Text>
                </View>

                <View style={{marginHorizontal: 30, marginVertical:10}}>
                    <View style={{backgroundColor: '#D0D0D0', borderRadius: 10, padding: 20, flexDirection: 'row', justifyContent: 'space-between', marginVertical:5}}>
                        <Text style={{fontSize: 16}}>Dinheiro</Text>
                        <Text style={{fontSize: 16}}>R$ 578,00</Text>
                    </View>
                    <View style={{backgroundColor: '#D0D0D0', borderRadius: 10, padding: 20, flexDirection: 'row', justifyContent: 'space-between', marginVertical:5}}>
                        <Text style={{fontSize: 16}}>Cartão Bradesco</Text>
                        <Text style={{fontSize: 16}}>R$ 1.500,00</Text>
                    </View>
                    <View style={{backgroundColor: '#D0D0D0', borderRadius: 10, padding: 20, flexDirection: 'row', justifyContent: 'space-between', marginVertical:5}}>
                        <Text style={{fontSize: 16}}>Cartão Itaú</Text>
                        <Text style={{fontSize: 16}}>R$ 1.500,00</Text>
                    </View>

                    <View style={{backgroundColor: '#D0D0D0', borderRadius: 10, padding: 20, flexDirection: 'row', justifyContent: 'space-between', marginVertical:5}}>
                        <Text style={{fontSize: 16}}>Cartão Itaú</Text>
                        <Text style={{fontSize: 16}}>R$ 1.500,00</Text>
                    </View>

                    <View style={{backgroundColor: '#D0D0D0', borderRadius: 10, padding: 20, flexDirection: 'row', justifyContent: 'space-between', marginVertical:5}}>
                        <Text style={{fontSize: 16}}>Cartão Itaú</Text>
                        <Text style={{fontSize: 16}}>R$ 1.500,00</Text>
                    </View>
                </View>

                <View style={{marginHorizontal: 30, marginVertical:10}}>
                    <Text style={{color: '#D0D0D0', fontSize: 26, fontFamily: ''}}>Últimas movimentacões</Text>
                </View>

                <ScrollView horizontal={true} style={{paddingHorizontal: 30, marginVertical:10}} showsHorizontalScrollIndicator={false}>
                    <View style={{backgroundColor: '#D0D0D0', borderRadius: 10, padding: 20, justifyContent: 'space-between', marginHorizontal:5, width: width * 0.35}}>
                        <Text numberOfLines={1} style={{fontSize: 14}}>Compra carrefour</Text>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>R$ 578,00</Text>
                    </View>
                    <View style={{backgroundColor: '#D0D0D0', borderRadius: 10, padding: 20, justifyContent: 'space-between', marginHorizontal:5, width: width * 0.35}}>
                        <Text numberOfLines={1} style={{fontSize: 14}}>Pagamento Salário</Text>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>R$ 1.500,00</Text>
                    </View>
                    <View style={{backgroundColor: '#D0D0D0', borderRadius: 10, padding: 20, justifyContent: 'space-between', marginHorizontal:5, width: width * 0.35}}>
                        <Text numberOfLines={1} style={{fontSize: 14}}>Pagamento fatura cartão</Text>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>R$ 1.500,00</Text>
                    </View>
                    <View style={{backgroundColor: '#D0D0D0', borderRadius: 10, padding: 20, justifyContent: 'space-between', marginHorizontal:5, width: width * 0.35}}>
                        <Text numberOfLines={1} style={{fontSize: 14}}>Pagamento fatura cartão</Text>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>R$ 1.500,00</Text>
                    </View>
                </ScrollView>
                

                {
                    globalState.isLoading ? 
                    <View style={STYLE.loading}>
                        <ProgressBar color='#23D9B7' styleAttr='Large'/>
                    </View> : null
                }
            </ScrollView>
        </View>
    )

}

const mapStateToProps = store => ({
    globalState: store.globalState
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setCarteiraCorrente,
        setMovimentacaoCarteiraCorrente, 
        setLoading
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(HomeCarteiraCorrente);