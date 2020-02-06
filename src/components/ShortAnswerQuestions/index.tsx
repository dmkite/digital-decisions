import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import IShortAnswerProps, { ShortAnswerQuestion } from './ShortAnswerProps'
import { TextInput } from 'react-native-gesture-handler'

const ShortAnswerQuestions = () => {
  return (
    <View>
      {Object.keys(ShortAnswerQuestion).map((key: string, i: number): JSX.Element => {
        return (
          <View key={i}>
            <Text style={styles.label}>{ShortAnswerQuestion[key as keyof typeof ShortAnswerQuestion]}</Text>
            <TextInput multiline={true} numberOfLines={4}/>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  label: {}
})

export default ShortAnswerQuestions
