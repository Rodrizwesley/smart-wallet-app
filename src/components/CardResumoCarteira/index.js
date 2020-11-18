import React from 'react';
import { Text, View} from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

export function CardResumo(props){
    return(
        <View style={{marginHorizontal: 30, marginVertical:10, backgroundColor: '#D0D0D0', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10}}>
            <Text>NESTE MÊS:</Text>
            <Text style={{fontSize: 30}}>R$ {props.saldo}</Text>

            <LineChart
                style={{ height: 150 }}
                data={ props.data }
                svg={{ stroke: 'rgb(187, 134, 252)' }}
                contentInset={{ top: 20, bottom: 20 }}
                curve={shape.curveNatural}
            >
            {/* <Grid/> */}
            </LineChart>
        </View>
    )
} 