import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/components/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
