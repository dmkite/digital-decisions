import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'

interface IProps {
  question?: string
  callback: (response: boolean | string) => void
  answerValues: any[]
}

const RadioSelect = (props: IProps): JSX.Element => {
  const [answer, setAnswer] = useState<boolean | string | null>(null)
  const handlePress = (val: boolean | string) => {
    console.log('handlePress firing')
    setAnswer(val)
    props.callback(val)
  }
  return (
    <View style={styles.booleanForm}>
      {props.question ? <Text style={styles.question}>{props.question}</Text> : null}
      {props.answerValues.map((val: boolean | string, i: number): JSX.Element => (
        <View style={styles.radioHolder}>
          <TouchableWithoutFeedback onPress={() => handlePress(val)}>
            <View style={[styles.radio, answer === val ? styles.filled : null]}></View>
          </TouchableWithoutFeedback>
            <Text>{String(val)}</Text>
        </View>
      ))}
    </View>
  )
}
const styles = StyleSheet.create({
  radio: {
    borderWidth: 1,
    borderRadius: 10,
    height: 20,
    width: 20
  },
  radioHolder: {
    flexDirection: 'row',
  },
  booleanForm: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  filled: {
    backgroundColor: 'black'
  },
  question: {
    borderWidth: 1,
    flex: 0.9
  }
})


export default RadioSelect
