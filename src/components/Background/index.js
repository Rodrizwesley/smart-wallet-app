import React, { useEffect }  from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function Background(props){
    return(
        <View style={{position: 'absolute', top: 0, left: 0, height: '35%', backgroundColor: '#7445FF', width: '100%', borderBottomEndRadius: 35, borderBottomStartRadius: 35}}>
            <View style={{ marginVertical: 10, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#7445FF', zIndex: 3}}>
                <Image style={{width: '10%', height: '100%', resizeMode: "contain"}} source={require('../../assets/LOGO.png')}/>
                <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                    <Icon name='menu' size={40} color='#D0D0D0' />
                </TouchableOpacity>
            </View>
        </View>
    )
}