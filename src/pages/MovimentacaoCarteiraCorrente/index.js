import React, { useEffect, useState }  from 'react';
import { Text, View, ScrollView, Alert, TouchableOpacity, Modal, Image, TextInput, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { STYLE } from '../../configs';
import { setCarteiraCorrente, setMovimentacaoCarteiraCorrente, setLoading } from '../../store/actions';
import { MovimentacaoCarteiraCorrenteService, Util } from '../../services';
import { CardCarteira } from '../../components/CardCarteira';

function MovimentacaoMovimentacaoCorrente(props){
    const {
        setCarteiraCorrente,
        setMovimentacaoCarteiraCorrente,
        globalState,
        setLoading,
    } = props;

    const [modal, setModal] = React.useState(false);
    const [edicao, setEdicao] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [checked, setChecked] = React.useState(1);
    const [objMovimentacao, setObjMovimentacao] = React.useState({idTipoMovimentacao: 1, valor: "", idUsuario: globalState.usuario.id_usuario})
    const [valorFloat, setValorFloat] = React.useState(0);
    const [items, setItems] = React.useState([]);
    const [movimentacao, setMovimentacao] = React.useState([]);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dataFormatada, setDataFormatada] = useState('');
    const [refreshing, setRefreshing] = React.useState(false);

    let controller;

    useEffect(() => {
        setLoading(true);
        syncPage();
    },[])

    const syncPage = async () => {  
        let _tems = []
        globalState.carteiraCorrente.forEach(element => {
            let obj = {}
            obj.label = element.nmCarteiraCorrente;
            obj.value = element.idCarteiraCorrente;

            _tems.push(obj);
        });
        setItems(_tems);

        let _movimentacao = await MovimentacaoCarteiraCorrenteService.getAllMovimentacaoCarteiraCorrenteByUsuario(globalState.usuario.id_usuario);
        setMovimentacaoCarteiraCorrente(_movimentacao);
        setRefreshing(false);
        setLoading(false);
    }

    const persistMovimentacao = async () => {
        setLoading(true);
        let _obj = objMovimentacao;
        _obj.valor = Number.parseFloat(objMovimentacao.valor);
        if(checked == 2){
            _obj.valor *= -1;
        }
        _obj.idUsuario = globalState.usuario.id_usuario;
        console.log(_obj)
        let obj = await MovimentacaoCarteiraCorrenteService.createMovimentacaoCarteiraCorrente(_obj);
        console.log(obj)

        setModal(false);
        setEdicao(false);
        setDate(new Date())
        setDataFormatada('')
        setChecked(1);
        setObjMovimentacao({idTipoMovimentacao: 1, valor: ''});
        setValue(null)
        setLoading(false);
        await syncPage();
    }

    const editaMovimentacao = async () => {
        setLoading(true);
        let _obj = objMovimentacao;
        _obj.valor = Number.parseFloat(objMovimentacao.valor);
        if(checked == 2){
            if(_obj.valor > 0){
                _obj.valor *= -1;
            }
        }else{
            if(_obj.valor < 0){
                _obj.valor *= -1;
            }
        }
        console.log(_obj)
        let obj = await MovimentacaoCarteiraCorrenteService.updateMovimentacaoCarteiraCorrente(_obj);
        console.log(obj)

        setModal(false);
        setEdicao(false);
        setDate(new Date())
        setDataFormatada('')
        setChecked(1);
        setObjMovimentacao({idTipoMovimentacao: 1, valor: ''});
        setValue(null)
        setLoading(false);
        await syncPage();
    }

    const deleteMovimentacao = async () => {
        setLoading(true);
        // console.log(objMovimentacao)
        await MovimentacaoCarteiraCorrenteService.deleteMovimentacaoCarteiraCorrente(objMovimentacao.idMovimentacaoCarteiraCorrente);

        setModal(false);
        setEdicao(false);
        setDate(new Date())
        setDataFormatada('')
        setChecked(1);
        setObjMovimentacao({idTipoMovimentacao: 1, valor: ''});
        setValue(null)
        await syncPage();
    }

    const buscaMovimentacao = (idMovimentacaoCarteiraCorrente) => {
        let index = globalState.movimentacaoCarteiraCorrente.findIndex(obj => obj.idMovimentacaoCarteiraCorrente == idMovimentacaoCarteiraCorrente);
        // console.log(index)
        if(index != -1 ){
            let _objMovimentacao = globalState.movimentacaoCarteiraCorrente[index];
            console.log(_objMovimentacao)
            
            saveDate(_objMovimentacao.dataMovimentacao);
            setValue(_objMovimentacao.idCarteiraCorrente);
            setChecked(_objMovimentacao.idTipoMovimentacao)
            setObjMovimentacao({
                dataMovimentacao: new Date(_objMovimentacao.dataMovimentacao).toJSON().replace("T", " ").replace("Z", ""),
                descricaoMovimentacao: _objMovimentacao.descricaoMovimentacao,
                idCarteiraCorrente:_objMovimentacao.idCarteiraCorrente,
                idMovimentacaoCarteiraCorrente: _objMovimentacao.idMovimentacaoCarteiraCorrente,
                idTipoMovimentacao: _objMovimentacao.idTipoMovimentacao,
                idUsuario: _objMovimentacao.idUsuario,
                valor: _objMovimentacao.valor.toFixed(2),
            });
            setModal(true);
            setEdicao(true);
        }
    }

    const saveDate = (event, dataMovimentacao) => {
        dataMovimentacao = dataMovimentacao || date;
        let _dataFormatada = Util.addZero(dataMovimentacao.getDate()) + '/' + Util.addZero((dataMovimentacao.getMonth() + 1)) + '/' + dataMovimentacao.getFullYear();

        setShow(Platform.OS === 'ios');
        setDate(dataMovimentacao);
        setObjMovimentacao({...objMovimentacao, dataMovimentacao: dataMovimentacao.toJSON().replace("T", " ").replace("Z", "")})
        setDataFormatada(_dataFormatada)
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
                                        setChecked(1)
                                        setObjMovimentacao({...objMovimentacao, idTipoMovimentacao: 1})
                                        if(objMovimentacao.valor != ""){
                                            let number = Number.parseFloat(objMovimentacao.valor.toFixed(2));
                                            if(number < 0){
                                                number *= -1;
                                                setObjMovimentacao({...objMovimentacao, valor: number.toString()})
                                            }
                                        }
                                    }}>
                                        <RadioButton
                                            uncheckedColor='#7C878C'
                                            value='first'
                                            status={ checked === 1 ? 'checked' : 'unchecked' }
                                            onPress={() => {
                                                setChecked(1);
                                                setObjMovimentacao({...objMovimentacao, idTipoMovimentacao: 1})
                                                if(objMovimentacao.valor != ""){
                                                    let number = Number.parseFloat(objMovimentacao.valor.toFixed(2));
                                                    if(number < 0){
                                                        number *= -1;
                                                        setObjMovimentacao({...objMovimentacao, valor: number.toString()})
                                                    }
                                                }
                                            }}
                                            color='#03DAC5'
                                        />
                                        <Text style={STYLE.cadastroText}>Entrada</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {
                                        setChecked(2);
                                        setObjMovimentacao({...objMovimentacao, idTipoMovimentacao: 2})
                                        if(objMovimentacao.valor != ""){
                                            let number = Number.parseFloat(objMovimentacao.valor.toFixed(2));
                                            if(number > 0){
                                                number *= -1;
                                                setObjMovimentacao({...objMovimentacao, valor: number.toString()})
                                            }
                                        }
                                    }}>
                                        <RadioButton
                                            uncheckedColor='#7C878C'
                                            value='second'
                                            status={ checked === 2 ? 'checked' : 'unchecked' }
                                            onPress={() => {
                                                setChecked(2);
                                                setObjMovimentacao({...objMovimentacao, idTipoMovimentacao: 2})
                                                if(objMovimentacao.valor != ""){
                                                    let number = Number.parseFloat(objMovimentacao.valor.toFixed(2));
                                                    if(number > 0){
                                                        number *= -1;
                                                        setObjMovimentacao({...objMovimentacao, valor: number.toString()})
                                                    }
                                                }
                                            }}
                                            color='#03DAC5'
                                        />
                                        <Text style={STYLE.cadastroText}>Saída</Text>
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
                                        setObjMovimentacao({...objMovimentacao, idCarteiraCorrente: item.value})
                                    }}
                                    placeholder='Selecione uma conta para salvar'
                                    containerStyle={{height: 60,  borderRadius: 8 }}
                                    placeholderStyle={{color: "#E7E7E7"}}
                                    selectedLabelStyle={{color: "#E7E7E7"}}
                                    dropDownStyle={{backgroundColor: '#7C878C', borderColor: '#7C878C', borderRadius: 8}}
                                    style={{backgroundColor: '#7C878C', margin: 10, marginTop:2, borderRadius: 8, padding: 10, borderColor: '#7C878C'}}
                                    searchable={true}
                                    searchablePlaceholderTextColor='#E7E7E7'
                                    searchableStyle={[STYLE.textInput, {margin: 0}]}
                                    searchablePlaceholder="Busque sua conta" 
                                    dropDownMaxHeight={400}
                                    labelStyle={{ alignItems: 'center', color: "#E7E7E7", textAlign: 'left'}}
                                    itemStyle={{justifyContent: 'flex-start'}} 
                                />
                                <TextInput 
                                    style={STYLE.textInput} 
                                    placeholder='Nomeie sua movimentação' 
                                    placeholderTextColor="#E7E7E7" 
                                    value={objMovimentacao.descricaoMovimentacao}
                                    onChangeText={value => setObjMovimentacao({...objMovimentacao, descricaoMovimentacao: value})} />

                                <View style={STYLE.textInput}>
                                    <TouchableOpacity style={{paddingHorizontal:1, paddingVertical: 15}} onPress={() => {
                                        setShow(true);
                                    }}>
                                        <Text style={{color: "#E7E7E7" , marginHorizontal: 5}}>{ dataFormatada != "" ? dataFormatada : 'Data da movimentação' }</Text>
                                    </TouchableOpacity>
                                    { 
                                    show && 
                                    <DateTimePicker 
                                        value={date}
                                        mode='date'
                                        is24Hour={true}
                                        display="default"
                                        onChange={saveDate} />
                                    }
                                    
                                </View>

                                <TextInput 
                                    style={STYLE.textInput} 
                                    placeholder='Valor' 
                                    placeholderTextColor="#E7E7E7" 
                                    keyboardType='numeric'
                                    value={objMovimentacao.valor}
                                    onChangeText={value => {
                                        if(value == "" || value == "R$ "){
                                            setObjMovimentacao({...objMovimentacao, valor: ""})
                                            setValorFloat(0);
                                        }else{
                                            let number = Number.parseFloat(Util.formataDinheroEmNumero(value));
                                            
                                            console.log(number)
                                            console.log(valorFloat)
                                            if(checked != 1){
                                                if(number > 0){
                                                    number *= -1;
                                                }
                                            }
                                            let str = Util.formataDinheiro(number);
                                            console.log(str)
                                            setObjMovimentacao({...objMovimentacao, valor: value})
                                            setValorFloat(number); 
                                        }
                                    }} />
                        
                                <View style={{alignSelf: 'center'}}>
                                    <TouchableOpacity style={STYLE.cadastroButton} onPress={() => edicao ? editaMovimentacao() : persistMovimentacao()} >
                                        <Text style={STYLE.cadastroButtonText}>{edicao ? 'Editar Movimentação' : 'Salvar Movimentação'}</Text>
                                    </TouchableOpacity>

                                    {edicao ? 
                                        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 10}} onPress={() => deleteMovimentacao()}>
                                            <Text style={{color:'#F00'}}>Excluir Movimentação</Text>
                                        </TouchableOpacity> 
                                    : null}

                                    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 10}} onPress={() => {
                                        setModal(false);
                                        setEdicao(false);
                                        setDate(new Date())
                                        setDataFormatada('')
                                        setChecked(1);
                                        setObjMovimentacao({idTipoMovimentacao: 1, valor: ''});
                                        setValue(null)
                                    }}>
                                        <Text style={{color:'#F00'}}>Fechar</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={{marginHorizontal: 10, marginVertical:10}}>
                    <Text style={{color: '#D0D0D0', fontSize: 36, fontFamily: ''}}>Movimentações</Text>
                </View>

                <View style={{alignSelf: 'center', margin: 10}}>
                    <TouchableOpacity style={{backgroundColor: '#7445FF', paddingHorizontal: 40, borderRadius: 3, paddingVertical: 15}} onPress={() => {
                        setEdicao(false);
                        setModal(true)
                    }} >
                        <Text style={{fontSize: 18, color: '#D0D0D0'}}>Adicionar Movimentacão</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginHorizontal: 10, marginVertical:10}}>

                    {
                        globalState.movimentacaoCarteiraCorrente.map((item, index) => {
                            return(
                                <TouchableOpacity key={`movimentacao-carteira-corrente-${item.idMovimentacaoCarteiraCorrente}`} onLongPress={() => buscaMovimentacao(item.idMovimentacaoCarteiraCorrente)} >
                                    <CardCarteira nome={item.descricaoMovimentacao} saldo={Number.parseFloat(item.valor.toString()).toFixed(2)} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(MovimentacaoMovimentacaoCorrente);