import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppNavigation from './routes'

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppNavigation />
            </NavigationContainer>
        </Provider>
    )


}