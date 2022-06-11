import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [value, setValue] = useState('ERROR');

  const buttons = ['AC','DEL','%','/','7','8','9','*','4','5','6','-','3','2','1','+','0','.','=',]
  
  const valueFinally = (valueButton: string) => {
    if (valueButton === 'DEL') {
      setValue('');
    } else if (valueButton === 'AC') {
      setValue(value.substring(0, value.length - 1))
    } else if (valueButton === '=') {
      let arrayValues;
      if (value.includes('+')){
        arrayValues = value.split("+")
        const value1: number = +arrayValues[0]
        const value2: number = +arrayValues[1].substring(0, value.length - 1)
        setValue(String(value1 + value2))
      }
    }
    else {
      setValue(value.concat(valueButton));
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.textResult}>{value}</Text>
      </View>
      <View style={styles.containerButton}>
        {buttons.map(button =>
          <TouchableOpacity 
            key={button} 
            style={styles.button}
            onPress={() => valueFinally(button)}
          >
            <Text style={styles.text}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  result: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: 350,
    backgroundColor: '#f5f5f5'
  },
  textResult: {
    fontSize: 26,
    color: '#555555',
    marginHorizontal: 12,
  },
  containerButton: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  button:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    minHeight: 95,
    minWidth: 95
  },
  text:{
    color: '#5b5b5b',
    fontSize: 25
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
