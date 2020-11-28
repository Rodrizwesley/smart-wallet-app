import React, { useEffect, useState }  from 'react';
import { Text, View, ScrollView, Alert, TouchableOpacity, Modal, Image, TextInput, RefreshControl, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  ProgressChart } from "react-native-chart-kit";
import { STYLE } from '../../configs';
import { setCarteiraCorrente, setMovimentacaoCarteiraCorrente, setLoading } from '../../store/actions';
import { MovimentacaoCarteiraCorrenteService, Util } from '../../services';
import { CardCarteira } from '../../components/CardCarteira';

function RelatorioCorrente(props){

    const {
        setCarteiraCorrente,
        setMovimentacaoCarteiraCorrente,
        globalState,
        setLoading,
    } = props;

    const [refreshing, setRefreshing] = React.useState(false);
    const [dataChart, setDataChart] = React.useState(null);
    const [earnedSpent, setEarnedSpent] = React.useState(null);
    const [maiorMovimentacao, setMaiorMovimentacao] = React.useState(null);
    const [menorMovimentaco, setMenorMovimentacao] = React.useState(null);

    const chartConfig = {
        backgroundGradientFrom: '#232323',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#232323',
        backgroundGradientToOpacity: 0,
        fillShadowGradient: '#000',
        fillShadowGradientOpacity: 0.5,
        color: (opacity = 1) => `rgba(116, 69, 255, ${opacity})`,
        strokeWidth: 3, // optional, default 3
        barPercentage: 0.1,
        useShadowColorFromDataset: false, // optional
    };
    
    useEffect(() => {
        setLoading(true);
        syncPage();
    },[])

    const syncPage = async () => { 
        let movimentacao = globalState.movimentacaoCarteiraCorrente;
        let earned = 0;
        let spent = 0;
        let percentSpent = 0;
        let percentEarned = 1;
        if(movimentacao.length > 0){
            movimentacao.forEach(item => {
                if(item.valor > 0){
                    earned += item.valor;
                }else{
                    spent -= item.valor;
                }
            })

            percentSpent = earned > 0 ? spent / earned : 1;
            percentEarned = percentSpent == 1 ? 0 : percentEarned - percentSpent;
            console.log(percentSpent);
            console.log(percentEarned);
            // if(earned == 0){
            //     percentSpent = 0;
            //     percentEarned = 1;
            // }

            setDataChart({
                labels: ["Gasto", "Ganho"],
                data: [percentSpent, percentEarned]
            })

            let max = Math.max.apply(Math, movimentacao.map(function(o) { return o.valor; }));
            let min = Math.min.apply(Math, movimentacao.map(function(o) { return o.valor; }));

            console.log(max)
            console.log(min)
            let indexMax = movimentacao.findIndex(obj => obj.valor == max);
            let indexMin = movimentacao.findIndex(obj => obj.valor == min);

            if(max != min){
                setMaiorMovimentacao(movimentacao[indexMax]);
                setMenorMovimentacao(movimentacao[indexMin]);
            }else{
                setMaiorMovimentacao(movimentacao[indexMax]);
                setMenorMovimentacao(null);
            }
            setEarnedSpent([earned, spent])
        }

        setRefreshing(false);
        setLoading(false);
    }

    return(
        <View style={STYLE.containerInternal}>
            <View style={{ marginVertical: 10, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', zIndex: 3}}>
                <Image style={{width: '10%', height: '100%', resizeMode: "contain"}} source={require('../../assets/LOGO.png')}/>
                <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                    <Icon name='menu' size={40} color='#D0D0D0' />
                </TouchableOpacity>
            </View>

            <ScrollView style={{flex: 1, marginTop: 10, paddingHorizontal: 20}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' refreshControl={<RefreshControl colors={['#7445FF']} refreshing={refreshing} onRefresh={async () => {
                setRefreshing(true);
                await syncPage();
            }} />}>

            <View style={{marginHorizontal: 10, marginVertical:20}}>
                <Text style={{color: '#D0D0D0', fontSize: 36, fontFamily: ''}}>Relatório Simplificado</Text>
            </View>
            
            <View>
                {
                    dataChart !== null ?
                    <ProgressChart
                        data={dataChart}
                        width={Dimensions.get('window').width - 50} 
                        height={220}
                        strokeWidth={26}
                        radius={54}
                        chartConfig={chartConfig}
                        hideLegend={false}
                        style={{marginVertical: 10}}
                        />
                    : null
                }
            </View>

            
            {
                earnedSpent != null ? 
                    <View style={{backgroundColor: '#D0D0D0', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 20, borderRadius: 10, marginVertical: 20}}>
                    <View style={{flexDirection: 'column', alignSelf: 'flex-start'}}>
                        <Text style={{color: '#4c4c4c'}}>Total de ganhos no mês:</Text>
                        <Text style={{fontSize: 30}}>{Util.formataDinheiro(earnedSpent[0])}</Text>
                    </View>
                    <View style={{flexDirection: 'column', alignSelf: 'flex-start'}}>
                        <Text style={{color: '#4c4c4c'}}>Total de gastos no mês:</Text>
                        <Text style={{fontSize: 30}}>{Util.formataDinheiro(earnedSpent[1])}</Text>
                    </View>
                </View>
                : null
            }

            <View style={{marginHorizontal: 10, marginVertical:10}}>
                <Text style={{color: '#D0D0D0', fontSize: 26, fontFamily: ''}}>Movimentações do mês</Text>
            </View>
            {
                maiorMovimentacao != null ?
                    <View style={{marginHorizontal: 10}}>
                        <CardCarteira nome={maiorMovimentacao.descricaoMovimentacao} saldo={maiorMovimentacao.valor.toFixed(2)} />
                    </View>
                : null
            }

            {
                menorMovimentaco != null ?
                    <View style={{marginHorizontal: 10}}>
                        <CardCarteira nome={menorMovimentaco.descricaoMovimentacao} saldo={menorMovimentaco.valor.toFixed(2)} />
                    </View>
                : null
            }
            

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

export default connect(mapStateToProps, mapDispatchToProps)(RelatorioCorrente);