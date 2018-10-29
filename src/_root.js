// React Native imports
import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';

// Redux imports
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './_rootReducer';
import {averageCalculator, listCleaner} from 'easyGrades/src/userData/middleware';

// Redux Persist imports
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react'

// Custom imports
import RootNavigator from './_rootNavigator';
import {containerStyle} from 'easyGrades/src/common/appStyles';
import {AndroidBar} from 'easyGrades/src/common';

export default class App extends Component
{
	render()
	{
		const persistConfig = {
			key: 'root',
			storage,
		};
		const persistedReducer = persistReducer(persistConfig, reducers);

		const store = createStore(persistedReducer, applyMiddleware(averageCalculator, listCleaner));
		const persistor = persistStore(store);
		// persistor.purge();
		return(
			<Provider store = {store}>
				<PersistGate loading = {<View style = {{backgroundColor: 'red'}}/>} persistor = {persistor}>
					<View style = {containerStyle.default}>
						<AndroidBar/>
						<StatusBar
							translucent
							animated
							// backgroundColor = "rgba(0, 0, 0, 0.2)"
							backgroundColor = "rgba(0, 0, 0, 0)"
						/>
						<RootNavigator/>
					</View>
				</PersistGate>
			</Provider>
		);
	}
}

// This is to get rid of the warning caused while mounting screens with React-navigation.
// There's a possibility that this warning is a false-positive.
// Check if this is fixed in the next React Native update.
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])