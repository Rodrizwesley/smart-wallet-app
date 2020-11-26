import React, { useEffect }  from 'react';
import { Text, View, ScrollView, Alert, TouchableOpacity, Modal, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { RadioButton } from 'react-native-paper';
import { STYLE } from '../../configs';
import { setMovimentacaoCorrente, setMovimentacaoMovimentacaoCorrente, setLoading } from '../../store/actions';
import { MovimentacaoCorrenteService } from '../../services';

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
    const [objMovimentacao, setObjMovimentacao] = React.useState({idTipoMovimentacao: 1, valor: '+'})
    const [items, setItems] = React.useState([]);
    const [movimentacao, setMovimentacao] = React.useState([]);

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
        setItems(_tems)
    }

    const persistMovimentacao = async () => {

    }

    const editaMovimentacao = async () => {

    }

    const deleteMovimentacao = async () => {

    }

    const buscaMovimentacao = (idMovimentacaoCorrente) => {

    }

    return(
        <View style={STYLE.containerInternal}>
            <View style={{ marginVertical: 10, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', zIndex: 3}}>
                <Image style={{width: '10%', height: '100%', resizeMode: "contain"}} source={require('../../assets/LOGO.png')}/>
                <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                    <Icon name='menu' size={40} color='#D0D0D0' />
                </TouchableOpacity>
            </View>
            <ScrollView style={{flex: 1, marginTop: 10, paddingHorizontal: 20}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>

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
                                        setObjMovimentacao({...objMovimentacao, valor: objMovimentacao.valor.replace('-', '+')})
                                    }}>
                                        <RadioButton
                                            uncheckedColor='#7C878C'
                                            value='first'
                                            status={ checked === 1 ? 'checked' : 'unchecked' }
                                            onPress={() => {
                                                setChecked(1);
                                                setObjMovimentacao({...objMovimentacao, idTipoMovimentacao: 1})
                                                setObjMovimentacao({...objMovimentacao, valor: objMovimentacao.valor.replace('-', '+')})
                                            }}
                                            color='#03DAC5'
                                        />
                                        <Text style={STYLE.cadastroText}>Entrada</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {
                                        setChecked(2);
                                        setObjMovimentacao({...objMovimentacao, idTipoMovimentacao: 2})
                                        setObjMovimentacao({...objMovimentacao, valor: objMovimentacao.valor.replace('+', '-')})
                                    }}>
                                        <RadioButton
                                            uncheckedColor='#7C878C'
                                            value='second'
                                            status={ checked === 2 ? 'checked' : 'unchecked' }
                                            onPress={() => {
                                                setChecked(2);
                                                setObjMovimentacao({...objMovimentacao, idTipoMovimentacao: 2})
                                                setObjMovimentacao({...objMovimentacao, valor: objMovimentacao.valor.replace('+', '-')})
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
                                        setObjMovimentacao({...objMovimentacao, idMovimentacaoCorrente: item.value})
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

                                <TextInput 
                                    style={STYLE.textInput} 
                                    placeholder='Valor' 
                                    placeholderTextColor="#E7E7E7" 
                                    keyboardType='numeric'
                                    value={objMovimentacao.valor}
                                    numericvalue
                                    onChangeText={value => setObjMovimentacao({...objMovimentacao, valor: value})} />
                        
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
                                        setObjMovimentacao({idTipoMovimentacao: 1, valor: '+'});
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
                        <Text style={{fontSize: 18, color: '#D0D0D0'}}>Adicionar Movimentacao</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    )
}

const mapStateToProps = store => ({
    globalState: store.globalState
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setMovimentacaoCorrente,
        setMovimentacaoMovimentacaoCorrente, 
        setLoading
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(MovimentacaoMovimentacaoCorrente);