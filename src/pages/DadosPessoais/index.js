import React, { useEffect }  from 'react';
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, Alert, Dimensions } from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUsuario, setLoading } from '../../store/actions';
import { STYLE } from '../../configs';

function DadosPessoais(props){
    const {
        setUsuario,
        globalState,
        setLoading,
        navigation
    } = props;

    const [enableEdicao, setEnableEdicao] = React.useState(false);
    const [novaSenha, setNovaSenha] = React.useState(false);

    useEffect(() => {
        setLoading(false);
    },[])

    return (
        <View style={STYLE.containerInternal}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
                <View style={STYLE.cadastroImageBox}>
                    <Image style={STYLE.image} source={require('../../assets/CENTRO.png')}/>
                </View>

                <View style={STYLE.cadastroTextBox}>
                    <Text style={STYLE.dadosPessoaisText}>Encontrou algum problema com os seus dados pessoais ou gostaria de atulizar alguma informação? Faça sua correção agora mesmo, basta iniciar edição e enviar sua correção!</Text>
                </View>
                
                <View style={STYLE.loginInputBox}>
                    <TextInput editable={enableEdicao} style={STYLE.textInput} placeholder='Nome usuario' placeholderTextColor="#E7E7E7" />
                    <TextInput editable={enableEdicao} style={STYLE.textInput} placeholder='Email usuario' placeholderTextColor="#E7E7E7" />
                    <TextInput editable={enableEdicao} style={STYLE.textInput} placeholder='CPF usuario' placeholderTextColor="#E7E7E7" />
                    <TextInput editable={enableEdicao} style={STYLE.textInput} placeholder='Telefone usuario' placeholderTextColor="#E7E7E7" />

                    {
                        novaSenha ?
                            <>
                                <TextInput style={STYLE.textInput} placeholder='Nova senha' placeholderTextColor="#E7E7E7" />
                                <TextInput style={STYLE.textInput} placeholder='Nova senha verificação' placeholderTextColor="#E7E7E7" />
                            </>
                        : null
                    }

                </View>

                {
                    enableEdicao ?
                    <>
                        <View style={[STYLE.cadastroButtonBox, {flexDirection: 'row'}]}>
                            <View style={STYLE.cadastroButtonBox}>
                                <TouchableOpacity style={STYLE.cadastroButton} >
                                    <Text style={STYLE.cadastroButtonText}>Enviar alteração</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={STYLE.cadastroButtonBox}>
                                <TouchableOpacity onPress={() => setNovaSenha(!novaSenha)}>
                                    <Text style={[STYLE.loginTexts, {textDecorationLine: 'none',}]}>{!novaSenha ? 'Alterar senha' : 'Cancelar'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{alignSelf: 'center'}}>
                            <TouchableOpacity style={STYLE.cadastroButton} onPress={() => setEnableEdicao(false)}>
                                <Text style={STYLE.cadastroButtonText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 20}} >
                                <Text style={{color:'#F00'}}>Excluir minha conta :(</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    : 
                    <View style={STYLE.cadastroButtonBox}>
                        <TouchableOpacity style={STYLE.cadastroButton} onPress={() => setEnableEdicao(true)}>
                            <Text style={STYLE.cadastroButtonText}>Realizar alteração</Text>
                        </TouchableOpacity>
                    </View>
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
        setLoading,
        setUsuario
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(DadosPessoais);