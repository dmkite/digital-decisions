import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import IShortAnswerProps, { ShortAnswerQuestion } from './ShortAnswerProps'
import { TextInput } from 'react-native-gesture-handler'

const ShortAnswerQuestions = (props: IShortAnswerProps): JSX.Element => {
  const {dispatch, Action, shortAnswer} = props
  return (
    <View>
      {Object.keys(ShortAnswerQuestion).map((key: string, i: number): JSX.Element => {
        return (
          <View key={i}>
            <Text style={styles.label}>{ShortAnswerQuestion[key as keyof typeof ShortAnswerQuestion]}</Text>
            <TextInput 
              style={styles.textArea}
              multiline={true} 
              numberOfLines={4}
              maxLength={150}
              onChangeText={(value: string) => dispatch({type: Action.ENTER_SHORT_ANSWER, payload: {field: key, value}})}
              value={shortAnswer[key as keyof typeof ShortAnswerQuestion]}
            />
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    marginTop:20,
    marginBottom: 10
  },
  textArea: {
    borderLeftWidth:1,
    borderLeftColor: '#999',
    textAlignVertical: 'top'
  }
})

export default ShortAnswerQuestions
