import React, { useEffect }  from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCarteiraCorrente, setMovimentacaoCarteiraCorrente, setLoading } from '../../store/actions';
import { STYLE } from '../../configs';
import { UsuarioService, Util } from '../../services';
import { CardResumo } from '../../components/CardResumoCarteira';
import { CardCarteira } from '../../components/CardCarteira';
import { CardMovimentacaoCarrocel } from '../../components/CardMovimentacaoCarrocel';
import { Background } from '../../components/Background';

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
            <Background navigation={props.navigation}/>
            <ScrollView style={{flex: 1, marginTop: 50}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>

                <View style={{marginHorizontal: 30, marginVertical:20}}>
                    <Text style={{color: '#D0D0D0', fontSize: 36, fontFamily: ''}}>Resumo</Text>
                </View>

                <CardResumo saldo='3.587,59' data={data}/>

                <View style={{marginHorizontal: 30, marginVertical:10}}>
                    <Text style={{color: '#D0D0D0', fontSize: 26, fontFamily: ''}}>Minhas carteiras</Text>
                </View>

                <View style={{marginHorizontal: 30, marginVertical:10}}>
                    
                    <CardCarteira nome='Dinheiro' saldo='2.578,69' />

                    <CardCarteira nome='Cartão Crédito' saldo='1.137,68' />

                    <CardCarteira nome='Cofrinho' saldo='680,00' />
                    
                </View>

                <View style={{marginHorizontal: 30, marginVertical:10}}>
                    <Text style={{color: '#D0D0D0', fontSize: 26, fontFamily: ''}}>Últimas movimentacões</Text>
                </View>

                <ScrollView horizontal={true} style={{paddingHorizontal: 30, marginVertical:10}} showsHorizontalScrollIndicator={false}>
                    <CardMovimentacaoCarrocel descricao='Compra carrefour' valor='285,56' />
                    <CardMovimentacaoCarrocel descricao='Compra extra' valor='358,25' />
                    <CardMovimentacaoCarrocel descricao='Pagamento salário' valor='2.800,00' />
                </ScrollView>

                {
                    globalState.isLoading ? 
                    <View style={STYLE.loading}>
                        <ProgressBar color='#03DAC5' styleAttr='Large'/>
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