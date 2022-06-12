import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [value, setValue] = useState('');
  
  const buttons = ['AC','DEL','%','/','7','8','9','*','4','5','6','-','3','2','1','+','0','.','=']

  const valueFinally = (valueButton: string) => {
    const regSinais = /\W/
    
    if (valueButton === 'DEL') {
      setValue('');
    } else if (valueButton === 'AC') {
      setValue(value.substring(0, value.length - 1))
    } else if (valueButton === '=' && regSinais.test(value) && value.length > 0) {
      try {
        const result = eval(value)
        setValue(String(result))
      } catch (error) {
        console.log(error); 
      }
    }
    else {
      if (value.length === 0 && valueButton === '=') {
        setValue(value);
      } else {
        setValue(value.concat(valueButton));
      }
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
