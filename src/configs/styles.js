import {StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const STYLE = StyleSheet.create({
    container: {
        backgroundColor: '#232323',
        flex: 1,
        justifyContent: 'space-evenly',
        alignContent: 'center',
        // padding: 10
    },
    
    imageBox: {
        alignSelf: "center", 
        width: width * 0.7,
        height: height * 0.2,
    },

    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "contain"
    },

    loading: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#232323',
        opacity: 0.8,
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },

    loginInputBox: {
        // marginVertical: 20,
        marginHorizontal: 10
    },

    textInput:{
        backgroundColor: '#7C878C', 
        margin: 10,
        marginTop:2, 
        borderRadius: 8,
        color: '#FAFAFA',
    },

    textInputWrong:{
        backgroundColor: '#7C878C', 
        margin: 10,
        marginTop:2, 
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F00',
        color: '#FAFAFA',
    },

    formLabel:{
        marginLeft: 10,
        fontSize: 14, 
        color: '#D0D0D0' 
    },

    loginTouchables: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginHorizontal: 10,
    },

    loginTexts: {
        textDecorationLine: 'underline',
        color: '#23D9B7'
    },

    loginEntrarBox: {
        margin: 10, 
        width: '50%', 
        alignSelf: "center"
    },

    loginEntrarButton: {
        backgroundColor: '#7D07F2', 
        borderRadius: 8, 
        width: '60%', 
        alignSelf: "center",
        
    },

    loginEntrarText: {
        padding: 15, 
        alignSelf: "center",
        color: '#FFF'
    },

    cadastroImageBox: {
        alignSelf: "center", 
        width: width * 0.6,
        height: height * 0.10,
        marginVertical: 20
    },

    cadastroTextBox: {
        alignContent: 'center',
        alignSelf: 'center',
        marginBottom: 20
    },

    cadastroText: {
        fontSize: 22, 
        color: '#D0D0D0'
    },

    cadastroButtonBox: {
        alignSelf: 'center',
        margin: 20,
    },

    cadastroButton: {
        backgroundColor: '#7D07F2',
        borderRadius: 8, 
    },

    cadastroButtonText: {
        padding: 15, 
        alignSelf: "center",
        color: '#E7E7E7',
        fontSize: 18
    }
})