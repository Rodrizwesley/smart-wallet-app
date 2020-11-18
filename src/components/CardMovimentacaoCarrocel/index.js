import React from 'react';
import { Text, View, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

export function CardMovimentacaoCarrocel(props){
    return(
        <View style={{backgroundColor: '#D0D0D0', borderRadius: 10, padding: 20, justifyContent: 'space-between', marginHorizontal:5, width: width * 0.35}}>
            <Text numberOfLines={1} style={{fontSize: 14}}>{props.descricao}</Text>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>R$ {props.valor}</Text>
        </View>
    )
}