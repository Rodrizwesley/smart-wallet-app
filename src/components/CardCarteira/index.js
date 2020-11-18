import React from 'react';
import { Text, View} from 'react-native';

export function CardCarteira(props){
    return(
        <View style={{backgroundColor: '#D0D0D0', borderRadius: 10, padding: 20, flexDirection: 'row', justifyContent: 'space-between', marginVertical:5}}>
            <Text style={{fontSize: 16}}>{props.nome}</Text>
            <Text style={{fontSize: 16}}>R$ {props.saldo}</Text>
        </View>
    )
}