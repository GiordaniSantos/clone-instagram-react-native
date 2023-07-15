/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Header from './src/components/Header'
import { View, Text } from 'react-native';
import Post from './src/components/Post'


function App(){
  const comments = [{
    nickname: 'Joana Elena Silva',
    comment: 'Excelente Foto'
  }, {
    nickname: 'Rafael Gustavo Pereira',
    comment: 'Muito ruim, faço melhor'
  }]

  return (
    <View style={{ flex:1 }}>
      <Header/>
      <Post image={require('./assets/imgs/fence.jpg')} comments={comments} />
    </View>
  );
}

export default App;
