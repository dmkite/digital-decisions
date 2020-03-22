import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import IRadioProps from './RadioProps'

const RadioSelect = (props: IRadioProps): JSX.Element => {
  const [answer, setAnswer] = useState<boolean | string | null>(null)
  const handlePress = (val: boolean | string) => {
    setAnswer(val)
    props.callback(val)
  }
  return (
    <View style={styles.booleanForm}>
      {props.question ? <Text style={styles.question}>{props.question}</Text> : null}
      {props.answerValues.map((val: boolean | string, i: number): JSX.Element => (
        <TouchableWithoutFeedback key={i} onPress={() => handlePress(val)}>
          <View style={styles.radioHolder}>
            <View style={[styles.radio, answer === val ? styles.filled : null]}></View>
            <Text style={styles.label}>{String(val)}</Text>
          </View>
        </TouchableWithoutFeedback>

      ))}
    </View>
  )
}
const styles = StyleSheet.create({
  radio: {
    borderWidth: 1,
    borderRadius: 10,
    height: 20,
    width: 20,
    marginRight: 5
  },
  radioHolder: {
    flexDirection: 'row',
    marginBottom: 10
  },
  booleanForm: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  filled: {
    backgroundColor: '#555'
  },
  question: {
    flex: 0.9,
    marginBottom: 20
  },
  label: {
    marginRight: 20
  }
})


export default RadioSelect
