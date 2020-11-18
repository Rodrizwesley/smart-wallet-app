import React, { useEffect }  from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { connect } from 'react-redux';
import { bindActionCreators }  from 'redux';
import { doLogin, setUsuario, setLoading } from '../../store/actions';
import { STYLE } from '../../configs';
import { UsuarioService } from '../../services';

function Login(props) {
    const {
        doLogin,
        setUsuario,
        setLoading,
        globalState
    } = props;

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const refPass = React.useRef();

    useEffect(() => {
        if(globalState.usuario != null){
            setEmail(globalState.usuario.email_usuario);
            setPassword(globalState.usuario.senha)
        }

        setLoading(false);
    },[])

    const fazerLogin = async () => {
        setLoading(true);
        if(email != '' && password != ''){
            try {
                let login = await UsuarioService.login(email, password);
                if(login.isAuthenticate){
                    setUsuario(login.Usuario);
                    doLogin(true);
                }else{
                    Alert.alert('Atenção!', 'Usuário não encontrado!\nVerifique seus dados e tente novamente.');
                    setLoading(false);
                }

            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }else{
            Alert.alert('Atenção!', 'É necessário preencher todos os campos!\nVerifique quais campos não estão preenchidos e tente novamente.');
            setLoading(false);
        }

    }

    return (
        <View style={STYLE.container}>
            <View style={STYLE.imageBox}>
                <Image style={STYLE.image} source={require('../../assets/CENTRO.png')}/>
            </View>

            <View style={STYLE.loginInputBox}>
                <TextInput
                    style={STYLE.textInput} 
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail} 
                    returnKeyType='next'
                    autoCapitalize='none'
                    placeholderTextColor="#E7E7E7" 
                    onSubmitEditing={() => refPass.current.focus()}
                    />
                <TextInput 
                    ref={refPass}
                    style={STYLE.textInput} 
                    placeholder='Senha'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    returnKeyType='go'
                    autoCapitalize='none'
                    placeholderTextColor="#E7E7E7" 
                    />

                <View style={STYLE.loginTouchables}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Cadastro')}>
                        <Text style={STYLE.loginTexts}>Cadastrar-se</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('Recuperar')}>
                        <Text style={STYLE.loginTexts}>Esqueci minha senha</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={STYLE.loginEntrarBox}>
                <TouchableOpacity style={STYLE.loginEntrarButton} onPress={() => fazerLogin()}>
                    <Text style={STYLE.loginEntrarText}>Entrar!</Text>
                </TouchableOpacity>
            </View>

            {
                globalState.isLoading ? 
                <View style={STYLE.loading}>
                    <ProgressBar color='#03DAC5' styleAttr='Large'/>
                </View> : null
            }
        </View>
    )

}

const mapStateToProps = store => ({
    globalState: store.globalState
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        doLogin,
        setUsuario,
        setLoading
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Login);