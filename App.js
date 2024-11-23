import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Home from './screens/Home';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de status para dispositivos iOS */}
      <StatusBar barStyle="dark-content" />
      {/* Instanciando o ChessBoard */}
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
