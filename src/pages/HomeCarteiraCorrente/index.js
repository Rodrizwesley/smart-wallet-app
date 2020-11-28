import React, { useEffect }  from 'react';
import { Text, View, ScrollView, Alert, TouchableOpacity, Modal, Image, TextInput, RefreshControl } from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { RadioButton } from 'react-native-paper';
import { setCarteiraCorrente, setMovimentacaoCarteiraCorrente, setLoading } from '../../store/actions';
import { STYLE } from '../../configs';
import { CarteiraCorrenteService, MovimentacaoCarteiraCorrenteService } from '../../services';
import { CardResumo } from '../../components/CardResumoCarteira';
import { CardCarteira } from '../../components/CardCarteira';
import { CardMovimentacaoCarrocel } from '../../components/CardMovimentacaoCarrocel';
import { Background } from '../../components/Background';

function HomeCarteiraCorrente(props) {

    const {
        setCarteiraCorrente,
        setMovimentacaoCarteiraCorrente,
        globalState,
        setLoading
    } = props;

    const [modal, setModal] = React.useState(false);
    const [edicao, setEdicao] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [checked, setChecked] = React.useState(0);
    const [objCarteira, setObjCarteira] = React.useState({cartao: 0})
    const [items, setItems] = React.useState([]);
    const [movimentacao, setMovimentacao] = React.useState([]);
    const [saldo, setSaldo] = React.useState(0);
    const [refreshing, setRefreshing] = React.useState(false);

    let controller;

    useEffect(() => {
        setLoading(true);
        syncPage();
    },[])

    const syncPage = async () => {
        let _instituicaoFinanceira = await CarteiraCorrenteService.getAllInstituicaoFinanceira();
        // console.log(_instituicaoFinanceira)
        let _tems = []
        _instituicaoFinanceira.forEach((item) => {
            let obj = {}
            obj.label = item.codigo + " - " + item.nomeExtenso;
            obj.value = item.idInstituicaoFinanceira;

            if(item.idInstituicaoFinanceira == 269 || item.idInstituicaoFinanceira == 270){
                obj.label = item.nomeExtenso;
                _tems.unshift(obj)
            }else{
                _tems.push(obj);
            }
        })

        let _carteirasCorrente = await CarteiraCorrenteService.getAllCarteiraCorrenteByUsuario(globalState.usuario.id_usuario);
        let _temsCarteira = [];
        let _saldo = 0
        _carteirasCorrente.forEach(item => {
            // console.log(item.saldo)
            _temsCarteira.push(item.saldo);
        })
        setCarteiraCorrente(_carteirasCorrente);

        let _movimentacao = await MovimentacaoCarteiraCorrenteService.getAllMovimentacaoCarteiraCorrenteByUsuario(globalState.usuario.id_usuario);
        _movimentacao.forEach(item => {
             _temsCarteira.push(item.valor);
            _saldo += item.valor;
        })
        setMovimentacaoCarteiraCorrente(_movimentacao);

        setItems(_tems);
        setMovimentacao(_temsCarteira);
        setSaldo(_saldo)
        setRefreshing(false);
        setLoading(false);
    }

    const persistCarteira = async () => {
        setLoading(true);

        let _saldo = Number.parseFloat(objCarteira.saldo)
        objCarteira.saldo = _saldo;
        objCarteira.idUsuario = globalState.usuario.id_usuario
        console.log(objCarteira);
        let persistCarteira = await CarteiraCorrenteService.createCarteiraCorrente(objCarteira);

        console.log(persistCarteira);

        setModal(false);
        setEdicao(false);
        setObjCarteira({cartao: 0});
        setValue(null)
        setLoading(false);
        await syncPage();
    }

    const editaCarteira = async () => {
        setLoading(true);

        let _saldo = Number.parseFloat(objCarteira.saldo)
        objCarteira.saldo = _saldo;
        let updateCarteira = await CarteiraCorrenteService.updateCarteiraCorrente(objCarteira);

        console.log(updateCarteira);

        setModal(false);
        setEdicao(false);
        setObjCarteira({cartao: 0});
        setValue(null);
        await syncPage();
    }

    const deleteCarteira = async () => {
        setLoading(true);
        setObjCarteira({...objCarteira, idUsuario: 7})
        await CarteiraCorrenteService.deleteCarteiraCorrente(objCarteira.idCarteiraCorrente);

        setModal(false);
        setEdicao(false);
        setObjCarteira({cartao: 0});
        setValue(null);
        await syncPage();
    }

    const buscaCarteira = (idCarteiraCorrente) => {
        let index = globalState.carteiraCorrente.findIndex(obj => obj.idCarteiraCorrente == idCarteiraCorrente);
        if(index != -1 ){
            let _objCarteira = globalState.carteiraCorrente[index];
            
            setObjCarteira({..._objCarteira, saldo: _objCarteira.saldo.toString()});
            setValue(_objCarteira.idInstituicaoFinanceira)
            setModal(true);
            setEdicao(true);
        }

    }

    return(
        <View style={STYLE.containerInternal}>
            <Background navigation={props.navigation}/>
            <ScrollView style={{flex: 1, marginTop: 50}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' refreshControl={<RefreshControl colors={['#7445FF']} refreshing={refreshing} onRefresh={async () => {
                setRefreshing(true);
                await syncPage();
            }} />}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        setModal(false)
                    }}
                >
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}} >
                        <View style={{flex: 1, backgroundColor: '#232323', margin: 20, borderRadius: 10}}>
                            <View style={[STYLE.cadastroTextBox, {flexDirection: 'row', alignItems: 'center', padding: 15}]} >
                                <Image style={{width: 50, height: 100, resizeMode: "contain"}} source={require('../../assets/LOGO.png')} />
                                <Text style={[STYLE.dadosPessoaisText, {marginHorizontal: 5, textAlign: 'center'}]}>Adicione uma novo banco ou cartão para organizar suas finanças e parta para novos objetivos!</Text>
                            </View>

                            <View style={STYLE.loginInputBox}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10}}>
                                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {
                                        setChecked(0)
                                        setObjCarteira({...objCarteira, cartao: 0})
                                    }}>
                                        <RadioButton
                                            uncheckedColor='#7C878C'
                                            value='first'
                                            status={ checked === 0 ? 'checked' : 'unchecked' }
                                            onPress={() => {
                                                setChecked(0);
                                                setObjCarteira({...objCarteira, cartao: 0})
                                            }}
                                            color='#03DAC5'
                                        />
                                        <Text style={STYLE.cadastroText}>Conta</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {
                                        setChecked(1);
                                        setObjCarteira({...objCarteira, cartao: 1})
                                    }}>
                                        <RadioButton
                                            uncheckedColor='#7C878C'
                                            value='second'
                                            status={ checked === 1 ? 'checked' : 'unchecked' }
                                            onPress={() => {
                                                setChecked(1);
                                                setObjCarteira({...objCarteira, cartao: 1})
                                            }}
                                            color='#03DAC5'
                                        />
                                        <Text style={STYLE.cadastroText}>Cartão</Text>
                                    </TouchableOpacity>
                                </View>
                                <DropDownPicker
                                    items={items}
                                    controller={instance => controller = instance}
                                    onChangeList={(items, callback) => {
                                        new Promise((resolve, reject) => resolve(setItems(items)))
                                            .then(() => callback())
                                            .catch(() => {});
                                    }}
                                    defaultValue={value}
                                    onChangeItem={item => {
                                        setValue(item.value);
                                        setObjCarteira({...objCarteira, idInstituicaoFinanceira: item.value})
                                    }}
                                    placeholder='Selecione sua instituição financeira'
                                    containerStyle={{height: 60,  borderRadius: 8 }}
                                    placeholderStyle={{color: "#E7E7E7"}}
                                    selectedLabelStyle={{color: "#E7E7E7"}}
                                    dropDownStyle={{backgroundColor: '#7C878C', borderColor: '#7C878C', borderRadius: 8}}
                                    style={{backgroundColor: '#7C878C', margin: 10, marginTop:2, borderRadius: 8, padding: 10, borderColor: '#7C878C'}}
                                    searchable={true}
                                    searchablePlaceholderTextColor='#E7E7E7'
                                    searchableStyle={[STYLE.textInput, {margin: 0}]}
                                    searchablePlaceholder="Busque sua instituição" 
                                    dropDownMaxHeight={400}
                                    labelStyle={{ alignItems: 'center', color: "#E7E7E7", textAlign: 'left'}}
                                    itemStyle={{justifyContent: 'flex-start'}} 
                                />
                                <TextInput 
                                    style={STYLE.textInput} 
                                    placeholder='Nomeie sua conta' 
                                    placeholderTextColor="#E7E7E7" 
                                    value={objCarteira.nmCarteiraCorrente}
                                    onChangeText={value => setObjCarteira({...objCarteira, nmCarteiraCorrente: value})} />
                                {
                                    value == 269 || value == 270 ? null :
                                    checked == 0 ? 
                                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', margin: 10, marginTop:2, }}>
                                            <TextInput 
                                                style={[STYLE.textInput, {width: '45%', margin: 0, marginRight: '5%'}]} 
                                                placeholder='Agência' 
                                                placeholderTextColor="#E7E7E7" 
                                                value={objCarteira.agencia}
                                                onChangeText={value => setObjCarteira({...objCarteira, agencia: value})} />
                                            <TextInput 
                                                style={[STYLE.textInput, {width: '50%', margin: 0}]} 
                                                placeholder='Conta' 
                                                placeholderTextColor="#E7E7E7"
                                                value={objCarteira.conta}
                                                onChangeText={value => setObjCarteira({...objCarteira, conta: value})} />
                                        </View>
                                        :
                                        <TextInput 
                                            style={STYLE.textInput} 
                                            placeholder='Ultimos 4 numeros do seu cartão' 
                                            placeholderTextColor="#E7E7E7"
                                            value={objCarteira.finalCartao}
                                            onChangeText={value => setObjCarteira({...objCarteira, finalCartao: value})} />
                               
                                } 
                                <TextInput 
                                    style={STYLE.textInput} 
                                    placeholder='Saldo' 
                                    placeholderTextColor="#E7E7E7" 
                                    keyboardType='numeric'
                                    value={objCarteira.saldo}
                                    numericvalue
                                    onChangeText={value => setObjCarteira({...objCarteira, saldo: value})} />
                        
                                <View style={{alignSelf: 'center'}}>
                                    <TouchableOpacity style={STYLE.cadastroButton} onPress={() => edicao ? editaCarteira() : persistCarteira()} >
                                        <Text style={STYLE.cadastroButtonText}>{edicao ? 'Editar Carteira' : 'Cadastrar Carteira'}</Text>
                                    </TouchableOpacity>

                                    {edicao ? 
                                        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 10}} onPress={() => deleteCarteira()}>
                                            <Text style={{color:'#F00'}}>Excluir Conta</Text>
                                        </TouchableOpacity> 
                                    : null}

                                    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 10}} onPress={() => {
                                        setModal(false);
                                        setEdicao(false);
                                        setObjCarteira({cartao: 0});
                                        setValue(null)
                                    }}>
                                        <Text style={{color:'#F00'}}>Fechar</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={{marginHorizontal: 30, marginVertical:20}}>
                    <Text style={{color: '#D0D0D0', fontSize: 36, fontFamily: ''}}>Resumo</Text>
                </View>

                <CardResumo saldo={saldo.toFixed(2)} data={movimentacao}/>

                <View style={{marginHorizontal: 30, marginVertical:10}}>
                    <Text style={{color: '#D0D0D0', fontSize: 26, fontFamily: ''}}>Minhas contas</Text>
                </View>

                <View style={{marginHorizontal: 30, marginVertical:10}}>

                    {
                        globalState.carteiraCorrente.map((item, index) => {
                            return(
                                <TouchableOpacity key={`carteira-corrente-${item.idCarteiraCorrente}`} onLongPress={() => buscaCarteira(item.idCarteiraCorrente)} >
                                    <CardCarteira nome={item.nmCarteiraCorrente} saldo={Number.parseFloat(item.saldo.toString()).toFixed(2)} />
                                </TouchableOpacity>
                            )
                        })
                    }
                    
                    <View style={{backgroundColor: '#D0D0D0', borderRadius: 10, padding: 20, flexDirection: 'row', justifyContent: 'space-between', marginVertical:5, alignItems: 'center'}}>
                        <Text style={{fontSize: 16}}>Adicionar banco ou cartão</Text>
                        <TouchableOpacity style={{backgroundColor: '#7445FF', padding: 5, borderRadius: 3}} onPress={() => {
                            setEdicao(false);
                            setModal(true)}} >
                            <Text style={{fontSize: 14, color: '#D0D0D0'}}>Adicionar +</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{marginHorizontal: 30, marginVertical:10}}>
                    <Text style={{color: '#D0D0D0', fontSize: 26, fontFamily: ''}}>Últimas movimentacões</Text>
                </View>

                <ScrollView horizontal={true} style={{paddingHorizontal: 30, marginVertical:10}} showsHorizontalScrollIndicator={false}>
                    {
                        globalState.movimentacaoCarteiraCorrente.map((item, index) => {
                            return(
                                <CardMovimentacaoCarrocel  key={`movimentacao-carteira-corrente-${item.idMovimentacaoCarteiraCorrente}`}  descricao={item.descricaoMovimentacao} valor={item.valor.toFixed(2)} />
                            )
                        })
                    }
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