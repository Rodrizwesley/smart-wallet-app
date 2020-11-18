import React, { useEffect }  from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setLoading } from '../../store/actions';
import { STYLE } from '../../configs';
import { Util, UsuarioService } from '../../services';

function RecuperarSenha(props){
    const {
        globalState,
        setLoading
    } = props;

    const [email, setEmail] = React.useState('');
    const [cpf, setCpf] = React.useState('');
    const [renderForm, setRenderForm] = React.useState(false);
    const [senha1, setSenha1] = React.useState('');
    const [senha2, setSenha2] = React.useState('');
    const [usuario, setUsuario] = React.useState(null);

    const refCpf = React.useRef();
    const refPass1 = React.useRef();

    const renderFormNewPass = () => {
        return(
            <>
                <View style={STYLE.loginInputBox}>
                    <Text style={STYLE.formLabel}>Cadastre uma nova senha:</Text>
                    <TextInput
                        style={STYLE.textInput} 
                        placeholder='Insira sua senha'
                        placeholderTextColor="#E7E7E7" 
                        value={senha1}
                        onChangeText={setSenha1} 
                        returnKeyType='next'
                        onSubmitEditing={() => refPass1.current.focus()}
                        />

                    <Text style={STYLE.formLabel}>Validação de senha:</Text>
                    <TextInput
                        ref={refPass1}
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
                    <TouchableOpacity style={STYLE.cadastroButton} onPress={() => enviaNovaSenha()}>
                        <Text style={STYLE.cadastroButtonText}>Salvar nova senha</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }

    const buscaUsuario = async () => {
        setLoading(true);
        if(email != '' && cpf != ''){
            if(Util.validaCPF(cpf)){
                let _cpf = cpf.replace(/[^0-9]/g, "");

                try {
                    let usuario = await UsuarioService.findCPFandEmail(_cpf, email);

                    if(usuario.id_usuario){
                        setUsuario(usuario);
                        setLoading(false);
                        setRenderForm(true)
                    }else{
                        Alert.alert('Atenção!', 'Usuário não encontrado!\nVerifique seus dados e tente novamente.');
                        setLoading(false);
                    }
                    
                } catch (error) {
                    console.error(error);
                    setLoading(false);
                }
            }else{
                Alert.alert('Atenção!', 'Este CPF não é valido!\nVerifique seu CPF e tente novamente.');
                setLoading(false);
            }
        }else{
            Alert.alert('Atenção!', 'É necessário preencher todos os campos!\nVerifique quais campos não estão preenchidos e tente novamente.');
            setLoading(false);
        }
    }

    const enviaNovaSenha = async () => {    
        setLoading(true);

        if(senha1 != '' && senha2 != ''){
            if(senha1 != senha2){
                Alert.alert('Atenção!', 'As senhas não coincidem!\nVerifique sua senha e tente novamente.');
                setLoading(false);
            }else{
                try {
                    let trocaSenha = await UsuarioService.trocarSenha(usuario.id_usuario, senha1);

                    if(trocaSenha.idUsuario){
                        setLoading(false);
                        Alert.alert('Sucesso!', 'Senha alterada com sucesso!\nAcesse e aproveite sua carteira inteligente!', [
                            {text: 'Continuar', onPress: () => props.navigation.goBack()}
                        ]);
                    }else{
                        Alert.alert('Atenção!', 'Usuário não encontrado!\nVerifique seus dados e tente novamente.');
                        setLoading(false);
                    }
                    
                } catch (error) {
                    console.error(error);
                    setLoading(false);
                }
            }
        }else{
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
                    <Text style={STYLE.cadastroText}>Preecha com seus dados para recuperar seu acesso!</Text>
                </View>

                <View style={STYLE.loginInputBox}>
                    <Text style={STYLE.formLabel}>Seu e-mail:</Text>
                    <TextInput
                        style={STYLE.textInput}
                        editable={renderForm ? false : true} 
                        placeholder='Email'
                        value={email}
                        onChangeText={setEmail} 
                        returnKeyType='next'
                        autoCapitalize='none'
                        placeholderTextColor="#E7E7E7" 
                        onSubmitEditing={() => refCpf.current.focus()}
                        />

                    <Text style={STYLE.formLabel}>Seu CPF:</Text>
                    <TextInput 
                        ref={refCpf}
                        style={STYLE.textInput}
                        editable={renderForm ? false : true}  
                        placeholder='CPF'
                        keyboardType='numeric'
                        value={cpf}
                        onChangeText={text => setCpf(Util.cpfMask(text))}
                        returnKeyType='go'
                        autoCapitalize='none'
                        placeholderTextColor="#E7E7E7" 
                        />
                </View>

                {renderForm ? null :
                    <View style={STYLE.cadastroButtonBox}>
                        <TouchableOpacity style={STYLE.cadastroButton} onPress={() => buscaUsuario()}>
                            <Text style={STYLE.cadastroButtonText}>Iniciar alteração</Text>
                        </TouchableOpacity>
                    </View>
                }

                {renderForm ? renderFormNewPass() : null}

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
        setLoading
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(RecuperarSenha);