import React, {useCallback} from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './Home.style';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const goToOtherPage = useCallback(() => {
    navigation.navigate('');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>hello je suis le home</Text>
    </SafeAreaView>
  );
};

export default Home;
