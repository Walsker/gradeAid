// React Native imports
import React, {Component} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

// Redux imports
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './_rootReducer';

// Redux Persist imports
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react'

// Custom imports
import RootNavigator from './_rootNavigator';
import {colors, containerStyle} from 'gradeAid/src/common/appStyles';

export default class App extends Component
{
	componentDidMount()
	{
		SplashScreen.hide();
	}

	render()
	{
		const persistConfig = {
			key: 'root',
			storage,
		};
		const persistedReducer = persistReducer(persistConfig, reducers);

		const store = createStore(persistedReducer, applyMiddleware(thunk));
		const persistor = persistStore(store);
		// persistor.purge();
		return (
			<SafeAreaView style = {{flex: 1, backgroundColor: colors.primaryColor}}>
				<Provider store = {store}>
					<PersistGate loading = {<View style = {{backgroundColor: 'red'}}/>} persistor = {persistor}>
						<View style = {containerStyle.default}>
							<StatusBar
								animated = {true}
								barStyle = 'light-content'
								backgroundColor = {colors.primaryColor}
							/>
							<RootNavigator/>
						</View>
					</PersistGate>
				</Provider>
			</SafeAreaView>
		);
	}
}