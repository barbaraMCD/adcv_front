import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from './SignIn.style';
import {TextInput} from 'react-native-paper';
import React, {useCallback, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addUsers} from '../../store/reducers/users';
import axios from 'axios';

const SignIn = () => {
  const navigation = useNavigation();
  const [isAlreadyAnAccount, setIsAlreadyAnAccount] = useState(false);
  const dispatch = useDispatch();

  const [login, setLogin] = useState({
    Email: '',
    Password: '',
  });

  const [user, setUser] = useState({
    id: Math.random(),
    Email: '',
    Password: '',
  });

  const validateUser = () => {
    axios({
      method: 'post',
      url: 'http://localhost:4000/api/user/login',
      withCredentials: true,
      data: {
        email: login.Email,
        password: login.Password,
      },
    })
      .then(res => {
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          navigation.navigate('Home');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const validPassword = useMemo(() => {
    return user.Password.length >= 6;
  }, [user.Password]);

  const validateForm = useCallback(() => {
    if (validPassword) {
      dispatch(addUsers(user));
      setIsAlreadyAnAccount(!isAlreadyAnAccount);
    }
  }, [validPassword, dispatch, user, isAlreadyAnAccount]);

  return (
    <SafeAreaView style={styles.screen}>
      <View>
        {isAlreadyAnAccount ? (
          <>
            <Text style={styles.text}> Connexion </Text>
            <View style={styles.form}>
              <Text style={styles.label}> Email </Text>
              <TextInput
                value={login.Email}
                onChangeText={value => setLogin({...login, Email: value})}
                style={styles.input}
              />
              <Text style={styles.label}> Mot de passe </Text>
              <TextInput
                value={login.Password}
                onChangeText={value => setLogin({...login, Password: value})}
                secureTextEntry={true}
                style={styles.input}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={validateUser}>
              <Text style={styles.buttonText}> Me connecter </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsAlreadyAnAccount(!isAlreadyAnAccount)}>
              <Text style={styles.link}> Je n'ai pas de compte </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.text}> Inscription </Text>
            <View style={styles.form}>
              <Text style={styles.label}> Email </Text>
              <TextInput
                value={user.Email}
                onChangeText={value => setUser({...user, Email: value})}
                style={styles.input}
              />
              <Text style={styles.label}> Mot de passe </Text>
              <TextInput
                value={user.Password}
                onChangeText={value => setUser({...user, Password: value})}
                secureTextEntry={true}
                style={validPassword ? styles.input : styles.inputInvalid}
              />
              {!validPassword && !user.Password === 0 ? (
                <Text> Au moins 6 charactères </Text>
              ) : null}
            </View>
            <TouchableOpacity style={styles.button} onPress={validateForm}>
              <Text style={styles.buttonText}> M'inscrire </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsAlreadyAnAccount(!isAlreadyAnAccount)}>
              <Text style={styles.link}> Je possède déjà un compte </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
