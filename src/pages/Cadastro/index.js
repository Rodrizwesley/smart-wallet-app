import React, { useEffect }  from 'react';
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, Alert } from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUsuario, setLoading, doLogin } from '../../store/actions';
import { STYLE } from '../../configs';
import { UsuarioService, Util } from '../../services';

function Cadastro(props) {
    const {
        setUsuario,
        globalState, 
        setLoading,
        doLogin
    } = props;

    const [nomeCompleto, setNomeCompleto] = React.useState('');
    const [cpf, setCpf] = React.useState('');
    const [email1, setEmail1] = React.useState('');
    const [email2, setEmail2] = React.useState('');
    const [telefone, setTelefone] = React.useState('');
    const [senha1, setSenha1] = React.useState('');
    const [senha2, setSenha2] = React.useState('');

    const refCPF = React.useRef();
    const refEmail1 = React.useRef();
    const refEmail2 = React.useRef();
    const refRelefone = React.useRef();
    const refSenha1 = React.useRef();
    const refSenha2 = React.useRef();

    useEffect(() => {
        setLoading(false);
    }, [])


    const validAndPersistForm = async () => {
        setLoading(false);
        if(nomeCompleto != '' && cpf != '' && email1 != '' && email2 != '' && telefone != '' && senha1 != '' && senha2 != ''){
            if(email1 != email2){
                Alert.alert('Atenção!', 'Seu e-mail não foi validado!\nVerifique os emails preenchidos e tente novamente.');
                setLoading(false);
            }else{
                if(senha1 != senha2){
                    Alert.alert('Atenção!', 'As senhas não coincidem!\nVerifique sua senha e tente novamente.');
                    setLoading(false);
                }else {
                    if(Util.validaCPF(cpf)){
                        let _cpf = cpf.replace(/[^0-9]/g, "");                        
                        try {
                            let usuarioCadastro = await UsuarioService.cadastraUsuario(_cpf, nomeCompleto, telefone, email1, senha1);
                        
                            if(usuarioCadastro.idUsuario){
                                setUsuario(usuarioCadastro);
                                setLoading(false);
                                Alert.alert('Parabéns!', 'Estamos muito felizes por você estar conosco!\nAproveite nossos recursos e ferramentas e tenha sua carteira inteligente!', [
                                    {text: 'Começar agora!', onPress: () => doLogin(true), style: 'default'},
                                    {text: 'Entrar depois!', onPress: () => props.navigation.goBack()}
                                ]);
                            }
                        } catch (error) {
                            console.error(error);
                            setLoading(false);
                        }
                        
                    }else{
                        Alert.alert('Atenção!', 'Este CPF não é valido!\nVerifique seu CPF e tente novamente.');
                         setLoading(false);
                    }
                }
            }
        }else {
            Alert.alert('Atenção!', 'É necessário preencher todos os campos!\nVerifique quais campos não estão preenchidos e tente novamente.');
            setLoading(false);
        }
    }

    return(
        <View style={STYLE.container}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
                <View style={STYLE.cadastroImageBox}>
                    <Image style={STYLE.image} source={require('../../assets/CENTRO.png')}/>
                </View>

                <View style={STYLE.cadastroTextBox}>
                    <Text style={STYLE.cadastroText}>Preecha com seus dados e junte-se a nós!</Text>
                </View>

                <View style={STYLE.loginInputBox} >
                    <Text style={STYLE.formLabel}>Nome completo:</Text>
                    <TextInput
                        style={STYLE.textInput} 
                        placeholder='Insira seu nome completo'
                        placeholderTextColor="#E7E7E7" 
                        value={nomeCompleto}
                        onChangeText={setNomeCompleto} 
                        returnKeyType='next'
                        onSubmitEditing={() => refCPF.current.focus()}
                        />

                    <Text style={STYLE.formLabel}>CPF:</Text>
                    <TextInput
                        ref={refCPF}
                        style={!Util.validaCPF(cpf) && cpf != '' ? STYLE.textInputWrong : STYLE.textInput} 
                        placeholder='Insira seu CPF'
                        placeholderTextColor="#E7E7E7" 
                        value={cpf}
                        onChangeText={text => setCpf(Util.cpfMask(text))} 
                        returnKeyType='next'
                        keyboardType='numeric'
                        onSubmitEditing={() => refEmail1.current.focus()}
                        />

                    <Text style={STYLE.formLabel}>E-mail:</Text>
                    <TextInput
                        ref={refEmail1}
                        style={STYLE.textInput} 
                        placeholder='Insira seu e-mail'
                        placeholderTextColor="#E7E7E7" 
                        value={email1}
                        onChangeText={setEmail1} 
                        returnKeyType='next'
                        autoCapitalize='none'
                        onSubmitEditing={() => refEmail2.current.focus()}
                        />

                    <Text style={STYLE.formLabel}>Validação do E-mail:</Text>
                    <TextInput
                        ref={refEmail2}
                        style={email1 != email2 ? STYLE.textInputWrong : STYLE.textInput} 
                        placeholder='Insira novamente seu e-mail'
                        placeholderTextColor="#E7E7E7" 
                        value={email2}
                        onChangeText={setEmail2} 
                        returnKeyType='next'
                        autoCapitalize='none'
                        onSubmitEditing={() => refRelefone.current.focus()}
                        />

                    <Text style={STYLE.formLabel}>Telefone:</Text>
                    <TextInput
                        ref={refRelefone}
                        style={STYLE.textInput} 
                        placeholder='Insira seu telefone'
                        placeholderTextColor="#E7E7E7" 
                        value={telefone}
                        onChangeText={text => setTelefone(Util.telMask(text))} 
                        returnKeyType='next'
                        keyboardType='numeric'
                        onSubmitEditing={() => refSenha1.current.focus()}
                        />

                    <Text style={STYLE.formLabel}>Senha:</Text>
                    <TextInput
                        ref={refSenha1}
                        style={STYLE.textInput} 
                        placeholder='Insira sua senha'
                        placeholderTextColor="#E7E7E7" 
                        value={senha1}
                        onChangeText={setSenha1} 
                        returnKeyType='next'
                        onSubmitEditing={() => refSenha2.current.focus()}
                        />

                    <Text style={STYLE.formLabel}>Validação de senha:</Text>
                    <TextInput
                        ref={refSenha2}
                        style={senha1 != senha2 ? STYLE.textInputWrong : STYLE.textInput} 
                        placeholder='Insira novamente sua senha'
                        placeholderTextColor="#E7E7E7" 
                        value={senha2}
                        onChangeText={setSenha2} 
                        returnKeyType='next'
                        autoCapitalize='none'
                        />
                </View>

                <View style={STYLE.cadastroButtonBox}>
                    <TouchableOpacity style={STYLE.cadastroButton} onPress={() => validAndPersistForm()}>
                        <Text style={STYLE.cadastroButtonText}>Realizar Cadastro!</Text>
                    </TouchableOpacity>
                </View>

                {
                    globalState.isLoading ? 
                    <View style={STYLE.loading}>
                        <ProgressBar color='#23D9B7' styleAttr='Large'/>
                    </View> : null
                }
            </ScrollView>
        </View >            
    )

}

const mapStateToProps = store => ({
    globalState: store.globalState
})


const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUsuario,
        setLoading,
        doLogin    
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Cadastro)