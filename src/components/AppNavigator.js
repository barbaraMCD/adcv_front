import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Home from '../views/Home/Home';
import SignIn from '../views/SignIn/SignIn';
import {useDispatch} from 'react-redux';
import {populateUsers} from '../store/reducers/users';
import data from '../../data.json';

const AppNavigator = () => {
  const dispatch = useDispatch();

  const popData = () => {
    const {user} = data;
    dispatch(populateUsers(user));
  };

  React.useEffect(() => {
    popData();
  });

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="SignIn"
        component={SignIn}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
