/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet,TouchableOpacity,Button, Text, View} from 'react-native';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      resultText:"",
      calculationText:""
    }
    this.operations = ["Del","+","-","*","/"]
  }
  operate(operation){
    switch(operation){
      case 'Del':
        let text = this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText:text.join('')
        })
        break
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar =  this.state.resultText.split('').pop()
        if(this.operations.indexOf(lastChar) > 0) return
        if(this.state.text == "")return
        this.setState({
          resultText:this.state.resultText + operation
        })
    }
  }
  calculateResult(){
    const text = this.state.resultText
    this.setState({
        calculationText:eval(text)
    })
  }
  validate(){
    const text = this.state.resultText
    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
          return false
    }
    return true
  }
  buttonPressed(text){
    if(text == '='){
      return this.validate() && this.calculateResult()
    }
    console.log(text)
    this.setState({
      resultText:this.state.resultText+text
    })
  }
  render() {
    //For Numbers show စောက်ရမ်းမိုက်တဲ့ Loop ဗျာ
    let rows = []
    let num = [[1,2,3],[4,5,6],[7,8,9],['.',0,'=']]
    for(let i = 0; i< 4;i++ ){
      let row = []
      for(let j = 0; j < 3;j++){
        row.push(
        <TouchableOpacity onPress={()=>this.buttonPressed(num[i][j])} style={styles.btn}>
          <Text style={styles.btnText}>{num[i][j]}</Text>
        </TouchableOpacity>
        )
      }
      rows.push(<View style={styles.row}>{row}</View>)
    }

    //Operators တေထည့်တာ လည်းမိုက်တာပဲဗျာ
    
    let ops = []
    for(let i = 0;i < 5;i++){
      ops.push(<TouchableOpacity style={styles.btn} onPress={()=>this.operate(this.operations[i])}>
        <Text style={[styles.btnText,styles.white]}>{this.operations[i]}</Text>
        </TouchableOpacity>)
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnText:{
    fontSize:30,
    color:'white'
  },
  white:{
    color:'white'
  },
  btn:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'stretch'
  },
  calculationText:{
    fontSize:30,
    color:'black'
  },
  resultText:{
    fontSize:40,
    color:'black'
  },
  row:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  result:{
    justifyContent:'center',
    alignItems:'flex-end',
    flex: 2,
    backgroundColor:'white'
  },
  calculation:{
    justifyContent:'center',
    alignItems:'flex-end',
    flex:1,
    backgroundColor:'white'
  },
  buttons:{
    flex:7,
    flexDirection:'row'
  },
  numbers:{
    flex:3,
    backgroundColor:'#434343'
  },
  operations:{
    flex:1,
    justifyContent:'space-around',
    backgroundColor:'#636363'
  }
 });
